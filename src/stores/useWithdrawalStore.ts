import { create } from "zustand";
import { withdrawalAPI } from "../lib/api";
import {
	QuiikaResponse,
	WithdrawalData,
	WithdrawalRequest,
} from "../types/api";

type Loading = {
	isLoading: boolean;
	action?: "fetch" | "approve" | "reject";
	id?: string;
	message?: string;
};

type State = {
	withdrawals: WithdrawalRequest[];
	loading: Loading;
	withdrawalResponse: QuiikaResponse | null;
	error: { hasError: boolean; message?: string };
};

interface WithdrawalAction {
	processWithdrawal: (data: WithdrawalData) => Promise<void>;
	fetchWithdrawals: () => Promise<void>;
	approve: (id: string) => Promise<void>;
	reject: (id: string, reason: string) => Promise<void>;
	clearError: () => void;
}

export const useWithdrawalStore = create<WithdrawalAction & State>((set) => ({
	loading: { isLoading: false },
	error: { hasError: false, message: "" },
	withdrawalResponse: null,
	withdrawals: [],

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
						"Withdrawal failed",
				},
			});
			throw error;
		}
	},

	fetchWithdrawals: async () => {
		set({ loading: { isLoading: true, action: "fetch" } });
		try {
			const mockWithdrawals: WithdrawalRequest[] = [
				{
					id: 1,
					quid: "MGOG8R-BSO3LG",
					transaction: {
						id: 1,
						email: "user@example.com",
						amount: 50000,
						currency: "NGN",
						quid: "MGOG8R-BSO3LG",
						reference: "ref_123",
						transactionId: "txn_123",
						status: "SUCCESS",
						blocked: false,
						createdAt: "2024-01-15T10:30:00Z",
						updatedAt: "2024-01-15T10:30:00Z",
					},
					accountName: "John Doe",
					accountNumber: "1234567890",
					amount: 48500, // After fees
					bank: "First Bank",
					bankCode: "011",
					reference: "withdraw_123",
					currency: "NGN",
					status: "PENDING",
					accessKey: "access_key_123",
					createdAt: "2024-01-15T11:00:00Z",
					updatedAt: "2024-01-15T11:00:00Z",
				},
				{
					id: 2,
					quid: "ABCD12-XYZ789",
					transaction: {
						id: 2,
						email: "jane@example.com",
						amount: 100000,
						currency: "NGN",
						quid: "ABCD12-XYZ789",
						reference: "ref_456",
						transactionId: "txn_456",
						status: "SUCCESS",
						blocked: false,
						createdAt: "2024-01-14T15:20:00Z",
						updatedAt: "2024-01-14T15:20:00Z",
					},
					accountName: "Jane Smith",
					accountNumber: "9876543210",
					amount: 97000,
					bank: "GTBank",
					bankCode: "058",
					reference: "withdraw_456",
					currency: "NGN",
					status: "PENDING",
					accessKey: "access_key_456",
					createdAt: "2024-01-14T16:00:00Z",
					updatedAt: "2024-01-14T16:00:00Z",
				},
			];
			//   const data = await withdrawalAPI.fetchAllRequests();
			set({
				withdrawals: mockWithdrawals,
				loading: { isLoading: false },
			});
		} catch (e: any) {
			set({
				error: { hasError: true, message: e.message },
				loading: { isLoading: false },
			});
		}
	},

	approve: async (id: string) => {
		set({ loading: { isLoading: true, action: "approve", id } });
		// await api.post(`/admin/withdrawals/${id}/approve`);
		set((s) => ({
			withdrawals: s.withdrawals.map((w) =>
				w.id.toString() === id ? { ...w, status: "COMPLETED" } : w
			),
			loading: { isLoading: false },
		}));
	},

	reject: async (id: string, reason: string) => {
		set({ loading: { isLoading: true, action: "reject", id } });
		// await api.post(`/admin/withdrawals/${id}/reject`, { reason });
		set((s) => ({
			withdrawals: s.withdrawals.map((w) =>
				w.id.toString() === id ? { ...w, status: "FAILED" } : w
			),
			loading: { isLoading: false },
		}));
	},

	clearError: () => set({ error: { hasError: false, message: "" } }),
}));
