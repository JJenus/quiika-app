// src/hooks/useDynamicApiKey.ts
import { useEffect, useCallback, useState } from 'react';
import { useApiKeyStore } from '../stores/useApiKeyStore';
import { ApiKeyCrypto } from '@/utils/apiKeyCrypto';

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

  const [isRefreshing, setIsRefreshing] = useState(false);

  // Generate a complete API key (init + complete)
  const generateApiKey = useCallback(async (): Promise<boolean> => {
    try {
      // Step 1: Initialize key exchange
      const initSuccess = await initializeKeyExchange();
      if (!initSuccess) {
        return false;
      }

      // Step 2: Generate client key pair
      const { publicKey: clientPublicKey, privateKey: clientPrivateKey } = await ApiKeyCrypto.generateClientKeyPair();

      // Step 3: Complete key exchange
      const completeSuccess = await completeKeyExchange(clientPublicKey, clientPrivateKey);
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
      const refreshThreshold = 1 * 60 * 1000; // Refresh 5 minutes before expiry

      if (timeToExpiry < refreshThreshold) {
        setIsRefreshing(true);
        const timer = setTimeout(() => {
          refreshApiKey().then(success => {
            setIsRefreshing(false);
            if (success) {
              console.log('API key auto-refreshed before expiry');
            } else {
              console.error('API key auto-refresh failed');
            }
          });
        }, Math.max(0, timeToExpiry - refreshThreshold));

        return () => {
          clearTimeout(timer);
          setIsRefreshing(false);
        };
      }
    }
  }, [apiKey, isApiKeyValid, getTimeToExpiry, refreshApiKey]);

  return {
    apiKey,
    isLoading: isLoading || isRefreshing,
    error,
    isApiKeyValid: isApiKeyValid(),
    timeToExpiry: getTimeToExpiry(),
    generateApiKey,
    refreshApiKey,
    clearApiKey,
  };
};