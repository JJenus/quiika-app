// src/utils/retryConfig.ts
import { apiClient } from '../lib/api-client';

export const configureRetryLogic = () => {
  const enableRetry = import.meta.env.VITE_ENABLE_RETRY_LOGIC || false;
  apiClient.enableRetryLogic(enableRetry);
  return enableRetry;
};

export const setRetryLogic = (enable: boolean) => {
  apiClient.enableRetryLogic(enable);
};

export const getRetryStatus = () => {
  return apiClient.isRetryEnabled();
};