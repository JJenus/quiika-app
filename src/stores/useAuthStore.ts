// src/stores/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { auth, UserRole } from "../lib/api";
import { apiClient } from "../lib/api-client";

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
	_hasHydrated: boolean; // Track hydration state
}

interface AuthActions {
	login: (email: string, password: string) => Promise<boolean>;
	logout: () => void;
	initializeAuth: () => void;
	clearError: () => void;
	updateUser: (updates: Partial<User>) => void;
	setHasHydrated: (state: boolean) => void;
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
			_hasHydrated: false, // Initial hydration state

			login: async (email: string, password: string) => {
				set({
					loading: { isLoading: true, message: "Signing in..." },
					error: { hasError: false },
				});

				try {
					const { data, error } = await auth.login({
						email,
						password,
					});

					if (error) {
						throw new Error(error);
					}

					if (data) {
						const { accessToken, user: userData } = data;
						const iUser = userData!;

						const user: User = {
							id: iUser.id?.toString() || "",
							email: iUser.email || "",
							firstName: iUser.firstName || "",
							lastName: iUser.lastName || "",
							role: iUser.role! || "SUPPORT",
							isActive: true,
							lastLogin: new Date().toISOString(),
							createdAt:
								iUser.createdAt || new Date().toISOString(),
						};

						// Set the auth token in the API client immediately
						apiClient.setAuthToken(accessToken!);

						set({
							isAuthenticated: true,
							user,
							token: accessToken,
							loading: { isLoading: false },
						});

						return true;
					}
					return false;
				} catch (error: any) {
					set({
						loading: { isLoading: false },
						error: {
							hasError: true,
							message: error.message || "Login failed",
						},
					});
					return false;
				}
			},

			logout: () => {
				// Clear auth token from API client
				apiClient.clearAuthToken();

				set({
					isAuthenticated: false,
					user: null,
					token: null,
					loading: { isLoading: false },
					error: { hasError: false },
				});
			},

			initializeAuth: () => {
				const { token, user } = get();
				if (token && user) {
					// Set the auth token in the API client on initialization
					apiClient.setAuthToken(token);
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

			setHasHydrated: (state) => {
				set({ _hasHydrated: state });
			},
		}),
		{
			name: "quiika-auth",
			partialize: (state) => ({
				token: state.token,
				user: state.user,
				isAuthenticated: state.isAuthenticated,
			}),
			onRehydrateStorage: () => (state) => {
				// This runs after the store is rehydrated from storage
				if (state) {
					state.setHasHydrated(true);

					// Sync token with API client after hydration
					if (state.token) {
						apiClient.setAuthToken(state.token);
						console.log("Auth token synced from persistence");
					}
				}
			},
		}
	)
);

export default useAuthStore;
