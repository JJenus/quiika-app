import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useThemeStore } from '../../stores/useThemeStore';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useThemeStore();

  const themes = [
    { key: 'light' as const, icon: Sun, label: 'Light' },
    { key: 'dark' as const, icon: Moon, label: 'Dark' },
    { key: 'system' as const, icon: Monitor, label: 'System' },
  ];

  return (
    <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
      {themes.map(({ key, icon: Icon, label }) => (
        <button
          key={key}
          onClick={() => setTheme(key)}
          className={`
            flex items-center justify-center p-2 rounded-md transition-all duration-200
            ${theme === key 
              ? 'bg-white dark:bg-gray-700 text-primary shadow-sm' 
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }
          `}
          title={`Switch to ${label.toLowerCase()} theme`}
          aria-label={`Switch to ${label.toLowerCase()} theme`}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  );
};