import React, { useState } from 'react';
import { Shield, Monitor, Clock, AlertTriangle, LogOut, Globe } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { formatDistanceToNow } from 'date-fns';

export const SecurityTab: React.FC = () => {
  const { 
    activeSessions, 
    securityEvents, 
    security, 
    loading, 
    terminateSession, 
    terminateAllOtherSessions,
    updateSecurityPreferences 
  } = useSettingsStore();
  
  const [confirmTerminateAll, setConfirmTerminateAll] = useState(false);

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'DESKTOP': return <Monitor className="h-4 w-4" />;
      case 'MOBILE': return <Globe className="h-4 w-4" />;
      case 'TABLET': return <Monitor className="h-4 w-4" />;
      default: return <Monitor className="h-4 w-4" />;
    }
  };

  const getEventStatusColor = (status: string) => {
    switch (status) {
      case 'SUCCESS': return 'success';
      case 'FAILED': return 'error';
      case 'SUSPICIOUS': return 'warning';
      default: return 'secondary';
    }
  };

  const handleTerminateAll = async () => {
    await terminateAllOtherSessions();
    setConfirmTerminateAll(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Security</h2>
        <p className="text-gray-600 dark:text-gray-400">Manage your account security and active sessions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Sessions */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Monitor className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Active Sessions</h3>
            </div>
            {activeSessions.filter(s => !s.current).length > 0 && (
              <Button
                variant="outline"
                onClick={() => setConfirmTerminateAll(true)}
                className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Terminate All Other Sessions
              </Button>
            )}
          </div>

          {confirmTerminateAll && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-red-800 dark:text-red-200">Terminate All Other Sessions?</h4>
                  <p className="text-red-700 dark:text-red-300 text-sm mt-1">
                    This will log you out from all other devices except this one. You'll need to log in again on those devices.
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Button
                      variant="primary"
                      onClick={handleTerminateAll}
                      loading={loading}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Yes, Terminate All
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setConfirmTerminateAll(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {activeSessions.map((session) => (
              <div key={session.sessionId} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    {getDeviceIcon(session.deviceType!)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        {session.deviceName}
                      </h4>
                      {session.current && (
                        <Badge variant="success">Current</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {session.location} • {session.ipAddress}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      Last active {formatDistanceToNow(new Date(session.lastAccessed!), { addSuffix: true })}
                    </p>
                  </div>
                </div>
                
                {!session.current && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => terminateSession(session.sessionId!)}
                    loading={loading}
                    className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Terminate
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Security Preferences */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Security Preferences</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Session Timeout</label>
                <p className="text-xs text-gray-500 dark:text-gray-500">Auto-logout after inactivity</p>
              </div>
              <select
                value={security.sessionTimeout}
                onChange={(e) => updateSecurityPreferences({ sessionTimeout: parseInt(e.target.value) })}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
              >
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={120}>2 hours</option>
                <option value={240}>4 hours</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Re-authentication</label>
                <p className="text-xs text-gray-500 dark:text-gray-500">Require password for sensitive actions</p>
              </div>
              <Button
                variant={security.requireReauthForSensitiveActions ? "primary" : "outline"}
                size="sm"
                onClick={() => updateSecurityPreferences({ 
                  requireReauthForSensitiveActions: !security.requireReauthForSensitiveActions 
                })}
                loading={loading}
              >
                {security.requireReauthForSensitiveActions ? 'Required' : 'Optional'}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Login Notifications</label>
                <p className="text-xs text-gray-500 dark:text-gray-500">Email alerts for new logins</p>
              </div>
              <Button
                variant={security.loginNotifications ? "primary" : "outline"}
                size="sm"
                onClick={() => updateSecurityPreferences({ 
                  loginNotifications: !security.loginNotifications 
                })}
                loading={loading}
              >
                {security.loginNotifications ? 'Enabled' : 'Disabled'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Security Events */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="h-5 w-5 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Security Events</h3>
          </div>
          
          <div className="space-y-3">
            {securityEvents.slice(0, 5).map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {event.description}
                    </p>
                    <Badge variant={getEventStatusColor(event.status)}>
                      {event.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}
                    {event.ipAddress && ` • ${event.ipAddress}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};