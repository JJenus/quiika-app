import { create } from 'zustand';
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
	AdminQuidFilters,
	AdminTransactionFilters,
	ExportParams,
} from '../types/api';

export interface AdminStats {
  totalUsers: number;
  totalTransactions: number;
  totalRevenue: number;
  totalWithdrawals: number;
  activeQuids: number;
  pendingWithdrawals: number;
  monthlyGrowth: number;
  conversionRate: number;
}

export interface FinancialData {
  totalRevenue: number;
  totalFees: number;
  totalWithdrawals: number;
  netProfit: number;
  monthlyRevenue: Array<{ month: string; revenue: number; fees: number }>;
  revenueBySource: Array<{ source: string; amount: number; percentage: number }>;
}

export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'SUPPORT';
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  invitedBy?: string;
}

interface AdminState {
  stats: AdminStats;
  financialData: FinancialData;
  users: AdminUser[];
  recentTransactions: Transaction[];
  pendingWithdrawals: WithdrawalRequest[];

  // QUID Management
  quids: PaginatedResponse<AdminQuid> | null;
  quidListParams: AdminQuidListParams;
  selectedQuids: number[];

  // Transaction Management
  transactions: PaginatedResponse<AdminTransaction> | null;
  transactionListParams: AdminTransactionListParams;
  selectedTransactions: number[];

  loading: { isLoading: boolean; message?: string };
  error: { hasError: boolean; message?: string };
}

interface AdminActions {
  fetchDashboardStats: () => Promise<void>;
  fetchFinancialData: () => Promise<void>;
  fetchUsers: () => Promise<void>;
  inviteUser: (email: string, role: AdminUser['role']) => Promise<boolean>;
  updateUserRole: (userId: string, role: AdminUser['role']) => Promise<boolean>;
  deactivateUser: (userId: string) => Promise<boolean>;
  approveWithdrawal: (withdrawalId: string) => Promise<boolean>;
  rejectWithdrawal: (withdrawalId: string, reason: string) => Promise<boolean>;
  
  // QUID Management
  fetchQuids: () => Promise<void>;
  setQuidListParams: (params: Partial<AdminQuidListParams>) => void;
  selectQuid: (quidId: number, selected: boolean) => void;
  selectAllQuids: (select: boolean) => void;
  clearQuidSelection: () => void;
  updateQuidStatus: (quidId: number, status: QuidStatus) => Promise<boolean>;
  bulkUpdateQuidStatus: (status: QuidStatus) => Promise<BulkActionResponse | null>;
  exportQuids: (format: ExportFormat) => Promise<void>;

  // Transaction Management
  fetchTransactions: () => Promise<void>;
  setTransactionListParams: (params: Partial<AdminTransactionListParams>) => void;
  selectTransaction: (transactionId: number, selected: boolean) => void;
  selectAllTransactions: (select: boolean) => void;
  clearTransactionSelection: () => void;
  fetchTransactionDetails: (transactionId: number) => Promise<AdminTransaction | null>;
  updateTransactionStatus: (
		transactionId: number,
		status: TransactionStatus
	) => Promise<boolean>;
  exportTransactions: (format: ExportFormat) => Promise<void>;

  clearError: () => void;
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

  // Transaction Management state
  transactions: null,
  transactionListParams: { page: 1, limit: 10 },
  selectedTransactions: [],

  loading: { isLoading: false },
  error: { hasError: false },

  fetchDashboardStats: async () => {
    set({ 
      loading: { isLoading: true, message: 'Loading dashboard stats...' },
      error: { hasError: false }
    });

    try {
      // Mock data - replace with actual API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockStats: AdminStats = {
        totalUsers: 1247,
        totalTransactions: 3456,
        totalRevenue: 125000000, // in kobo
        totalWithdrawals: 98000000,
        activeQuids: 234,
        pendingWithdrawals: 12,
        monthlyGrowth: 15.3,
        conversionRate: 78.5,
      };

      set({
        stats: mockStats,
        loading: { isLoading: false }
      });
    } catch (error: any) {
      set({
        loading: { isLoading: false },
        error: {
          hasError: true,
          message: error.message || 'Failed to load dashboard stats'
        }
      });
    }
  },

  fetchFinancialData: async () => {
    set({ 
      loading: { isLoading: true, message: 'Loading financial data...' },
      error: { hasError: false }
    });

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockFinancialData: FinancialData = {
        totalRevenue: 125000000,
        totalFees: 3750000, // 3% of revenue
        totalWithdrawals: 98000000,
        netProfit: 27000000, // revenue - withdrawals - operational costs
        monthlyRevenue: [
          { month: 'Jan', revenue: 8500000, fees: 255000 },
          { month: 'Feb', revenue: 9200000, fees: 276000 },
          { month: 'Mar', revenue: 10100000, fees: 303000 },
          { month: 'Apr', revenue: 11800000, fees: 354000 },
          { month: 'May', revenue: 13200000, fees: 396000 },
          { month: 'Jun', revenue: 15400000, fees: 462000 },
        ],
        revenueBySource: [
          { source: 'Transaction Fees', amount: 2500000, percentage: 66.7 },
          { source: 'Withdrawal Fees', amount: 950000, percentage: 25.3 },
          { source: 'Currency Exchange', amount: 300000, percentage: 8.0 },
        ],
      };

      set({
        financialData: mockFinancialData,
        loading: { isLoading: false }
      });
    } catch (error: any) {
      set({
        loading: { isLoading: false },
        error: {
          hasError: true,
          message: error.message || 'Failed to load financial data'
        }
      });
    }
  },

  fetchUsers: async () => {
    set({ 
      loading: { isLoading: true, message: 'Loading users...' },
      error: { hasError: false }
    });

    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const mockUsers: AdminUser[] = [
        {
          id: '1',
          email: 'admin@quiika.com',
          firstName: 'Admin',
          lastName: 'User',
          role: 'SUPER_ADMIN',
          isActive: true,
          lastLogin: new Date().toISOString(),
          createdAt: '2024-01-01T00:00:00Z'
        },
        {
          id: '2',
          email: 'manager@quiika.com',
          firstName: 'Manager',
          lastName: 'Smith',
          role: 'ADMIN',
          isActive: true,
          lastLogin: new Date(Date.now() - 86400000).toISOString(),
          createdAt: '2024-02-15T00:00:00Z',
          invitedBy: '1'
        },
        {
          id: '3',
          email: 'support@quiika.com',
          firstName: 'Support',
          lastName: 'Agent',
          role: 'SUPPORT',
          isActive: true,
          lastLogin: new Date(Date.now() - 3600000).toISOString(),
          createdAt: '2024-03-01T00:00:00Z',
          invitedBy: '1'
        }
      ];

      set({
        users: mockUsers,
        loading: { isLoading: false }
      });
    } catch (error: any) {
      set({
        loading: { isLoading: false },
        error: {
          hasError: true,
          message: error.message || 'Failed to load users'
        }
      });
    }
  },

  inviteUser: async (email: string, role: AdminUser['role']) => {
    set({ 
      loading: { isLoading: true, message: 'Sending invitation...' },
      error: { hasError: false }
    });

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful invitation
      const newUser: AdminUser = {
        id: Date.now().toString(),
        email,
        firstName: 'New',
        lastName: 'User',
        role,
        isActive: false, // Pending activation
        createdAt: new Date().toISOString(),
        invitedBy: '1'
      };

      set(state => ({
        users: [...state.users, newUser],
        loading: { isLoading: false }
      }));

      return true;
    } catch (error: any) {
      set({
        loading: { isLoading: false },
        error: {
          hasError: true,
          message: error.message || 'Failed to send invitation'
        }
      });
      return false;
    }
  },

  updateUserRole: async (userId: string, role: AdminUser['role']) => {
    set({ 
      loading: { isLoading: true, message: 'Updating user role...' },
      error: { hasError: false }
    });

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set(state => ({
        users: state.users.map(user => 
          user.id === userId ? { ...user, role } : user
        ),
        loading: { isLoading: false }
      }));

      return true;
    } catch (error: any) {
      set({
        loading: { isLoading: false },
        error: {
          hasError: true,
          message: error.message || 'Failed to update user role'
        }
      });
      return false;
    }
  },

  deactivateUser: async (userId: string) => {
    set({ 
      loading: { isLoading: true, message: 'Deactivating user...' },
      error: { hasError: false }
    });

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set(state => ({
        users: state.users.map(user => 
          user.id === userId ? { ...user, isActive: false } : user
        ),
        loading: { isLoading: false }
      }));

      return true;
    } catch (error: any) {
      set({
        loading: { isLoading: false },
        error: {
          hasError: true,
          message: error.message || 'Failed to deactivate user'
        }
      });
      return false;
    }
  },

  approveWithdrawal: async (withdrawalId: string) => {
    set({ 
      loading: { isLoading: true, message: 'Approving withdrawal...' },
      error: { hasError: false }
    });

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => ({
        pendingWithdrawals: state.pendingWithdrawals.filter(w => w.id.toString() !== withdrawalId),
        loading: { isLoading: false }
      }));

      return true;
    } catch (error: any) {
      set({
        loading: { isLoading: false },
        error: {
          hasError: true,
          message: error.message || 'Failed to approve withdrawal'
        }
      });
      return false;
    }
  },

  rejectWithdrawal: async (withdrawalId: string, reason: string) => {
    set({ 
      loading: { isLoading: true, message: 'Rejecting withdrawal...' },
      error: { hasError: false }
    });

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => ({
        pendingWithdrawals: state.pendingWithdrawals.filter(w => w.id.toString() !== withdrawalId),
        loading: { isLoading: false }
      }));

      return true;
    } catch (error: any) {
      set({
        loading: { isLoading: false },
        error: {
          hasError: true,
          message: error.message || 'Failed to reject withdrawal'
        }
      });
      return false;
    }
  },

  // QUID Management
  fetchQuids: async () => {
    set({ loading: { isLoading: true, message: 'Fetching QUIDs...' }, error: { hasError: false } });
    try {
      // const data = await api.getAdminQuids(get().quidListParams);
      // set({ quids: data, loading: { isLoading: false } });
      console.log('Fetching QUIDs with params:', get().quidListParams);
      // Mock data for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ quids: { data: [], total: 0, page: 1, limit: 10, totalPages: 1 }, loading: { isLoading: false } });
    } catch (error: any) {
      set({ loading: { isLoading: false }, error: { hasError: true, message: 'Failed to fetch QUIDs' } });
    }
  },

  setQuidListParams: (params: Partial<AdminQuidListParams>) => {
    set(state => ({ quidListParams: { ...state.quidListParams, ...params, page: params.page || 1 } }));
    get().fetchQuids();
  },

  selectQuid: (quidId: number, selected: boolean) => {
    set(state => ({
      selectedQuids: selected
        ? [...state.selectedQuids, quidId]
        : state.selectedQuids.filter(id => id !== quidId),
    }));
  },

  selectAllQuids: (select: boolean) => {
    set(state => ({
      selectedQuids: select ? state.quids?.data.map(q => q.id) || [] : [],
    }));
  },

  clearQuidSelection: () => set({ selectedQuids: [] }),

  updateQuidStatus: async (quidId: number, status: QuidStatus) => {
    set({ loading: { isLoading: true, message: 'Updating QUID status...' }});
    try {
      // const result = await api.updateQuidStatus(quidId, status);
      // if (result) get().fetchQuids();
      console.log(`Updating QUID ${quidId} to status ${status}`);
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ loading: { isLoading: false } });
      return true;
    } catch (error) {
      set({ loading: { isLoading: false }, error: { hasError: true, message: 'Failed to update status' } });
      return false;
    }
  },

  bulkUpdateQuidStatus: async (status: QuidStatus) => {
    set({ loading: { isLoading: true, message: 'Performing bulk update...' }});
    const ids = get().selectedQuids;
    if (ids.length === 0) {
      set({ loading: { isLoading: false }, error: { hasError: true, message: 'No QUIDs selected' } });
      return null;
    }
    try {
      // const result = await api.bulkUpdateQuidStatus({ ids, status });
      console.log(`Bulk updating ${ids.length} QUIDs to status ${status}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ selectedQuids: [], loading: { isLoading: false } });
      get().fetchQuids();
      return { success: true, message: 'Update successful', affectedCount: ids.length };
    } catch (error: any) {
      set({ loading: { isLoading: false }, error: { hasError: true, message: 'Bulk update failed' } });
      return null;
    }
  },

  exportQuids: async (format: ExportFormat) => {
    set({ loading: { isLoading: true, message: 'Exporting QUIDs...' }});
    const { filters, sort } = get().quidListParams;
    const params: ExportParams<AdminQuidFilters> = { format, filters, sort };
    try {
      // await api.exportQuids(params);
      console.log('Exporting QUIDs with params:', params);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate export time
      set({ loading: { isLoading: false } });
    } catch (error: any) {
      set({ loading: { isLoading: false }, error: { hasError: true, message: 'Export failed' } });
    }
  },

  // Transaction Management
  fetchTransactions: async () => {
    set({ loading: { isLoading: true, message: 'Fetching transactions...' }, error: { hasError: false } });
    try {
      // const data = await api.getAdminTransactions(get().transactionListParams);
      // set({ transactions: data, loading: { isLoading: false } });
      console.log('Fetching transactions with params:', get().transactionListParams);
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ transactions: { data: [], total: 0, page: 1, limit: 10, totalPages: 1 }, loading: { isLoading: false } });
    } catch (error: any) {
      set({ loading: { isLoading: false }, error: { hasError: true, message: 'Failed to fetch transactions' } });
    }
  },

  setTransactionListParams: (params: Partial<AdminTransactionListParams>) => {
    set(state => ({ transactionListParams: { ...state.transactionListParams, ...params, page: params.page || 1 } }));
    get().fetchTransactions();
  },

  selectTransaction: (transactionId: number, selected: boolean) => {
    set(state => ({
      selectedTransactions: selected
        ? [...state.selectedTransactions, transactionId]
        : state.selectedTransactions.filter(id => id !== transactionId),
    }));
  },

  selectAllTransactions: (select: boolean) => {
    set(state => ({
      selectedTransactions: select ? state.transactions?.data.map(t => t.id) || [] : [],
    }));
  },

  clearTransactionSelection: () => set({ selectedTransactions: [] }),

  fetchTransactionDetails: async (transactionId: number) => {
    set({ loading: { isLoading: true, message: 'Fetching transaction details...' }});
    try {
      // const details = await api.getAdminTransactionDetails(transactionId);
      console.log(`Fetching details for transaction ${transactionId}`);
      await new Promise(resolve => setTimeout(resolve, 700));
      set({ loading: { isLoading: false } });
      return null; // Replace with 'details'
    } catch (error) {
      set({ loading: { isLoading: false }, error: { hasError: true, message: 'Failed to fetch details' } });
      return null;
    }
  },

  updateTransactionStatus: async (transactionId: number, status: TransactionStatus) => {
    set({ loading: { isLoading: true, message: 'Updating transaction status...' }});
    try {
      // const result = await api.updateTransactionStatus(transactionId, status);
      // if (result) get().fetchTransactions();
      console.log(`Updating transaction ${transactionId} to status ${status}`);
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ loading: { isLoading: false } });
      return true;
    } catch (error) {
      set({ loading: { isLoading: false }, error: { hasError: true, message: 'Failed to update status' } });
      return false;
    }
  },

  exportTransactions: async (format: ExportFormat) => {
    set({ loading: { isLoading: true, message: 'Exporting transactions...' }});
    const { filters, sort } = get().transactionListParams;
    const params: ExportParams<AdminTransactionFilters> = { format, filters, sort };
    try {
      // await api.exportTransactions(params);
      console.log('Exporting transactions with params:', params);
      await new Promise(resolve => setTimeout(resolve, 2000));
      set({ loading: { isLoading: false } });
    } catch (error: any) {
      set({ loading: { isLoading: false }, error: { hasError: true, message: 'Export failed' } });
    }
  },

  clearError: () => set({ error: { hasError: false } }),
}));
