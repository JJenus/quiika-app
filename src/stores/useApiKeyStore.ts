// src/stores/useApiKeyStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { apiClient } from "../lib/api-client";
import { apiKey } from "../lib/api-services";
import { EcdhCompleteRequest } from "../lib/api-types";
import { ApiKeyCrypto } from "@/utils/apiKeyCrypto";

interface ApiKeyState {
  apiKey: string | null;
  challenge: string | null;
  sessionId: string | null;
  serverPublicKey: string | null;
  clientPrivateKey: CryptoKey | null;
  isLoading: boolean;
  error: string | null;
  lastGenerated: number | null;
  expiresAt: number | null;
}

interface ApiKeyActions {
  // Key generation flow
  initializeKeyExchange: () => Promise<boolean>;
  completeKeyExchange: (clientPublicKey: string, clientPrivateKey: CryptoKey) => Promise<boolean>;
  clearApiKey: () => void;
  refreshApiKey: () => Promise<boolean>;
  regenerateApiKey: (challenge: string) => Promise<string | null>;

  // Utility methods
  isApiKeyValid: () => boolean;
  getTimeToExpiry: () => number;
}

type ApiKeyStore = ApiKeyState & ApiKeyActions;

// Constants
const API_KEY_TTL = 1 * 60 * 1000; // 24 hours in milliseconds
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export const useApiKeyStore = create<ApiKeyStore>()(
  persist(
    (set, get) => ({
      // Initial state
      apiKey: null,
      challenge: null,
      sessionId: null,
      serverPublicKey: null,
      clientPrivateKey: null,
      isLoading: false,
      error: null,
      lastGenerated: null,
      expiresAt: null,

      // Initialize the key exchange process with retry logic
      initializeKeyExchange: async (): Promise<boolean> => {
        set({ isLoading: true, error: null });

        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
          try {
            console.log(`Key exchange initialization attempt ${attempt}`);
            
            const { data, error } = await apiKey.init();

            if (error) {
              throw new Error(error);
            }

            if (data) {
              console.log('Key exchange initialized successfully');
              console.log('Session ID:', data.sessionId);
              console.log('Server public key length:', data.serverPublicKey?.length);
              
              set({
                sessionId: data.sessionId,
                serverPublicKey: data.serverPublicKey,
                isLoading: false,
                error: null,
              });
              return true;
            }
          } catch (error: any) {
            console.warn(`Key exchange initialization attempt ${attempt} failed:`, error);
            
            if (attempt === MAX_RETRIES) {
              set({
                isLoading: false,
                error: error.message || "Failed to initialize API key exchange after multiple attempts",
              });
              return false;
            }
            
            // Wait before retry
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * attempt));
          }
        }
        return false;
      },

      // Complete the key exchange with client public key
      completeKeyExchange: async (clientPublicKey: string, clientPrivateKey: CryptoKey): Promise<boolean> => {
        const { sessionId, serverPublicKey } = get();

        if (!sessionId || !serverPublicKey) {
          set({
            error: "No active session or server public key. Please initialize key exchange first.",
          });
          return false;
        }

        set({ isLoading: true, error: null });

        // Add validation of server public key
        console.log('Validating server public key format...');
        const isValidKey = await ApiKeyCrypto.testKeyEncoding(serverPublicKey);
        if (!isValidKey) {
          set({
            isLoading: false,
            error: "Invalid server public key format",
          });
          return false;
        }

        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
          try {
            console.log(`Key exchange completion attempt ${attempt}`);
            console.log('Session ID:', sessionId);
            console.log('Client public key length:', clientPublicKey.length);
            
            // Derive shared secret first
            console.log('Deriving shared secret...');
            const sharedSecret = await ApiKeyCrypto.deriveSharedSecret(clientPrivateKey, serverPublicKey);
            console.log('Shared secret derived successfully, length:', sharedSecret.byteLength);
            
            const ecdhCompleteRequest: EcdhCompleteRequest = {
              sessionId,
              clientPublicKey,
            };

            console.log('Sending completion request to server...');
            const { data, error } = await apiKey.complete(ecdhCompleteRequest);

            if (error) {
              throw new Error(error);
            }

            if (data) {
              console.log('Received challenge from server, length:', data.challenge?.length);
              
              // Generate API key locally using the shared secret and challenge
              console.log('Generating local API key...');
              const localApiKey = await ApiKeyCrypto.generateApiKey(data.challenge!, sharedSecret);
              console.log('Local API key generated successfully');
              
              const now = Date.now();
              const expiresAt = now + API_KEY_TTL;

              set({
                apiKey: localApiKey,
                challenge: data.challenge,
                clientPrivateKey,
                lastGenerated: now,
                expiresAt,
                isLoading: false,
                error: null,
              });

              // Set the API key in the API client
              apiClient.setApiKey(localApiKey, data.challenge!);
              console.log("Dynamic API key generated and set in client");

              return true;
            }
          } catch (error: any) {
            console.warn(`Key exchange completion attempt ${attempt} failed:`, error);
            
            if (attempt === MAX_RETRIES) {
              set({
                isLoading: false,
                error: error.message || "Failed to complete API key exchange after multiple attempts",
              });
              return false;
            }
            
            // Wait before retry
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * attempt));
          }
        }
        return false;
      },

      // Regenerate API key for a new challenge
      regenerateApiKey: async (challenge: string): Promise<string | null> => {
        const { clientPrivateKey, serverPublicKey } = get();
        
        if (!clientPrivateKey || !serverPublicKey) {
          throw new Error("Cannot regenerate API key: missing key pair");
        }

        try {
          console.log('Regenerating API key for new challenge...');
          const sharedSecret = await ApiKeyCrypto.deriveSharedSecret(clientPrivateKey, serverPublicKey);
          const apiKey = await ApiKeyCrypto.generateApiKey(challenge, sharedSecret);
          
          // Update store with new challenge and API key
          set({
            apiKey,
            challenge,
            lastGenerated: Date.now(),
            expiresAt: Date.now() + API_KEY_TTL,
          });

          // Update API client
          apiClient.setApiKey(apiKey, challenge);
          console.log('API key regenerated successfully');
          
          return apiKey;
        } catch (error) {
          console.error("Failed to regenerate API key:", error);
          return null;
        }
      },

      // Clear the API key (logout, manual refresh, etc.)
      clearApiKey: () => {
        console.log('Clearing API key from store...');
        set({
          apiKey: null,
          challenge: null,
          sessionId: null,
          serverPublicKey: null,
          clientPrivateKey: null,
          lastGenerated: null,
          expiresAt: null,
          error: null,
        });

        // Clear from API client
        apiClient.clearApiKey();
        console.log("API key cleared from store and client");
      },

      // Refresh the API key (full re-generation)
      refreshApiKey: async (): Promise<boolean> => {
        console.log('Refreshing API key...');
        const { clearApiKey, initializeKeyExchange } = get();

        // Clear existing key
        clearApiKey();

        // Start new exchange
        return await initializeKeyExchange();
      },

      // Check if the current API key is still valid
      isApiKeyValid: (): boolean => {
        const { apiKey, expiresAt } = get();
        const now = Date.now();

        const isValid = !!(apiKey && expiresAt && expiresAt > now);
        console.log('API key validity check:', isValid);
        return isValid;
      },

      // Get time until expiry in milliseconds
      getTimeToExpiry: (): number => {
        const { expiresAt } = get();
        const now = Date.now();

        const timeToExpiry = expiresAt ? Math.max(0, expiresAt - now) : 0;
        console.log('Time to expiry:', timeToExpiry, 'ms');
        return timeToExpiry;
      },
    }),
    {
      name: "quiika-api-key",
      partialize: (state) => ({
        apiKey: state.apiKey,
        challenge: state.challenge,
        lastGenerated: state.lastGenerated,
        expiresAt: state.expiresAt,
        serverPublicKey: state.serverPublicKey,
        // Note: We cannot persist CryptoKey objects, they will be recreated on demand
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // ClientPrivateKey cannot be persisted, so we clear it on rehydrate
          state.clientPrivateKey = null;
          
          if (state.apiKey && state.isApiKeyValid()) {
            // Restore API key to client on rehydration
            apiClient.setApiKey(state.apiKey, state.challenge!);
            console.log("API key restored from persistence");
          } else if (state.apiKey && !state.isApiKeyValid()) {
            // Clear expired API key
            console.log("Clearing expired API key on rehydration");
            state.clearApiKey();
          }
        }
      },
    }
  )
);
