import { create } from "zustand";
import { toast } from "react-hot-toast";
import {
	SettingsState,
	SettingsActions,
	AdminProfile,
	ProfileActivity,
	UserSession,
	SecurityEvent,
} from "@/types/settings";

import {
	session,
	admin,
	NotificationPreferences,
	UIPreferences,
	SecurityPreferences,
} from "@/lib/api";

// Initial empty states
const initialProfile: AdminProfile = {
	id: "",
	email: "",
	firstName: "",
	lastName: "",
	phone: "",
	role: "SUPPORT",
	status: "ACTIVE",
	createdAt: "",
	lastLogin: "",
	lastPasswordChange: "",
};

const initialNotifications: NotificationPreferences = {
	emailAlerts: true,
	systemAlerts: true,
	dailyDigest: false,
	withdrawalNotifications: true,
	securityAlerts: true,
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
		createdAt: true,
	},
	dashboardWidgets: ["stats", "recentActivity", "metrics"],
};

const initialSecurityPreferences: SecurityPreferences = {
	sessionTimeout: 120,
	requireReauthForSensitiveActions: true,
	loginNotifications: true,
};

export const useSettingsStore = create<SettingsState & SettingsActions>(
	(set, get) => ({
		// Initial state - empty until fetched
		profile: initialProfile,
		profileActivities: [],
		activeSessions: [],
		securityEvents: [],
		notifications: initialNotifications,
		ui: initialUIPreferences,
		security: initialSecurityPreferences,
		loading: false,
		error: null,

		// ========== FETCH ACTIONS ==========

		// Fetch all settings data on app initialization
		fetchAllSettings: async () => {
			set({ loading: true, error: null });
			try {
				await Promise.all([
					get().fetchProfile(),
					get().fetchProfileActivities(),
					get().fetchActiveSessions(),
					get().fetchSecurityEvents(),
					get().fetchPreferences(),
				]);
				set({ loading: false });
			} catch (error: any) {
				set({
					loading: false,
					error: error.message || "Failed to load settings",
				});
			}
		},

		// Fetch user profile
		fetchProfile: async () => {
			set({ loading: true, error: null });
			try {
				const { data, error } = await admin.settings.getUserProfile();

				if (error) {
					throw new Error(error);
				}

				if (data) {
					// Transform API response to match AdminProfile type
					const profile: AdminProfile = {
						id: data.id?.toString() || "",
						email: data.email || "",
						firstName: data.firstName || "",
						lastName: data.lastName || "",
						phone: data.phone || "",
						role: (data.role as any) || "SUPPORT",
						status: (data.status as any) || "ACTIVE",
						createdAt: data.createdAt || "",
						lastLogin: data.lastLogin || "",
						lastPasswordChange: data.lastPasswordChange || "",
						avatar: data.avatar || "",
					};

					set({ profile, loading: false });
				}
			} catch (error: any) {
				set({
					loading: false,
					error: error.message || "Failed to fetch profile",
				});
			}
		},

		// Fetch profile activities
		fetchProfileActivities: async () => {
			set({ loading: true, error: null });
			try {
				// TODO: Replace with actual API call when available
				// For now, using sample data
				await new Promise((resolve) => setTimeout(resolve, 300));

				const sampleActivities: ProfileActivity[] = [
					{
						id: "1",
						type: "LOGIN",
						description: "Successful login from Chrome on Windows",
						timestamp: "2024-12-19T10:30:00Z",
						ipAddress: "192.168.1.100",
						location: "Lagos, Nigeria",
					},
					{
						id: "2",
						type: "PASSWORD_CHANGE",
						description: "Password updated successfully",
						timestamp: "2024-11-15T14:20:00Z",
						ipAddress: "192.168.1.100",
					},
					{
						id: "3",
						type: "PROFILE_UPDATE",
						description: "Profile information updated",
						timestamp: "2024-10-20T09:15:00Z",
					},
				];

				set({ profileActivities: sampleActivities, loading: false });
			} catch (error: any) {
				set({
					loading: false,
					error: error.message || "Failed to fetch activities",
				});
			}
		},

		// Fetch active sessions
		fetchActiveSessions: async () => {
			set({ loading: true, error: null });
			try {
				console.log("Fetching sessions...");
				const { data, error } = await session.getActiveSessions();

				if (error) {
					throw new Error(error);
				}

				if (data) {
					// Transform API response to match UserSession type
					const sessions: UserSession[] = data.map(
						(session: any) => ({
							id: session.sessionId || "",
							deviceName: session.deviceName || "Unknown Device",
							deviceType:
								(session.deviceType as
									| "DESKTOP"
									| "MOBILE"
									| "TABLET") || "DESKTOP",
							ipAddress: session.ipAddress || "",
							location: session.location || "Unknown Location",
							lastActive: session.lastActive || "",
							isCurrent: session.current || false,
							userAgent: session.userAgent || "",
						})
					);

					console.log("Fetching sessions done.");
					set({ activeSessions: sessions, loading: false });
				}
			} catch (error: any) {
				set({
					loading: false,
					error: error.message || "Failed to fetch sessions",
				});
			}
		},

		// Fetch security events
		fetchSecurityEvents: async () => {
			set({ loading: true, error: null });
			try {
				// TODO: Replace with actual API call when available
				// For now, using sample data
				await new Promise((resolve) => setTimeout(resolve, 300));

				const sampleSecurityEvents: SecurityEvent[] = [
					{
						id: "1",
						type: "LOGIN_ATTEMPT",
						description: "Successful login",
						timestamp: "2024-12-19T10:30:00Z",
						ipAddress: "192.168.1.100",
						status: "SUCCESS",
					},
					{
						id: "2",
						type: "PASSWORD_CHANGE",
						description: "Password changed",
						timestamp: "2024-11-15T14:20:00Z",
						status: "SUCCESS",
					},
					{
						id: "3",
						type: "SESSION_TERMINATED",
						description: "Session terminated from unknown device",
						timestamp: "2024-11-10T16:30:00Z",
						ipAddress: "192.168.1.150",
						status: "SUSPICIOUS",
					},
				];

				set({ securityEvents: sampleSecurityEvents, loading: false });
			} catch (error: any) {
				set({
					loading: false,
					error: error.message || "Failed to fetch security events",
				});
			}
		},

		// Fetch all preferences
		fetchPreferences: async () => {
			set({ loading: true, error: null });
			try {
				const { data, error } = await admin.settings.getAllSettings();

				if (error) {
					throw new Error(error);
				}

				if (data) {
					// Transform API response to match our preference types
					// Note: You may need to adjust this based on actual API response structure
					const preferences = {
						notifications:
							data.notifications || initialNotifications,
						ui: data.ui || initialUIPreferences,
						security: data.security || initialSecurityPreferences,
					};

					set({
						notifications: preferences.notifications,
						ui: preferences.ui,
						security: preferences.security,
						loading: false,
					});
				}
			} catch (error: any) {
				set({
					loading: false,
					error: error.message || "Failed to fetch preferences",
				});
			}
		},

		// ========== UPDATE ACTIONS ==========

		updateProfile: async (updates: Partial<AdminProfile>) => {
			set({ loading: true, error: null });

			try {
				const { data, error } = await admin.settings.updateUserProfile({
					...updates,
				});

				if (error) {
					throw new Error(error);
				}

				if (data) {
					set((state) => ({
						profile: { ...state.profile, ...updates },
						loading: false,
					}));

					toast.success("Profile updated successfully");

					// Refresh activities to show the update
					get().fetchProfileActivities();
				}
			} catch (error: any) {
				set({
					loading: false,
					error: error.message || "Failed to update profile",
				});
				toast.error("Failed to update profile");
			}
		},

		changePassword: async (
			currentPassword: string,
			newPassword: string
		) => {
			set({ loading: true, error: null });

			try {
				const { error } = await admin.settings.changePassword({
					currentPassword,
					newPassword,
				});

				if (error) {
					throw new Error(error);
				}

				set({ loading: false });
				toast.success("Password changed successfully");

				// Refresh activities and security events
				Promise.all([
					get().fetchProfileActivities(),
					get().fetchSecurityEvents(),
					get().fetchProfile(), // to update lastPasswordChange
				]);
			} catch (error: any) {
				set({
					loading: false,
					error: error.message || "Failed to change password",
				});
				toast.error("Failed to change password");
			}
		},

		updateAvatar: async (avatar: File) => {
			set({ loading: true, error: null });

			try {
				const { data, error } = await admin.settings.uploadAvatar({
					avatar,
				});

				if (error) {
					throw new Error(error);
				}

				if (data) {
					set((state) => ({
						profile: { ...state.profile, avatar: data.avatarUrl },
						loading: false,
					}));

					toast.success("Profile picture updated successfully");
				}
			} catch (error: any) {
				set({
					loading: false,
					error: error.message || "Failed to update profile picture",
				});
				toast.error("Failed to update profile picture");
			}
		},

		updateNotifications: async (
			updates: Partial<NotificationPreferences>
		) => {
			set({ loading: true, error: null });

			try {
				const { data, error } =
					await admin.settings.updateNotificationPreferences({
						notificationPreferencesDto: updates,
					});

				if (error) {
					throw new Error(error);
				}

				if (data) {
					set((state) => ({
						notifications: { ...state.notifications, ...updates },
						loading: false,
					}));

					toast.success("Notification preferences updated");
				}
			} catch (error: any) {
				set({
					loading: false,
					error: error.message || "Failed to update notifications",
				});
				toast.error("Failed to update notifications");
			}
		},

		updateUIPreferences: async (updates: Partial<UIPreferences>) => {
			set({ loading: true, error: null });

			try {
				const { data, error } =
					await admin.settings.updateUIPreferences({
						uIPreferencesDto: updates,
					});

				if (error) {
					throw new Error(error);
				}

				if (data) {
					set((state) => ({
						ui: { ...state.ui, ...updates },
						loading: false,
					}));

					toast.success("UI preferences updated");
				}
			} catch (error: any) {
				set({
					loading: false,
					error: error.message || "Failed to update UI preferences",
				});
				toast.error("Failed to update UI preferences");
			}
		},

		updateSecurityPreferences: async (
			updates: Partial<SecurityPreferences>
		) => {
			set({ loading: true, error: null });

			try {
				const { data, error } =
					await admin.settings.updateSecurityPreferences({
						securityPreferencesDto: updates,
					});

				if (error) {
					throw new Error(error);
				}

				if (data) {
					set((state) => ({
						security: { ...state.security, ...updates },
						loading: false,
					}));

					toast.success("Security preferences updated");
				}
			} catch (error: any) {
				set({
					loading: false,
					error:
						error.message ||
						"Failed to update security preferences",
				});
				toast.error("Failed to update security preferences");
			}
		},

		// Session management
		terminateSession: async (sessionId: string) => {
			set({ loading: true, error: null });

			try {
				console.log("revoking session");
				const { error } = await session.revokeSession(sessionId);

				if (error) {
					throw new Error(error);
				}

				set((state) => ({
					activeSessions: state.activeSessions.filter(
						(session) => session.sessionId !== sessionId
					),
					loading: false,
				}));

				toast.success("Session terminated successfully");

				// Refresh security events
				get().fetchSecurityEvents();
			} catch (error: any) {
				set({
					loading: false,
					error: error.message || "Failed to terminate session",
				});
				toast.error("Failed to terminate session");
			}
		},

		terminateAllOtherSessions: async () => {
			set({ loading: true, error: null });

			try {
				const { error } = await session.revokeOtherSessions();

				if (error) {
					throw new Error(error);
				}

				set((state) => ({
					activeSessions: state.activeSessions.filter(
						(session) => session.current
					),
					loading: false,
				}));

				toast.success("All other sessions terminated");

				// Refresh security events
				get().fetchSecurityEvents();
			} catch (error: any) {
				set({
					loading: false,
					error: error.message || "Failed to terminate sessions",
				});
				toast.error("Failed to terminate sessions");
			}
		},

		downloadPersonalData: async () => {
			set({ loading: true, error: null });

			try {
				// TODO: Replace with actual API call when available
				// For now, using client-side generation
				await new Promise((resolve) => setTimeout(resolve, 2000));

				const data = get();
				const exportData = {
					profile: data.profile,
					activities: data.profileActivities,
					preferences: {
						notifications: data.notifications,
						ui: data.ui,
						security: data.security,
					},
				};

				const blob = new Blob([JSON.stringify(exportData, null, 2)], {
					type: "application/json",
				});
				const url = URL.createObjectURL(blob);
				const link = document.createElement("a");
				link.href = url;
				link.download = `quiika-personal-data-${
					new Date().toISOString().split("T")[0]
				}.json`;
				link.click();
				URL.revokeObjectURL(url);

				set({ loading: false });
				toast.success("Personal data downloaded successfully");
			} catch (error: any) {
				set({
					loading: false,
					error: error.message || "Failed to download personal data",
				});
				toast.error("Failed to download personal data");
			}
		},

		clearError: () => set({ error: null }),
	})
);
