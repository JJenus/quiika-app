// types/admin.ts

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
	revenueBySource: Array<{
		source: string;
		amount: number;
		percentage: number;
	}>;
}

export interface AdminUser {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	role: "SUPER_ADMIN" | "ADMIN" | "SUPPORT";
	isActive: boolean;
	lastLogin?: string;
	createdAt: string;
	invitedBy?: string;
}