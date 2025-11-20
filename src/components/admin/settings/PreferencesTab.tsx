import React from 'react';
import { Bell, Monitor, Palette, Globe, Layout, Eye } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { useThemeStore } from '@/stores/useThemeStore';
import { useUIStore } from '@/stores/uiStore';

export const PreferencesTab: React.FC = () => {
  const { 
    notifications, 
    ui, 
    loading, 
    updateNotifications, 
    updateUIPreferences 
  } = useSettingsStore();
  
  const { theme, setTheme } = useThemeStore();
  const { toggleSidebarCollapsed, sidebarCollapsed } = useUIStore();

  const timezones = [
    'Africa/Lagos',
    'America/New_York', 
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Singapore'
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'French' },
    { code: 'es', name: 'Spanish' },
    { code: 'pt', name: 'Portuguese' }
  ];

  const defaultPages = [
    { value: '/admin/dashboard', label: 'Dashboard' },
    { value: '/admin/quids', label: 'QUID Management' },
    { value: '/admin/transactions', label: 'Transactions' },
    { value: '/admin/withdrawals', label: 'Withdrawals' }
  ];

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    // Also update in settings store for consistency
    updateUIPreferences({ theme: newTheme });
  };

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    updateNotifications({ [key]: !notifications[key] });
  };

  const handleSidebarToggle = () => {
    toggleSidebarCollapsed();
    // Update in settings store for persistence
    updateUIPreferences({ sidebarCollapsed: !sidebarCollapsed });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Preferences</h2>
        <p className="text-gray-600 dark:text-gray-400">Customize your experience and notification settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notification Preferences */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Notification Preferences</h3>
          </div>
          
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900 dark:text-gray-100 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {getNotificationDescription(key as keyof typeof notifications)}
                  </p>
                </div>
                <Button
                  variant={value ? "primary" : "outline"}
                  size="sm"
                  onClick={() => handleNotificationToggle(key as keyof typeof notifications)}
                  loading={loading}
                >
                  {value ? 'Enabled' : 'Disabled'}
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Theme & Appearance */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Theme & Appearance</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2 block">Theme</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'light' as const, label: 'Light', description: 'Light theme' },
                  { value: 'dark' as const, label: 'Dark', description: 'Dark theme' },
                  { value: 'system' as const, label: 'System', description: 'Follow system' }
                ].map((themeOption) => (
                  <button
                    key={themeOption.value}
                    onClick={() => handleThemeChange(themeOption.value)}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      theme === themeOption.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="text-sm font-medium">{themeOption.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {themeOption.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2 block">UI Density</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'compact' as const, label: 'Compact', description: 'More content' },
                  { value: 'normal' as const, label: 'Normal', description: 'Balanced' },
                  { value: 'comfortable' as const, label: 'Comfortable', description: 'More spacing' }
                ].map((density) => (
                  <button
                    key={density.value}
                    onClick={() => updateUIPreferences({ uiDensity: density.value })}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      ui.uiDensity === density.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="text-sm font-medium">{density.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {density.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Regional Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Regional Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2 block">Timezone</label>
              <select
                value={ui.timezone}
                onChange={(e) => updateUIPreferences({ timezone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                {timezones.map(tz => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2 block">Language</label>
              <select
                value={ui.language}
                onChange={(e) => updateUIPreferences({ language: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Interface Preferences */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Layout className="h-5 w-5 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Interface Preferences</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Collapse Sidebar</label>
                <p className="text-xs text-gray-500 dark:text-gray-500">Auto-collapse sidebar navigation</p>
              </div>
              <Button
                variant={sidebarCollapsed ? "primary" : "outline"}
                size="sm"
                onClick={handleSidebarToggle}
                loading={loading}
              >
                {sidebarCollapsed ? 'Collapsed' : 'Expanded'}
              </Button>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2 block">Default Page</label>
              <select
                value={ui.defaultPage}
                onChange={(e) => updateUIPreferences({ defaultPage: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                {defaultPages.map(page => (
                  <option key={page.value} value={page.value}>{page.label}</option>
                ))}
              </select>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Helper function for notification descriptions
function getNotificationDescription(key: string): string {
  const descriptions: Record<string, string> = {
    emailAlerts: 'Receive important updates via email',
    systemAlerts: 'Get notifications within the application',
    dailyDigest: 'Daily summary of activities and metrics',
    withdrawalNotifications: 'Alerts for new withdrawal requests',
    securityAlerts: 'Notifications for security-related events'
  };
  return descriptions[key] || 'Notification preference';
}