import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'SUPPORT';
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: { isLoading: boolean; message?: string };
  error: { hasError: boolean; message?: string };
}

interface AuthActions {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  initializeAuth: () => void;
  clearError: () => void;
  updateUser: (updates: Partial<User>) => void;
}

type AuthStore = AuthState & AuthActions;

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      loading: { isLoading: false },
      error: { hasError: false },

      login: async (email: string, password: string) => {
        set({ 
          loading: { isLoading: true, message: 'Signing in...' },
          error: { hasError: false }
        });

        try {
          // Mock authentication - replace with actual API call
          if (email === 'admin@quiika.com' && password === 'admin123') {
            const mockUser: User = {
              id: '1',
              email: 'admin@quiika.com',
              firstName: 'Admin',
              lastName: 'User',
              role: 'SUPER_ADMIN',
              isActive: true,
              lastLogin: new Date().toISOString(),
              createdAt: '2024-01-01T00:00:00Z'
            };

            const mockToken = 'mock-jwt-token-' + Date.now();

            set({
              isAuthenticated: true,
              user: mockUser,
              token: mockToken,
              loading: { isLoading: false }
            });

            return true;
          } else {
            throw new Error('Invalid credentials');
          }
        } catch (error: any) {
          set({
            loading: { isLoading: false },
            error: {
              hasError: true,
              message: error.message || 'Login failed'
            }
          });
          return false;
        }
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          loading: { isLoading: false },
          error: { hasError: false }
        });
      },

      initializeAuth: () => {
        const { token, user } = get();
        if (token && user) {
          // Validate token here if needed
          set({ isAuthenticated: true });
        }
      },

      clearError: () => set({ error: { hasError: false } }),

      updateUser: (updates) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...updates } });
        }
      },
    }),
    {
      name: 'quiika-auth',
      partialize: (state) => ({ 
        token: state.token, 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);

export default useAuthStore;