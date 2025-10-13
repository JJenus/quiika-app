import { create } from "zustand";
import { withdrawalAPI } from "../lib/api";
import { QuiikaResponse, WithdrawalData } from "../types/api";

interface WithdrawalState {
	loading: { isLoading: boolean; message?: string };
	error: { hasError: boolean; message?: string };
	withdrawalResponse: QuiikaResponse | null;
	processWithdrawal: (data: WithdrawalData) => Promise<void>;
	clearError: () => void;
}

export const useWithdrawalStore = create<WithdrawalState>((set) => ({
	loading: { isLoading: false },
	error: { hasError: false, message: "" },
	withdrawalResponse: null,
	processWithdrawal: async (data) => {
		set({
			loading: { isLoading: true },
			error: { hasError: false, message: "" },
			withdrawalResponse: null,
		});
		try {
			const response = await withdrawalAPI.initiateRequest(data);

			set({
				loading: { isLoading: false },
				withdrawalResponse: response.data,
			});
			// return response.data!;
		} catch (error: any) {
			set({
				loading: { isLoading: false },
				error: {
					hasError: true,
					message:
						error.response?.data?.message ||
						error.message ||
						"Withdrawal failed"
				},
			});
			throw error;
		}
	},
	clearError: () => set({ error: { hasError: false, message: "" } }),
}));
