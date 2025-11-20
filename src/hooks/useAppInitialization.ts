import { useThemeStore } from '../stores/useThemeStore';
import useAuthStore from '../stores/useAuthStore';
import { initializeApiKeyManager } from '../utils/apiKeyManager';

export const useAppInitialization = () => {
  const { initializeTheme } = useThemeStore();
  const { initializeAuth } = useAuthStore();

  const initialize = async () => {
    try {
      await initializeApiKeyManager();
      initializeTheme();
      initializeAuth();
    } catch (error) {
      console.error('App initialization failed:', error);
    }
  };

  return { initialize };
};