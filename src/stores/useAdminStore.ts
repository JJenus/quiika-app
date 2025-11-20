import { create } from "zustand";
import {
	admin,
	createPageable,
	PERIOD,
	QuidMetrics,
	TransactionMetrics,
	DashboardMetricsDto,
	PageWithdrawalRequestDto,
	WithdrawalMetrics,
} from "../lib/api";
import type {
	Transaction,
	WithdrawalRequest,
	AdminQuid,
	AdminTransaction,
	AdminQuidListParams,
	AdminTransactionListParams,
	PaginatedResponse,
	BulkActionResponse,
	ExportFormat,
	QuidStatus,
	TransactionStatus,
} from "../types/api";
import { AdminUser, FinancialData } from "../types/admin";
import { WithdrawalRequestDto } from "@/lib/api-sdk/api";

interface AdminState {
	stats: DashboardMetricsDto;
	financialData: FinancialData;
	users: AdminUser[];
	recentTransactions: Transaction[];
	pendingWithdrawals: WithdrawalRequest[];

	// Withdrawals
	withdrawals: PageWithdrawalRequestDto;
	withdrawalMetrics: WithdrawalMetrics;

	// QUID Management
	quids: PaginatedResponse<AdminQuid> | null;
	quidListParams: AdminQuidListParams;
	selectedQuids: number[];
	quidMetrics: QuidMetrics;

	// Transaction Management
	transactions: PaginatedResponse<AdminTransaction> | null;
	transactionListParams: AdminTransactionListParams;
	selectedTransactions: number[];
	transactionMetrics: TransactionMetrics;

	loading: { isLoading: boolean; message?: string };
	error: { hasError: boolean; message?: string };
	selectedUsers: string[];
}

interface AdminActions {
	fetchDashboardStats: (period?: PERIOD) => Promise<void>;
	fetchFinancialData: () => Promise<void>;

	fetchUsers: () => Promise<void>;
	inviteUser: (email: string, role: AdminUser["role"]) => Promise<boolean>;
	updateUserRole: (
		userId: string,
		role: AdminUser["role"]
	) => Promise<boolean>;
	deactivateUser: (userId: string) => Promise<boolean>;

	approveWithdrawal: (withdrawalId: string) => Promise<boolean>;
	rejectWithdrawal: (
		withdrawalId: string,
		reason: string
	) => Promise<boolean>;
	fetchWithdrawalMetrics: (period?: PERIOD) => Promise<void>;

	fetchWithdrawals: () => Promise<void>;

	// QUID Management
	fetchQuids: () => Promise<void>;
	setQuidListParams: (params: Partial<AdminQuidListParams>) => void;
	selectQuid: (quidId: number, selected: boolean) => void;
	selectAllQuids: (select: boolean) => void;
	clearQuidSelection: () => void;
	updateQuidStatus: (quidId: number, status: QuidStatus) => Promise<boolean>;
	bulkUpdateQuidStatus: (
		status: QuidStatus
	) => Promise<BulkActionResponse | null>;
	exportQuids: (format: ExportFormat) => Promise<void>;
	fetchQuidMetrics: (period: PERIOD) => Promise<void>;

	// Transaction Management
	fetchTransactions: () => Promise<void>;
	setTransactionListParams: (
		params: Partial<AdminTransactionListParams>
	) => void;
	selectTransaction: (transactionId: number, selected: boolean) => void;
	selectAllTransactions: (select: boolean) => void;
	clearTransactionSelection: () => void;
	fetchTransactionDetails: (
		transactionId: number
	) => Promise<AdminTransaction | null>;
	updateTransactionStatus: (
		transactionId: number,
		status: TransactionStatus
	) => Promise<boolean>;
	exportTransactions: (format: ExportFormat) => Promise<void>;
	fetchTransactionMetrics: (period?: PERIOD) => Promise<void>;

	clearError: () => void;

	selectUser: (userId: string, selected: boolean) => void;
	selectAllUsers: (select: boolean) => void;
	clearUserSelection: () => void;
	exportUsers: (format: ExportFormat) => Promise<void>;
}

type AdminStore = AdminState & AdminActions;

export const useAdminStore = create<AdminStore>((set, get) => ({
	stats: {
		totalUsers: 0,
		totalTransactions: 0,
		totalRevenue: 0,
		totalWithdrawals: 0,
		activeQuids: 0,
		pendingWithdrawals: 0,
		monthlyGrowth: 0,
		conversionRate: 0,
	},

	// Withdrawal Management state
	withdrawals: [],
	withdrawalMetrics: {},

	financialData: {
		totalRevenue: 0,
		totalFees: 0,
		totalWithdrawals: 0,
		netProfit: 0,
		monthlyRevenue: [],
		revenueBySource: [],
	},
	users: [],
	recentTransactions: [],
	pendingWithdrawals: [],

	// QUID Management state
	quids: null,
	quidListParams: { page: 1, limit: 10 },
	selectedQuids: [],
	quidMetrics: {},

	// Transaction Management state
	transactions: null,
	transactionListParams: { page: 1, limit: 10 },
	selectedTransactions: [],
	transactionMetrics: {},

	loading: { isLoading: false },
	error: { hasError: false },

	selectedUsers: [],

	selectUser: (userId: string, selected: boolean) => {
		set((state) => ({
			selectedUsers: selected
				? [...state.selectedUsers, userId]
				: state.selectedUsers.filter((id) => id !== userId),
		}));
	},

	selectAllUsers: (select: boolean) => {
		set((state) => ({
			selectedUsers: select ? state.users.map((u) => u.id) : [],
		}));
	},

	clearUserSelection: () => set({ selectedUsers: [] }),

	exportUsers: async (format: ExportFormat) => {
		set({ loading: { isLoading: true, message: "Exporting users..." } });
		try {
			console.log("Exporting users in format:", format);
			// TODO: Implement actual export when backend supports it
			set({ loading: { isLoading: false } });
		} catch (error: any) {
			set({
				loading: { isLoading: false },
				error: { hasError: true, message: "Export failed" },
			});
		}
	},

	fetchDashboardStats: async (period?: PERIOD) => {
		set({
			loading: { isLoading: true, message: "Loading dashboard stats..." },
			error: { hasError: false },
		});

		try {
			const { data, error } = await admin.dashboard.getMetrics(
				period || "MONTHLY"
			);

			if (error) {
				throw new Error(error);
			}

			if (data) {
				// Transform API response to match your AdminStats type
				// const stats: AdminStats = {
				// 	totalUsers: data.totalUsers?.value || 0,
				// 	totalTransactions: data.totalTransactions?.value || 0,
				// 	totalRevenue: data.totalQuidValue?.value || 0,
				// 	totalWithdrawals:
				// 		data.totalApprovedWithdrawalValue?.value || 0,
				// 	activeQuids: data.totalQuids?.value || 0,
				// 	pendingWithdrawals:
				// 		data.withdrawalRequestsByStatus!["pending"] || 0,
				// 	monthlyGrowth: data.totalQuidValue?.growth || 0,
				// 	conversionRate: 0,
				// };
				const stats = data!;
				set({
					stats,
					loading: { isLoading: false },
				});
			}
		} catch (error: any) {
			set({
				loading: { isLoading: false },
				error: {
					hasError: true,
					message: error.message || "Failed to load dashboard stats",
				},
			});
		}
	},

	fetchFinancialData: async () => {
		set({
			loading: { isLoading: true, message: "Loading financial data..." },
			error: { hasError: false },
		});

		try {
			// Using time series data for financial insights
			const { data, error } = await admin.dashboard.getTimeSeries(
				"MONTHLY"
			);

			if (error) {
				throw new Error(error);
			}

			if (data) {
				// Transform API response to FinancialData
				const financialData: FinancialData = {
					totalRevenue: 0,
					totalFees: 0,
					totalWithdrawals: 0,
					netProfit: 0,
					monthlyRevenue: [],
					revenueBySource: [],
				};

				set({
					financialData,
					loading: { isLoading: false },
				});
			}
		} catch (error: any) {
			set({
				loading: { isLoading: false },
				error: {
					hasError: true,
					message: error.message || "Failed to load financial data",
				},
			});
		}
	},

	fetchUsers: async () => {
		set({
			loading: { isLoading: true, message: "Loading users..." },
			error: { hasError: false },
		});

		try {
			const pageAble = createPageable({
				page: 0,
				size: 50,
				sort: ["createdAt,desc"],
			});
			const { data, error } = await admin.users.listUsers(pageAble);

			if (error) {
				throw new Error(error);
			}

			if (data && data.content) {
				// Transform UserDto[] to AdminUser[]
				const users: AdminUser[] = data.content.map((user: any) => ({
					id: user.id?.toString() || "",
					email: user.email || "",
					firstName: user.firstName || "",
					lastName: user.lastName || "",
					role: user.role || "SUPPORT",
					isActive: user.enabled || false,
					lastLogin: user.lastLogin,
					createdAt: user.createdAt || "",
					invitedBy: user.invitedBy,
				}));

				set({
					users,
					loading: { isLoading: false },
				});
			}
		} catch (error: any) {
			set({
				loading: { isLoading: false },
				error: {
					hasError: true,
					message: error.message || "Failed to load users",
				},
			});
		}
	},

	inviteUser: async (email: string, role: AdminUser["role"]) => {
		set({
			loading: { isLoading: true, message: "Sending invitation..." },
			error: { hasError: false },
		});

		try {
			const { data, error } = await admin.invites.createInvite({
				email,
				roleName: role,
			});

			if (error) {
				throw new Error(error);
			}

			if (data) {
				// Refresh users list
				get().fetchUsers();
				set({ loading: { isLoading: false } });
				return true;
			}
			return false;
		} catch (error: any) {
			set({
				loading: { isLoading: false },
				error: {
					hasError: true,
					message: error.message || "Failed to send invitation",
				},
			});
			return false;
		}
	},

	updateUserRole: async (userId: string, role: AdminUser["role"]) => {
		set({
			loading: { isLoading: true, message: "Updating user role..." },
			error: { hasError: false },
		});

		try {
			const { data, error } = await admin.users.updateUserRole(
				parseInt(userId),
				{ role }
			);

			if (error) {
				throw new Error(error);
			}

			if (data) {
				// Update local state
				set((state) => ({
					users: state.users.map((user) =>
						user.id === userId ? { ...user, role } : user
					),
					loading: { isLoading: false },
				}));
				return true;
			}
			return false;
		} catch (error: any) {
			set({
				loading: { isLoading: false },
				error: {
					hasError: true,
					message: error.message || "Failed to update user role",
				},
			});
			return false;
		}
	},

	deactivateUser: async (userId: string) => {
		set({
			loading: { isLoading: true, message: "Deactivating user..." },
			error: { hasError: false },
		});

		try {
			const { data, error } = await admin.users.updateUserStatus(
				parseInt(userId),
				{ action: "DEACTIVATE" }
			);

			if (error) {
				throw new Error(error);
			}

			if (data) {
				set((state) => ({
					users: state.users.map((user) =>
						user.id === userId ? { ...user, isActive: false } : user
					),
					loading: { isLoading: false },
				}));
				return true;
			}
			return false;
		} catch (error: any) {
			set({
				loading: { isLoading: false },
				error: {
					hasError: true,
					message: error.message || "Failed to deactivate user",
				},
			});
			return false;
		}
	},

	// Withdrawals update to allow paging
	fetchWithdrawals: async () => {
		set({
			loading: { isLoading: true, message: "Fetching withdrawals..." },
			error: { hasError: false },
		});

		try {
			const currentParams = get().quidListParams;
			const pageable = createPageable({
				page: currentParams.page - 1,
				size: currentParams.limit,
			});
			/**
			 * (property) getWithdrawals: (pageable: any, status?: any, currency?: any, search?: string) => Promise<ApiResponse<PageWithdrawalRequestDto>>
			 */

			const { data, error } = await admin.withdrawals.getWithdrawals(
				pageable
			);

			// const mockWithdrawals: WithdrawalRequestDto[] = [
			// 	{
			// 		id: 1,
			// 		accountName: "John Doe",
			// 		accountNumber: "1234567890",
			// 		amount: 48500, // After fees
			// 		bank: "First Bank",
			// 		// bankCode: "011",
			// 		reference: "withdraw_123",
			// 		currency: "NGN",
			// 		status: "PENDING",
			// 		// accessKey: "access_key_123",
			// 		createdAt: "2024-01-15T11:00:00Z",
			// 		// updatedAt: "2024-01-15T11:00:00Z",
			// 	},
			// 	{
			// 		id: 2,
			// 		accountName: "Jane Smith",
			// 		accountNumber: "9876543210",
			// 		amount: 97000,
			// 		bank: "GTBank",
			// 		reference: "withdraw_456",
			// 		currency: "NGN",
			// 		status: "PENDING",
			// 		createdAt: "2024-01-14T16:00:00Z",
			// 	},
			// ];

			if (error) {
				throw new Error(error);
			}
			// data!.content = mockWithdrawals;

			if (data) {
				set({ withdrawals: data, loading: { isLoading: false } });
			}
		} catch (error: any) {
			set({
				loading: { isLoading: false },
				error: {
					hasError: true,
					message: error.message || "Failed to fetch withdrawals",
				},
			});
		}
	},

	fetchWithdrawalMetrics: async (period: PERIOD = "MONTHLY") => {
		set({
			loading: {
				isLoading: true,
				message: "Fetching withdrawal metrics...",
			},
		});
		try {
			const { data, error } = await admin.dashboard.getWithdrawalMetrics(
				period
			);

			if (error) {
				throw new Error(error);
			}

			if (data) {
				set({ loading: { isLoading: false }, withdrawalMetrics: data });
			}
		} catch (error: any) {
			set({
				loading: { isLoading: false },
				error: {
					hasError: true,
					message:
						error.message || "Failed to fetch withdrawal metrics",
				},
			});
		}
	},

	approveWithdrawal: async (withdrawalId: string) => {
		set({
			loading: { isLoading: true, message: "Approving withdrawal..." },
			error: { hasError: false },
		});

		try {
			const { data, error } = await admin.withdrawals.approveWithdrawal(
				parseInt(withdrawalId)
			);

			if (error) {
				throw new Error(error);
			}

			if (data) {
				set((state) => ({
					pendingWithdrawals: state.pendingWithdrawals.filter(
						(w) => w.id.toString() !== withdrawalId
					),
					loading: { isLoading: false },
				}));
				return true;
			}
			return false;
		} catch (error: any) {
			set({
				loading: { isLoading: false },
				error: {
					hasError: true,
					message: error.message || "Failed to approve withdrawal",
				},
			});
			return false;
		}
	},

	rejectWithdrawal: async (withdrawalId: string, reason: string) => {
		set({
			loading: { isLoading: true, message: "Rejecting withdrawal..." },
			error: { hasError: false },
		});

		try {
			const { data, error } = await admin.withdrawals.rejectWithdrawal(
				parseInt(withdrawalId),
				reason
			);

			if (error) {
				throw new Error(error);
			}

			if (data) {
				set((state) => ({
					pendingWithdrawals: state.pendingWithdrawals.filter(
						(w) => w.id.toString() !== withdrawalId
					),
					loading: { isLoading: false },
				}));
				return true;
			}
			return false;
		} catch (error: any) {
			set({
				loading: { isLoading: false },
				error: {
					hasError: true,
					message: error.message || "Failed to reject withdrawal",
				},
			});
			return false;
		}
	},

	// QUID Management
	fetchQuids: async () => {
		set({
			loading: { isLoading: true, message: "Fetching QUIDs..." },
			error: { hasError: false },
		});

		try {
			const currentParams = get().quidListParams;
			const pageable = createPageable({
				page: currentParams.page - 1,
				size: currentParams.limit,
			});

			const { data, error } = await admin.quids.getQuids(pageable);

			if (error) {
				throw new Error(error);
			}

			if (data) {
				// Transform API response to match your AdminQuid type
				const quids: PaginatedResponse<AdminQuid> = {
					data:
						data.content?.map((quid: any) => ({
							id: quid.id,
							quid: quid.quid,
							amount: quid.amount,
							currency: quid.currency,
							status: quid.status,
							creatorEmail: quid.creatorEmail,
							createdAt: quid.createdAt,
							transactionCount: quid.transactionCount,
							blocked: quid.blocked,
							updatedAt: quid.updatedAt,
						})) || [],
					total: data.totalElements || 0,
					page: currentParams.page,
					limit: currentParams.limit,
					totalPages: data.totalPages || 1,
				};

				set({ quids, loading: { isLoading: false } });
			}
		} catch (error: any) {
			set({
				loading: { isLoading: false },
				error: {
					hasError: true,
					message: error.message || "Failed to fetch QUIDs",
				},
			});
		}
	},

	setQuidListParams: (params: Partial<AdminQuidListParams>) => {
		set((state) => ({
			quidListParams: {
				...state.quidListParams,
				...params,
				page: params.page || 1,
			},
		}));
	},

	selectQuid: (quidId: number, selected: boolean) => {
		set((state) => ({
			selectedQuids: selected
				? [...state.selectedQuids, quidId]
				: state.selectedQuids.filter((id) => id !== quidId),
		}));
	},

	selectAllQuids: (select: boolean) => {
		set((state) => ({
			selectedQuids: select
				? state.quids?.data.map((q) => q.id) || []
				: [],
		}));
	},

	clearQuidSelection: () => set({ selectedQuids: [] }),

	updateQuidStatus: async (quidId: number, status: QuidStatus) => {
		set({
			loading: { isLoading: true, message: "Updating QUID status..." },
		});
		try {
			const { data, error } = await admin.quids.updateQuidStatus(
				quidId.toString(),
				{
					status,
				}
			);

			if (error) {
				throw new Error(error);
			}

			if (data) {
				// Refresh the list
				get().fetchQuids();
				set({ loading: { isLoading: false } });
				return true;
			}
			return false;
		} catch (error: any) {
			set({
				loading: { isLoading: false },
				error: {
					hasError: true,
					message: error.message || "Failed to update status",
				},
			});
			return false;
		}
	},

	bulkUpdateQuidStatus: async (status: QuidStatus) => {
		set({
			loading: { isLoading: true, message: "Performing bulk update..." },
		});
		const ids = get().selectedQuids;
		if (ids.length === 0) {
			set({
				loading: { isLoading: false },
				error: { hasError: true, message: "No QUIDs selected" },
			});
			return null;
		}
		try {
			// Note: You might need to implement bulk operations in your backend
			// For now, update individually
			for (const id of ids) {
				await admin.quids.updateQuidStatus(id.toString(), { status });
			}

			set({ selectedQuids: [], loading: { isLoading: false } });
			get().fetchQuids();

			return {
				success: true,
				message: "Update successful",
				affectedCount: ids.length,
			};
		} catch (error: any) {
			set({
				loading: { isLoading: false },
				error: {
					hasError: true,
					message: error.message || "Bulk update failed",
				},
			});
			return null;
		}
	},

	exportQuids: async (format: ExportFormat) => {
		set({ loading: { isLoading: true, message: "Exporting QUIDs..." } });
		try {
			// TODO: Implement actual export when backend supports it
			console.log("Exporting QUIDs in format:", format);
			set({ loading: { isLoading: false } });
		} catch (error: any) {
			set({
				loading: { isLoading: false },
				error: {
					hasError: true,
					message: error.message || "Export failed",
				},
			});
		}
	},

	fetchQuidMetrics: async (period: PERIOD) => {
		set({
			loading: { isLoading: true, message: "Updating QUID status..." },
		});
		try {
			const { data, error } = await admin.dashboard.getQuidMetrics(
				period
			);

			if (error) {
				throw new Error(error);
			}

			if (data) {
				set({ loading: { isLoading: false }, quidMetrics: data });
			}
		} catch (error: any) {
			set({
				loading: { isLoading: false },
				error: {
					hasError: true,
					message: error.message || "Failed to update status",
				},
			});
		}
	},

	// Transaction Management
	fetchTransactions: async () => {
		set({
			loading: { isLoading: true, message: "Fetching transactions..." },
			error: { hasError: false },
		});
		try {
			const currentParams = get().transactionListParams;
			const pageable = createPageable({
				page: currentParams.page - 1,
				size: currentParams.limit,
			});

			const { data, error } = await admin.transactions.getTransactions(
				pageable
			);

			if (error) {
				throw new Error(error);
			}

			if (data) {
				const transactions: PaginatedResponse<AdminTransaction> = {
					data:
						data.content?.map((txn: any) => ({
							id: txn.id,
							email: txn.email,
							amount: txn.amount,
							currency: txn.currency,
							quid: txn.quid,
							reference: txn.reference,
							transactionId: txn.transactionId,
							status: txn.status,
							blocked: txn.blocked,
							createdAt: txn.createdAt,
							updatedAt: txn.updatedAt,
							quidAmount: txn.quidAmount,
							quidCurrency: txn.quidCurrency,
						})) || [],
					total: data.totalElements || 0,
					page: currentParams.page,
					limit: currentParams.limit,
					totalPages: data.totalPages || 1,
				};

				set({
					transactions,
					loading: { isLoading: false },
				});
			}
		} catch (error: any) {
			set({
				loading: { isLoading: false },
				error: {
					hasError: true,
					message: error.message || "Failed to fetch transactions",
				},
			});
		}
	},

	setTransactionListParams: (params: Partial<AdminTransactionListParams>) => {
		set((state) => ({
			transactionListParams: {
				...state.transactionListParams,
				...params,
				page: params.page || 1,
			},
		}));
	},

	selectTransaction: (transactionId: number, selected: boolean) => {
		set((state) => ({
			selectedTransactions: selected
				? [...state.selectedTransactions, transactionId]
				: state.selectedTransactions.filter(
						(id) => id !== transactionId
				  ),
		}));
	},

	selectAllTransactions: (select: boolean) => {
		set((state) => ({
			selectedTransactions: select
				? state.transactions?.data.map((t) => t.id) || []
				: [],
		}));
	},

	clearTransactionSelection: () => set({ selectedTransactions: [] }),

	fetchTransactionDetails: async (transactionId: number) => {
		set({
			loading: {
				isLoading: true,
				message: "Fetching transaction details...",
			},
		});
		try {
			const { data, error } = await admin.transactions.getTransaction(
				transactionId.toString()
			);

			if (error) {
				throw new Error(error);
			}

			set({ loading: { isLoading: false } });

			if (data) {
				return <AdminTransaction>{
					id: data.id,
					email: data.email,
					amount: data.amount,
					currency: data.currency,
					quid: data.quid,
					reference: data.reference,
					transactionId: data.transactionId,
					status: data.status,
					blocked: data.blocked,
					createdAt: data.createdAt,
					updatedAt: data.updatedAt,
					quidAmount: data.amount, // Assuming same as transaction amount
					quidCurrency: data.currency, // Assuming same as transaction currency
				};
			}
			return null;
		} catch (error: any) {
			set({
				loading: { isLoading: false },
				error: {
					hasError: true,
					message: error.message || "Failed to fetch details",
				},
			});
			return null;
		}
	},

	updateTransactionStatus: async (
		transactionId: number,
		status: TransactionStatus
	) => {
		set({
			loading: {
				isLoading: true,
				message: "Updating transaction status...",
			},
		});
		try {
			// Note: You might need to implement transaction status updates in your backend
			// For now, this is a placeholder
			console.log(
				`Updating transaction ${transactionId} to status ${status}`
			);
			set({ loading: { isLoading: false } });
			return true;
		} catch (error: any) {
			set({
				loading: { isLoading: false },
				error: {
					hasError: true,
					message: error.message || "Failed to update status",
				},
			});
			return false;
		}
	},

	exportTransactions: async (format: ExportFormat) => {
		set({
			loading: { isLoading: true, message: "Exporting transactions..." },
		});
		try {
			// TODO: Implement actual export when backend supports it
			console.log("Exporting transactions in format:", format);
			set({ loading: { isLoading: false } });
		} catch (error: any) {
			set({
				loading: { isLoading: false },
				error: {
					hasError: true,
					message: error.message || "Export failed",
				},
			});
		}
	},

	fetchTransactionMetrics: async (period: PERIOD = "MONTHLY") => {
		set({
			loading: { isLoading: true, message: "Updating QUID status..." },
		});
		try {
			const { data, error } = await admin.dashboard.getTransactionMetrics(
				period
			);

			if (error) {
				throw new Error(error);
			}

			if (data) {
				set({
					loading: { isLoading: false },
					transactionMetrics: data,
				});
			}
		} catch (error: any) {
			set({
				loading: { isLoading: false },
				error: {
					hasError: true,
					message:
						error.message || "Failed to fetch transaction metrics",
				},
			});
		}
	},

	clearError: () => set({ error: { hasError: false } }),
}));
