import { create } from 'zustand';
import { quidAPI, rulesAPI, transactionAPI } from '../lib/api';
import type { 
  Quid, 
  QuidClaimResponse, 
  Rule,
  QuidStatusDto,
  LoadingState, 
  ErrorState 
} from '../types/api';

interface QuidStore {
  currentQuid: Quid | null;
  claimResponse: QuidClaimResponse | null;
  rules: Rule[];
  loading: LoadingState;
  error: ErrorState;
  
  // Actions
  fetchQuid: (quid: string) => Promise<Quid | null>;
  claimQuid: (quid: string) => Promise<QuidClaimResponse | null>;
  verifyQuidClaim: (quid: string) => Promise<QuidClaimResponse | null>;
  updateQuidStatus: (quid: string, status: QuidStatusDto) => Promise<boolean>;
  setQuidActive: (quid: string) => Promise<boolean>;
  fetchRules: () => Promise<void>;
  clearQuid: () => void;
  clearError: () => void;
}

export const useQuidStore = create<QuidStore>((set) => ({
  currentQuid: null,
  claimResponse: null,
  rules: [],
  loading: { isLoading: false },
  error: { hasError: false },

  fetchQuid: async (quid) => {
    set({ 
      loading: { isLoading: true, message: 'Loading gift details...' },
      error: { hasError: false }
    });

    try {
      const response = await quidAPI.getQuid(quid);
      set({ 
        currentQuid: response.data,
        loading: { isLoading: false }
      });
      return response.data;
    } catch (error: any) {
      set({
        loading: { isLoading: false },
        error: { 
          hasError: true, 
          message: error.response?.data?.message || error.message || 'Failed to load gift details'
        }
      });
      return null;
    }
  },

  claimQuid: async (quid) => {
    set({ 
      loading: { isLoading: true, message: 'Processing claim...' },
      error: { hasError: false }
    });

    try {
      const response = await rulesAPI.claim(quid);
      set({ 
        loading: { isLoading: false }
      });
      // Transform the response to match expected structure
      const claimResponse: QuidClaimResponse = {
        quid: {} as Quid, // Will be populated by separate call if needed
        allowAccess: true,
        message: response.data.message,
        accessKey: response.data.accessKey,
      };
      set({ claimResponse });
      return claimResponse;
    } catch (error: any) {
      set({
        loading: { isLoading: false },
        error: { 
          hasError: true, 
          message: error.response?.data?.message || error.message || 'Failed to claim gift'
        }
      });
      return null;
    }
  },

  verifyQuidClaim: async (quid) => {
    set({ 
      loading: { isLoading: true, message: 'Verifying claim...' },
      error: { hasError: false }
    });

    try {
      const response = await transactionAPI.verifyQuidTransaction(quid);
      set({ 
        claimResponse: response.data,
        loading: { isLoading: false }
      });
      return response.data;
    } catch (error: any) {
      set({
        loading: { isLoading: false },
        error: { 
          hasError: true, 
          message: error.response?.data?.message || error.message || 'Failed to verify claim'
        }
      });
      return null;
    }
  },

  updateQuidStatus: async (quid, statusDto) => {
    set({ 
      loading: { isLoading: true, message: 'Updating status...' },
      error: { hasError: false }
    });

    try {
      await quidAPI.updateQuidStatus(quid, statusDto);
      set({ loading: { isLoading: false } });
      return true;
    } catch (error: any) {
      set({
        loading: { isLoading: false },
        error: { 
          hasError: true, 
          message: error.response?.data?.message || error.message || 'Failed to update status'
        }
      });
      return false;
    }
  },

  setQuidActive: async (quid) => {
    set({ 
      loading: { isLoading: true, message: 'Activating gift...' },
      error: { hasError: false }
    });

    try {
      await quidAPI.setQuidActive(quid);
      set({ loading: { isLoading: false } });
      return true;
    } catch (error: any) {
      set({
        loading: { isLoading: false },
        error: { 
          hasError: true, 
          message: error.response?.data?.message || error.message || 'Failed to activate gift'
        }
      });
      return false;
    }
  },

  fetchRules: async () => {
    set({ 
      loading: { isLoading: true, message: 'Loading rules...' },
      error: { hasError: false }
    });

    try {
      const response = await rulesAPI.allRules();
      set({ 
        rules: response.data,
        loading: { isLoading: false }
      });
    } catch (error: any) {
      set({
        loading: { isLoading: false },
        error: { 
          hasError: true, 
          message: error.response?.data?.message || error.message || 'Failed to fetch rules'
        }
      });
    }
  },

  clearQuid: () => set({ 
    currentQuid: null, 
    claimResponse: null, 
    loading: { isLoading: false }, 
    error: { hasError: false } 
  }),

  clearError: () => set({ error: { hasError: false } }),
}));