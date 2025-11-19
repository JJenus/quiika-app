import { create } from "zustand";
import type { Transaction, LoadingState, ErrorState } from "../types/api";
import { transaction } from "@/lib/api-services";
import { TransactionDto } from "@/lib/api";
import { withApiKey } from "@/utils/apiKeyManager";

interface TransactionStore {
	transactions: Transaction[];
	currentTransaction: TransactionDto | null;
	loading: LoadingState;
	error: ErrorState;

	initializeTransaction: (
		data: TransactionDto
	) => Promise<TransactionDto | null>;
	fetchTransactions: () => Promise<void>;
	fetchTransaction: (transactionId: string) => Promise<void>;
	verifyTransaction: (quid: string) => Promise<TransactionDto | null>;
	verifyTransactionRef: (quid: string) => Promise<TransactionDto | null>;
	clearError: () => void;
	reset: () => void;
}

export const useTransactionStore = create<TransactionStore>((set, get) => ({
	transactions: [],
	currentTransaction: null,
	loading: { isLoading: false },
	error: { hasError: false },

	initializeTransaction: async (data) =>
		withApiKey(async () => {
			set({
				loading: {
					isLoading: true,
					message: "Initializing payment...",
				},
				error: { hasError: false },
			});

			try {
				data.authorizationUrl = `${window.location.origin}/payment/callback`;
				const response = await transaction.initTransaction(data);

				if (!response.data) {
					throw new Error(
						response.error || "Failed to initialize payment"
					);
				}

				set({ loading: { isLoading: false } });
				return response.data;
			} catch (error: any) {
				console.log(error);
				set({
					loading: { isLoading: false },
					error: {
						hasError: true,
						message:
							error.message || "Payment initialization failed",
					},
				});
				return null;
			}
		}),

	fetchTransactions: async () =>
		withApiKey(async () => {
			set({
				loading: {
					isLoading: true,
					message: "Loading transactions...",
				},
				error: { hasError: false },
			});

			try {
				const response = await transaction.findAll();
				if (!response.data) {
					throw new Error(
						response.error || "Failed to fetch transactions"
					);
				}

				set({
					transactions: response.data,
					loading: { isLoading: false },
				});
			} catch (error: any) {
				console.log(error);
				set({
					loading: { isLoading: false },
					error: {
						hasError: true,
						message:
							error.message || "Failed to fetch transactions",
					},
				});
			}
		}),

	fetchTransaction: async (transactionId) =>
		withApiKey(async () => {
			set({
				loading: { isLoading: true, message: "Loading transaction..." },
				error: { hasError: false },
			});

			try {
				const response = await transaction.findTransaction(
					transactionId
				);
				if (!response.data) {
					throw new Error(
						response.error || "Failed to fetch transaction"
					);
				}

				set({
					currentTransaction: response.data,
					loading: { isLoading: false },
				});
			} catch (error: any) {
				console.log(error);
				set({
					loading: { isLoading: false },
					error: {
						hasError: true,
						message: error.message || "Failed to fetch transaction",
					},
				});
			}
		}),

	verifyTransaction: async (quid) =>
		withApiKey(async () => {
			set({
				loading: {
					isLoading: true,
					message: "Verifying transaction...",
				},
				error: { hasError: false },
			});

			try {
				const response = await transaction.verifyTransaction(quid);
				if (!response.data) {
					throw new Error(
						response.error || "Transaction verification failed"
					);
				}

				set({
					currentTransaction: response.data,
					loading: { isLoading: false },
				});

				return response.data;
			} catch (error: any) {
				console.log(error);
				set({
					loading: { isLoading: false },
					error: {
						hasError: true,
						message:
							error.message || "Transaction verification failed",
					},
				});
				return null;
			}
		}),

	verifyTransactionRef: async (ref) =>
		withApiKey(async () => {
			set({
				loading: {
					isLoading: true,
					message: "Verifying transaction...",
				},
				error: { hasError: false },
			});

			try {
				const response = await transaction.verifyTransactionRef(ref);
				if (!response.data) {
					throw new Error(
						response.error || "Transaction verification failed"
					);
				}

				set({
					currentTransaction: response.data,
					loading: { isLoading: false },
				});

				return response.data;
			} catch (error: any) {
				console.log(error);
				set({
					loading: { isLoading: false },
					error: {
						hasError: true,
						message:
							error.message || "Transaction verification failed",
					},
				});
				return null;
			}
		}),

	clearError: () => set({ error: { hasError: false } }),

	reset: () =>
		set({
			currentTransaction: null,
			loading: { isLoading: false },
			error: { hasError: false },
		}),
}));
