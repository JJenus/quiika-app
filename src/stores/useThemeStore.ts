import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeStore {
  theme: 'light' | 'dark' | 'system';
  actualTheme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  initializeTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'system',
      actualTheme: 'light',

      setTheme: (theme) => {
        set({ theme });
        
        const applyTheme = (actualTheme: 'light' | 'dark') => {
          if (actualTheme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          set({ actualTheme });
        };

        if (theme === 'system') {
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          applyTheme(systemTheme);
        } else {
          applyTheme(theme);
        }
      },

      initializeTheme: () => {
        const { theme } = get();
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        
        if (theme === 'system') {
          set({ actualTheme: systemTheme });
          if (systemTheme === 'dark') {
            document.documentElement.classList.add('dark');
          }
        } else {
          set({ actualTheme: theme });
          if (theme === 'dark') {
            document.documentElement.classList.add('dark');
          }
        }

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
          if (get().theme === 'system') {
            const newTheme = e.matches ? 'dark' : 'light';
            set({ actualTheme: newTheme });
            if (newTheme === 'dark') {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          }
        };

        mediaQuery.addEventListener('change', handleChange);
      },
    }),
    {
      name: 'quiika-theme',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);