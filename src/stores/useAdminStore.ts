import { create } from 'zustand';
import type { Transaction, Quid, WithdrawalRequest } from '../types/api';

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

  clearError: () => set({ error: { hasError: false } }),
}));