// src/stores/useApiKeyStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { apiClient } from "../lib/api-client";
import { apiKey } from "../lib/api-services";
import { EcdhCompleteRequest } from "../lib/api-types";

interface ApiKeyState {
	apiKey: string | null;
	challenge: string | null;
	sessionId: string | null;
	serverPublicKey: string | null;
	isLoading: boolean;
	error: string | null;
	lastGenerated: number | null;
	expiresAt: number | null;
}

interface ApiKeyActions {
	// Key generation flow
	initializeKeyExchange: () => Promise<boolean>;
	completeKeyExchange: (clientPublicKey: string) => Promise<boolean>;
	clearApiKey: () => void;
	refreshApiKey: () => Promise<boolean>;

	// Utility methods
	isApiKeyValid: () => boolean;
	getTimeToExpiry: () => number;
}

type ApiKeyStore = ApiKeyState & ApiKeyActions;

// Constants
const API_KEY_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const useApiKeyStore = create<ApiKeyStore>()(
	persist(
		(set, get) => ({
			// Initial state
			apiKey: null,
			challenge: null,
			sessionId: null,
			serverPublicKey: null,
			isLoading: false,
			error: null,
			lastGenerated: null,
			expiresAt: null,

			// Initialize the key exchange process
			initializeKeyExchange: async (): Promise<boolean> => {
				set({ isLoading: true, error: null });

				try {
					const { data, error } = await apiKey.init();

					if (error) {
						throw new Error(error);
					}

					if (data) {
						set({
							sessionId: data.sessionId,
							serverPublicKey: data.serverPublicKey,
							isLoading: false,
						});
						return true;
					}
					return false;
				} catch (error: any) {
					set({
						isLoading: false,
						error:
							error.message ||
							"Failed to initialize API key exchange",
					});
					return false;
				}
			},

			// Complete the key exchange with client public key
			completeKeyExchange: async (
				clientPublicKey: string
			): Promise<boolean> => {
				const { sessionId } = get();

				if (!sessionId) {
					set({
						error: "No active session. Please initialize key exchange first.",
					});
					return false;
				}

				set({ isLoading: true, error: null });

				try {
					const ecdhCompleteRequest: EcdhCompleteRequest = {
						sessionId,
						clientPublicKey,
					};

					const { data, error } = await apiKey.complete(
						ecdhCompleteRequest
					);

					if (error) {
						throw new Error(error);
					}

					if (data) {
						const now = Date.now();
						const expiresAt = now + API_KEY_TTL;

						set({
							apiKey: data.apiKey,
							challenge: data.challenge,
							lastGenerated: now,
							expiresAt,
							isLoading: false,
							error: null,
						});

						// Set the API key in the API client
						apiClient.setApiKey(data.apiKey!, data.challenge!);
						console.log(
							"Dynamic API key generated and set in client"
						);

						return true;
					}
					return false;
				} catch (error: any) {
					set({
						isLoading: false,
						error:
							error.message ||
							"Failed to complete API key exchange",
					});
					return false;
				}
			},

			// Clear the API key (logout, manual refresh, etc.)
			clearApiKey: () => {
				set({
					apiKey: null,
					challenge: null,
					sessionId: null,
					serverPublicKey: null,
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

				return !!(apiKey && expiresAt && expiresAt > now);
			},

			// Get time until expiry in milliseconds
			getTimeToExpiry: (): number => {
				const { expiresAt } = get();
				const now = Date.now();

				return expiresAt ? Math.max(0, expiresAt - now) : 0;
			},
		}),
		{
			name: "quiika-api-key",
			partialize: (state) => ({
				apiKey: state.apiKey,
				challenge: state.challenge,
				lastGenerated: state.lastGenerated,
				expiresAt: state.expiresAt,
			}),
			onRehydrateStorage: () => (state) => {
				if (state && state.apiKey && state.isApiKeyValid()) {
					// Restore API key to client on rehydration
					apiClient.setApiKey(state.apiKey, state.challenge!);
					console.log("API key restored from persistence");
				} else if (state && state.apiKey && !state.isApiKeyValid()) {
					// Clear expired API key
					state.clearApiKey();
				}
			},
		}
	)
);

// Crypto utilities for generating client key pair
export class ApiKeyCrypto {
	private static async generateKeyPair(): Promise<CryptoKeyPair> {
		return await window.crypto.subtle.generateKey(
			{
				name: "ECDH",
				namedCurve: "P-256",
			},
			true,
			["deriveKey", "deriveBits"]
		);
	}

	private static async exportPublicKey(
		publicKey: CryptoKey
	): Promise<string> {
		const exported = await window.crypto.subtle.exportKey("raw", publicKey);
		const exportedArray = new Uint8Array(exported);
		return btoa(String.fromCharCode(...exportedArray));
	}

	public static async generateClientKeyPair(): Promise<{
		publicKey: string;
		privateKey: CryptoKey;
	}> {
		try {
			const keyPair = await this.generateKeyPair();
			const publicKey = await this.exportPublicKey(keyPair.publicKey);

			return {
				publicKey,
				privateKey: keyPair.privateKey,
			};
		} catch (error) {
			throw new Error(`Failed to generate client key pair: ${error}`);
		}
	}
}
