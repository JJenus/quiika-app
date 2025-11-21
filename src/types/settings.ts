import { UserSessionDetails, NotificationPreferences, UIPreferences, SecurityPreferences } from "@/lib/api";

export interface AdminProfile {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	phone?: string;
	avatar?: string;
	role: "SUPER_ADMIN" | "ADMIN" | "SUPPORT";
	status: "ACTIVE" | "DISABLED";
	createdAt: string;
	lastLogin?: string;
	lastPasswordChange?: string;
}

export interface ProfileActivity {
	id: string;
	type:
		| "LOGIN"
		| "PASSWORD_CHANGE"
		| "PROFILE_UPDATE"
		| "SECURITY_SETTING_CHANGE";
	description: string;
	timestamp: string;
	ipAddress?: string;
	userAgent?: string;
	location?: string;
}

export interface UserSession {
	id: string;
	deviceName: string;
	deviceType: "DESKTOP" | "MOBILE" | "TABLET";
	ipAddress: string;
	location: string;
	lastActive: string;
	isCurrent: boolean;
	userAgent: string;
}

export interface SecurityEvent {
	id: string;
	type:
		| "PASSWORD_CHANGE"
		| "SESSION_TERMINATED"
		| "PROFILE_UPDATE"
		| "LOGIN_ATTEMPT";
	description: string;
	timestamp: string;
	ipAddress?: string;
	status: "SUCCESS" | "FAILED" | "SUSPICIOUS";
}

// export interface NotificationPreferences {
// 	emailAlerts: boolean;
// 	systemAlerts: boolean;
// 	dailyDigest: boolean;
// 	withdrawalNotifications: boolean;
// 	securityAlerts: boolean;
// }

// export interface UIPreferences {
//     theme: 'light' | 'dark' | 'system'; // This now syncs with useThemeStore
//     timezone: string;
//     language: string;
//     uiDensity: 'compact' | 'normal' | 'comfortable';
//     sidebarCollapsed: boolean; // This syncs with useUIStore
//     defaultPage: string;
//     tableColumns: Record<string, boolean>;
//     dashboardWidgets: string[];
//   }

// export interface SecurityPreferences {
// 	sessionTimeout: number; // minutes
// 	requireReauthForSensitiveActions: boolean;
// 	loginNotifications: boolean;
// }

export interface SettingsState {
	profile: AdminProfile;
	profileActivities: ProfileActivity[];
	activeSessions: UserSessionDetails[];
	securityEvents: SecurityEvent[];
	notifications: NotificationPreferences;
	ui: UIPreferences;
	security: SecurityPreferences;
	loading: boolean;
	error: string | null;
}

export interface SettingsActions {
	// Fetch actions
	fetchAllSettings: () => Promise<void>;
	fetchProfile: () => Promise<void>;
	fetchProfileActivities: () => Promise<void>;
	fetchActiveSessions: () => Promise<void>;
	fetchSecurityEvents: () => Promise<void>;
	fetchPreferences: () => Promise<void>;
	
	// Update actions (existing)
	updateProfile: (profile: Partial<AdminProfile>) => Promise<void>;
	changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
	updateAvatar: (avatar: File) => Promise<void>;
	updateNotifications: (notifications: Partial<NotificationPreferences>) => Promise<void>;
	updateUIPreferences: (ui: Partial<UIPreferences>) => Promise<void>;
	updateSecurityPreferences: (security: Partial<SecurityPreferences>) => Promise<void>;
	terminateSession: (sessionId: string) => Promise<void>;
	terminateAllOtherSessions: () => Promise<void>;
	downloadPersonalData: () => Promise<void>;
	clearError: () => void;
  }
