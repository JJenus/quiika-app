import React, { useEffect } from "react";
import {
	Users,
	DollarSign,
	TrendingUp,
	Activity,
	Clock,
	CircleCheck as CheckCircle,
	TriangleAlert as AlertTriangle,
} from "lucide-react";
import { useAdminStore } from "../../stores/useAdminStore";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { ErrorMessage } from "../../components/ui/ErrorMessage";
import { Card } from "../../components/ui/Card";
import { StatsCards } from "../../components/admin/shared/StatsCards";
import { formatCurrency } from "@/utils/numberFormatter";

export const DashboardPage: React.FC = () => {
	const { stats, fetchDashboardStats, loading, error, clearError } =
		useAdminStore();

	useEffect(() => {
		fetchDashboardStats();
	}, [fetchDashboardStats]);

	if (loading.isLoading) {
		return (
			<div className="flex items-center justify-center h-64">
				<LoadingSpinner size="lg" text={loading.message} />
			</div>
		);
	}

	// Safe value formatting with fallbacks
	const safeToLocaleString = (
		value: number | undefined | null,
		fallback: string = "0"
	): string => {
		if (value == null || isNaN(value)) return fallback;
		return value.toLocaleString();
	};

	const safeFormatGrowth = (
		growth: number | undefined | null,
		fallback: number = 0
	): number => {
		if (growth == null || isNaN(growth)) return fallback;
		return growth;
	};

	const mainStatsCards = [
		{
			title: "Total Users",
			value: safeToLocaleString(stats.totalUsers?.value),
			icon: <Users className="h-4 w-4" />,
			gradient: "blue",
			description: "Registered users",
			growth: safeFormatGrowth(stats.totalUsers?.growth),
		},
		{
			title: "Total Revenue",
			value: formatCurrency(stats.totalQuidValue?.value || 0),
			icon: <DollarSign className="h-4 w-4" />,
			gradient: "green",
			description: "Total revenue",
			growth: safeFormatGrowth(stats.totalQuidValue?.growth),
		},
		{
			title: "Active QUIDs",
			value: safeToLocaleString(stats.totalQuids?.value),
			icon: <Activity className="h-4 w-4" />,
			gradient: "purple",
			description: "Active QUIDs",
			growth: safeFormatGrowth(stats.totalQuids?.growth),
		},
		{
			title: "Successful Transactions",
			value: formatCurrency(
				stats.totalSuccessfulTransactionValue?.value || 0
			),
			icon: <TrendingUp className="h-4 w-4" />,
			gradient: "orange",
			description: "User conversion",
			growth: safeFormatGrowth(
				stats.totalSuccessfulTransactionValue?.growth
			),
		},
	];

	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold text-text-primary dark:text-text-primary-dark">
						Dashboard Overview
					</h1>
					<p className="text-text-secondary dark:text-text-secondary-dark mt-1">
						Welcome back! Here's what's happening with Quiika.
					</p>
				</div>

				<div className="flex items-center gap-2 text-sm text-text-secondary dark:text-text-secondary-dark">
					<Clock className="h-4 w-4" />
					Last updated: {new Date().toLocaleTimeString()}
				</div>
			</div>

			{error.hasError && (
				<ErrorMessage
					message={error.message || "Failed to load dashboard data"}
					onRetry={fetchDashboardStats}
					onDismiss={clearError}
				/>
			)}

			{/* Key Metrics */}
			<StatsCards cards={mainStatsCards} columns={4} />

			{/* Secondary Metrics */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 dark:text-white">
				<Card className="p-6">
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark">
							Transactions
						</h3>
						<CheckCircle className="h-5 w-5 text-success" />
					</div>
					<div className="space-y-2 dark:text-white">
						<div className="flex justify-between">
							<span className="text-text-secondary dark:text-text-secondary-dark">
								Total
							</span>
							<span className="font-semibold">
								{safeToLocaleString(
									stats.totalTransactions?.value
								)}
							</span>
						</div>
						<div className="flex justify-between">
							<span className="text-text-secondary dark:text-text-secondary-dark">
								This Month
							</span>
							<span className="font-semibold text-success">
								{safeFormatGrowth(
									stats.totalTransactions?.growth
								)}
							</span>
						</div>
					</div>
				</Card>

				<Card className="p-6">
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark">
							Withdrawals
						</h3>
						<AlertTriangle className="h-5 w-5 text-warning" />
					</div>
					<div className="space-y-2">
						<div className="flex justify-between">
							<span className="text-text-secondary dark:text-text-secondary-dark">
								Completed
							</span>
							<span className="font-semibold">
								{formatCurrency(
									stats.totalApprovedWithdrawalValue?.value ||
										0
								)}
							</span>
						</div>
						<div className="flex justify-between">
							<span className="text-text-secondary dark:text-text-secondary-dark">
								Growth
							</span>
							<span className="font-semibold text-warning">
								{safeFormatGrowth(
									stats.totalApprovedWithdrawalValue?.growth
								)}
							</span>
						</div>
					</div>
				</Card>

				<Card className="p-6">
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark">
							System Health
						</h3>
						<div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
					</div>
					<div className="space-y-2">
						<div className="flex justify-between">
							<span className="text-text-secondary dark:text-text-secondary-dark">
								Uptime
							</span>
							<span className="font-semibold text-success">
								99.9%
							</span>
						</div>
						<div className="flex justify-between">
							<span className="text-text-secondary dark:text-text-secondary-dark">
								Response Time
							</span>
							<span className="font-semibold">120ms</span>
						</div>
					</div>
				</Card>
			</div>

			{/* Quick Actions */}
			<Card className="p-6">
				<h3 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-4">
					Quick Actions
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<button className="btn-outline p-4 text-left hover:bg-primary/5 transition-colors">
						<div className="font-medium">
							Review Pending Withdrawals
						</div>
						<div className="text-sm text-text-secondary dark:text-text-secondary-dark mt-1">
							{stats.withdrawalRequestsByStatus?.["pending"] || 0}{" "}
							requests waiting
						</div>
					</button>
					<button className="btn-outline p-4 text-left hover:bg-primary/5 transition-colors">
						<div className="font-medium">Invite New Admin</div>
						<div className="text-sm text-text-secondary dark:text-text-secondary-dark mt-1">
							Add team members
						</div>
					</button>
					<button className="btn-outline p-4 text-left hover:bg-primary/5 transition-colors">
						<div className="font-medium">Generate Report</div>
						<div className="text-sm text-text-secondary dark:text-text-secondary-dark mt-1">
							Export financial data
						</div>
					</button>
				</div>
			</Card>
		</div>
	);
};
