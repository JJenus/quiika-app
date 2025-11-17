// src/hooks/useDynamicApiKey.ts
import { useEffect, useCallback } from 'react';
import { useApiKeyStore, ApiKeyCrypto } from '../stores/useApiKeyStore';

export const useDynamicApiKey = () => {
  const {
    apiKey,
    isLoading,
    error,
    isApiKeyValid,
    getTimeToExpiry,
    initializeKeyExchange,
    completeKeyExchange,
    refreshApiKey,
    clearApiKey,
  } = useApiKeyStore();

  // Generate a complete API key (init + complete)
  const generateApiKey = useCallback(async (): Promise<boolean> => {
    try {
      // Step 1: Initialize key exchange
      const initSuccess = await initializeKeyExchange();
      if (!initSuccess) {
        return false;
      }

      // Step 2: Generate client key pair
      const { publicKey: clientPublicKey } = await ApiKeyCrypto.generateClientKeyPair();

      // Step 3: Complete key exchange
      const completeSuccess = await completeKeyExchange(clientPublicKey);
      return completeSuccess;

    } catch (error) {
      console.error('Failed to generate API key:', error);
      return false;
    }
  }, [initializeKeyExchange, completeKeyExchange]);

  // Auto-refresh when API key is about to expire
  useEffect(() => {
    if (apiKey && isApiKeyValid()) {
      const timeToExpiry = getTimeToExpiry();
      const refreshThreshold = 5 * 60 * 1000; // Refresh 5 minutes before expiry

      if (timeToExpiry < refreshThreshold) {
        const timer = setTimeout(() => {
          refreshApiKey().then(success => {
            if (success) {
              console.log('API key auto-refreshed before expiry');
            }
          });
        }, timeToExpiry - refreshThreshold);

        return () => clearTimeout(timer);
      }
    }
  }, [apiKey, isApiKeyValid, getTimeToExpiry, refreshApiKey]);

  return {
    apiKey,
    isLoading,
    error,
    isApiKeyValid: isApiKeyValid(),
    timeToExpiry: getTimeToExpiry(),
    generateApiKey,
    refreshApiKey,
    clearApiKey,
  };
};