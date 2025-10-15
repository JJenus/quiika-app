import { create } from "zustand";
import { transactionAPI } from "../lib/api";
import type { Bank, ResolveBank, LoadingState, ErrorState } from "../types/api";

interface BankStore {
	banks: Bank[];
	resolvedAccount: ResolveBank | null;
	loading: LoadingState;
	error: ErrorState;

	// Actions
	fetchBanks: () => Promise<void>;
	resolveAccountName: (
		accountNumber: string,
		bankCode: string
	) => Promise<ResolveBank | null>;
	clearResolvedAccount: () => void;
	clearError: () => void;
}

export const useBankStore = create<BankStore>((set) => ({
	banks: [],
	resolvedAccount: null,
	loading: { isLoading: false },
	error: { hasError: false },

	fetchBanks: async () => {
		set({
			loading: { isLoading: true, message: "Loading banks..." },
			error: { hasError: false },
		});

		try {
			const response = await transactionAPI.getBanks();
			// Filter active banks and sort alphabetically
			const activeBanks = response.data.sort((a, b) =>
				a.name.localeCompare(b.name)
			);

			set({
				banks: activeBanks,
				loading: { isLoading: false },
			});
		} catch (error: any) {
			set({
				loading: { isLoading: false },
				error: {
					hasError: true,
					message:
						error.response?.data?.message ||
						error.message ||
						"Failed to fetch banks",
				},
			});
		}
	},

	resolveAccountName: async (accountNumber, bankCode) => {
		if (import.meta.env.VITE_TEST_ENV === "yes") {
			const data = {
				accountNumber: "9033915161",
				bankCode: "999992",
				accountName: "Test Account Name",
			};

			set({
				resolvedAccount: data,
				loading: { isLoading: false },
			});

			return data;
		}

		set({
			loading: { isLoading: true, message: "Resolving account name..." },
			error: { hasError: false },
		});

		try {
			const response = await transactionAPI.resolveBank({
				accountNumber,
				bankCode,
			});
			set({
				resolvedAccount: response.data,
				loading: { isLoading: false },
			});
			return response.data;
		} catch (error: any) {
			set({
				loading: { isLoading: false },
				error: {
					hasError: true,
					message:
						error.response?.data?.message ||
						error.message ||
						"Failed to resolve account name",
				},
			});
			return null;
		}
	},

	clearResolvedAccount: () => set({ resolvedAccount: null }),

	clearError: () => set({ error: { hasError: false } }),
}));
