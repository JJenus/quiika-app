import { create } from "zustand";
import { toast } from "react-hot-toast";
import { 
  SettingsState, 
  SettingsActions, 
  AdminProfile, 
  ProfileActivity, 
  UserSession, 
  SecurityEvent,
  NotificationPreferences,
  UIPreferences,
  SecurityPreferences
} from "@/types/settings";

// Sample data for demonstration
const sampleProfile: AdminProfile = {
  id: "1",
  email: "admin@quiika.com",
  firstName: "System",
  lastName: "Administrator",
  phone: "+2348012345678",
  role: "SUPER_ADMIN",
  status: "ACTIVE",
  createdAt: "2024-01-01T00:00:00Z",
  lastLogin: "2024-12-19T10:30:00Z",
  lastPasswordChange: "2024-11-15T14:20:00Z"
};

const sampleActivities: ProfileActivity[] = [
  {
    id: "1",
    type: "LOGIN",
    description: "Successful login from Chrome on Windows",
    timestamp: "2024-12-19T10:30:00Z",
    ipAddress: "192.168.1.100",
    location: "Lagos, Nigeria"
  },
  {
    id: "2",
    type: "PASSWORD_CHANGE",
    description: "Password updated successfully",
    timestamp: "2024-11-15T14:20:00Z",
    ipAddress: "192.168.1.100"
  },
  {
    id: "3",
    type: "PROFILE_UPDATE",
    description: "Profile information updated",
    timestamp: "2024-10-20T09:15:00Z"
  }
];

const sampleSessions: UserSession[] = [
  {
    id: "1",
    deviceName: "Windows Chrome",
    deviceType: "DESKTOP",
    ipAddress: "192.168.1.100",
    location: "Lagos, Nigeria",
    lastActive: "2024-12-19T10:30:00Z",
    isCurrent: true,
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
  },
  {
    id: "2",
    deviceName: "iPhone Safari",
    deviceType: "MOBILE",
    ipAddress: "192.168.1.101",
    location: "Abuja, Nigeria",
    lastActive: "2024-12-18T15:45:00Z",
    isCurrent: false,
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)"
  }
];

const sampleSecurityEvents: SecurityEvent[] = [
  {
    id: "1",
    type: "LOGIN_ATTEMPT",
    description: "Successful login",
    timestamp: "2024-12-19T10:30:00Z",
    ipAddress: "192.168.1.100",
    status: "SUCCESS"
  },
  {
    id: "2",
    type: "PASSWORD_CHANGE",
    description: "Password changed",
    timestamp: "2024-11-15T14:20:00Z",
    status: "SUCCESS"
  },
  {
    id: "3",
    type: "SESSION_TERMINATED",
    description: "Session terminated from unknown device",
    timestamp: "2024-11-10T16:30:00Z",
    ipAddress: "192.168.1.150",
    status: "SUSPICIOUS"
  }
];

const initialNotifications: NotificationPreferences = {
  emailAlerts: true,
  systemAlerts: true,
  dailyDigest: false,
  withdrawalNotifications: true,
  securityAlerts: true
};

const initialUIPreferences: UIPreferences = {
  theme: "system",
  timezone: "Africa/Lagos",
  language: "en",
  uiDensity: "normal",
  sidebarCollapsed: false,
  defaultPage: "/admin/dashboard",
  tableColumns: {
    id: true,
    email: true,
    status: true,
    createdAt: true
  },
  dashboardWidgets: ["stats", "recentActivity", "metrics"]
};

const initialSecurityPreferences: SecurityPreferences = {
  sessionTimeout: 120,
  requireReauthForSensitiveActions: true,
  loginNotifications: true
};

export const useSettingsStore = create<SettingsState & SettingsActions>((set, get) => ({
  // Initial state
  profile: sampleProfile,
  profileActivities: sampleActivities,
  activeSessions: sampleSessions,
  securityEvents: sampleSecurityEvents,
  notifications: initialNotifications,
  ui: initialUIPreferences,
  security: initialSecurityPreferences,
  loading: false,
  error: null,

  // Actions
  updateProfile: async (updates: Partial<AdminProfile>) => {
    set({ loading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => ({
        profile: { ...state.profile, ...updates },
        loading: false
      }));
      
      toast.success("Profile updated successfully");
      
      // Add activity log
      set(state => ({
        profileActivities: [
          {
            id: Date.now().toString(),
            type: "PROFILE_UPDATE",
            description: "Profile information updated",
            timestamp: new Date().toISOString()
          },
          ...state.profileActivities
        ]
      }));
    } catch (error: any) {
      set({ 
        loading: false, 
        error: error.message || "Failed to update profile" 
      });
      toast.error("Failed to update profile");
    }
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    set({ loading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({ loading: false });
      toast.success("Password changed successfully");
      
      // Add activity log
      set(state => ({
        profileActivities: [
          {
            id: Date.now().toString(),
            type: "PASSWORD_CHANGE",
            description: "Password updated successfully",
            timestamp: new Date().toISOString()
          },
          ...state.profileActivities
        ]
      }));
    } catch (error: any) {
      set({ 
        loading: false, 
        error: error.message || "Failed to change password" 
      });
      toast.error("Failed to change password");
    }
  },

  updateAvatar: async (avatar: File) => {
    set({ loading: true, error: null });
    
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const avatarUrl = URL.createObjectURL(avatar);
      set(state => ({
        profile: { ...state.profile, avatar: avatarUrl },
        loading: false
      }));
      
      toast.success("Profile picture updated successfully");
    } catch (error: any) {
      set({ 
        loading: false, 
        error: error.message || "Failed to update profile picture" 
      });
      toast.error("Failed to update profile picture");
    }
  },

  updateNotifications: async (updates: Partial<NotificationPreferences>) => {
    set({ loading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set(state => ({
        notifications: { ...state.notifications, ...updates },
        loading: false
      }));
      
      toast.success("Notification preferences updated");
    } catch (error: any) {
      set({ 
        loading: false, 
        error: error.message || "Failed to update notifications" 
      });
      toast.error("Failed to update notifications");
    }
  },

  updateUIPreferences: async (updates: Partial<UIPreferences>) => {
    set({ loading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set(state => ({
        ui: { ...state.ui, ...updates },
        loading: false
      }));
      
      toast.success("UI preferences updated");
    } catch (error: any) {
      set({ 
        loading: false, 
        error: error.message || "Failed to update UI preferences" 
      });
      toast.error("Failed to update UI preferences");
    }
  },

  updateSecurityPreferences: async (updates: Partial<SecurityPreferences>) => {
    set({ loading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set(state => ({
        security: { ...state.security, ...updates },
        loading: false
      }));
      
      toast.success("Security preferences updated");
    } catch (error: any) {
      set({ 
        loading: false, 
        error: error.message || "Failed to update security preferences" 
      });
      toast.error("Failed to update security preferences");
    }
  },

  terminateSession: async (sessionId: string) => {
    set({ loading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      set(state => ({
        activeSessions: state.activeSessions.filter(session => session.id !== sessionId),
        loading: false
      }));
      
      toast.success("Session terminated successfully");
    } catch (error: any) {
      set({ 
        loading: false, 
        error: error.message || "Failed to terminate session" 
      });
      toast.error("Failed to terminate session");
    }
  },

  terminateAllOtherSessions: async () => {
    set({ loading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      set(state => ({
        activeSessions: state.activeSessions.filter(session => session.isCurrent),
        loading: false
      }));
      
      toast.success("All other sessions terminated");
    } catch (error: any) {
      set({ 
        loading: false, 
        error: error.message || "Failed to terminate sessions" 
      });
      toast.error("Failed to terminate sessions");
    }
  },

  downloadPersonalData: async () => {
    set({ loading: true, error: null });
    
    try {
      // Simulate data export
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const data = get();
      const exportData = {
        profile: data.profile,
        activities: data.profileActivities,
        preferences: {
          notifications: data.notifications,
          ui: data.ui,
          security: data.security
        }
      };
      
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `quiika-personal-data-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
      
      set({ loading: false });
      toast.success("Personal data downloaded successfully");
    } catch (error: any) {
      set({ 
        loading: false, 
        error: error.message || "Failed to download personal data" 
      });
      toast.error("Failed to download personal data");
    }
  },

  clearError: () => set({ error: null })
}));