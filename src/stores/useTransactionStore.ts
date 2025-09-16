import { create } from 'zustand';
import { transactionAPI, paystackAPI } from '../lib/api';
import type { 
  Transaction, 
  TransactionDto, 
  PayStackTransactionDto,
  LoadingState, 
  ErrorState 
} from '../types/api';

interface TransactionStore {
  transactions: Transaction[];
  currentTransaction: TransactionDto | null;
  loading: LoadingState;
  error: ErrorState;
  
  // Actions
  initializeTransaction: (data: Omit<PayStackTransactionDto, 'reference'>) => Promise<string | null>;
  fetchTransactions: () => Promise<void>;
  fetchTransaction: (transactionId: string) => Promise<void>;
  verifyTransaction: (quid: string) => Promise<TransactionDto | null>;
  clearError: () => void;
  reset: () => void;
}

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: [],
  currentTransaction: null,
  loading: { isLoading: false },
  error: { hasError: false },

  initializeTransaction: async (data) => {
    set({ 
      loading: { isLoading: true, message: 'Initializing payment...' },
      error: { hasError: false }
    });

    try {
      const reference = `qiika_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const paymentData = {
        ...data,
        reference,
        callback_url: `${window.location.origin}/payment/callback`,
      };

      const response = await paystackAPI.initializePayment(paymentData);
      
      if (response.data.status) {
        set({ loading: { isLoading: false } });
        return response.data.data.authorization_url;
      } else {
        throw new Error(response.data.message || 'Failed to initialize payment');
      }
    } catch (error: any) {
      set({
        loading: { isLoading: false },
        error: { 
          hasError: true, 
          message: error.response?.data?.message || error.message || 'Payment initialization failed'
        }
      });
      return null;
    }
  },

  fetchTransactions: async () => {
    set({ 
      loading: { isLoading: true, message: 'Loading transactions...' },
      error: { hasError: false }
    });

    try {
      const response = await transactionAPI.findAll();
      set({ 
        transactions: response.data,
        loading: { isLoading: false }
      });
    } catch (error: any) {
      set({
        loading: { isLoading: false },
        error: { 
          hasError: true, 
          message: error.response?.data?.message || error.message || 'Failed to fetch transactions'
        }
      });
    }
  },

  fetchTransaction: async (transactionId) => {
    set({ 
      loading: { isLoading: true, message: 'Loading transaction...' },
      error: { hasError: false }
    });

    try {
      const response = await transactionAPI.findTransaction(transactionId);
      set({ 
        currentTransaction: response.data,
        loading: { isLoading: false }
      });
    } catch (error: any) {
      set({
        loading: { isLoading: false },
        error: { 
          hasError: true, 
          message: error.response?.data?.message || error.message || 'Failed to fetch transaction'
        }
      });
    }
  },

  verifyTransaction: async (quid) => {
    set({ 
      loading: { isLoading: true, message: 'Verifying transaction...' },
      error: { hasError: false }
    });

    try {
      const response = await transactionAPI.verifyTransaction(quid);
      set({ 
        currentTransaction: response.data,
        loading: { isLoading: false }
      });
      return response.data;
    } catch (error: any) {
      set({
        loading: { isLoading: false },
        error: { 
          hasError: true, 
          message: error.response?.data?.message || error.message || 'Transaction verification failed'
        }
      });
      return null;
    }
  },

  clearError: () => set({ error: { hasError: false } }),

  reset: () => set({ 
    currentTransaction: null, 
    loading: { isLoading: false }, 
    error: { hasError: false } 
  }),
}));