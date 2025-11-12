import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { auth, admin, UserRole } from '../lib/api';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
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
          const { data, error } = await auth.login({ email, password });

          if (error) {
            throw new Error(error);
          }

          if (data) {
            const { accessToken, user: userData } = data;
            const iUser = userData!;
            // Transform API response to match your User type
            const user: User = {
              id: iUser.id?.toString() || '',
              email: iUser.email || '',
              firstName: iUser.firstName || '',
              lastName: iUser.lastName || '',
              role: iUser.role! || 'SUPPORT',
              isActive: true,
              lastLogin: new Date().toISOString(),
              createdAt: iUser.createdAt || new Date().toISOString(),
            };

            set({
              isAuthenticated: true,
              user,
              token: accessToken,
              loading: { isLoading: false }
            });

            return true;
          }
          return false;
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
        // Optional: Call logout API if needed
        // await auth.logout();
        
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