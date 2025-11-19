import React, { useEffect, useCallback } from "react";
import { useAdminStore } from "../../stores/useAdminStore";
import { TransactionStatsCards } from "../../components/admin/transaction-management/TransactionStatsCards";
import { TransactionFilterSidebar } from "../../components/admin/transaction-management/TransactionFilterSidebar";
import { TransactionDataTable } from "../../components/admin/transaction-management/TransactionDataTable";
import { TransactionSearchBar } from "../../components/admin/transaction-management/TransactionSearchBar";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";

export const TransactionManagementPage: React.FC = () => {
	const {
		fetchTransactions,
		transactions,
		loading,
		selectedTransactions,
		fetchTransactionMetrics,
	} = useAdminStore();

	const handleRefresh = useCallback(() => {
		fetchTransactions();
		fetchTransactionMetrics();
	}, [fetchTransactions]);

	useEffect(() => {
		handleRefresh();
	}, [handleRefresh]);

	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold text-text-primary dark:text-text-primary-dark">
						Transaction Management
					</h1>
					<p className="text-text-secondary dark:text-text-secondary-dark mt-1">
						View, filter, and manage all system transactions.
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Button onClick={handleRefresh} variant="outline">
						Refresh
					</Button>
					<Button>Export Transactions</Button>
				</div>
			</div>

			<TransactionStatsCards />

			<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
				<div className="lg:col-span-1">
					<Card padding={false}>
						<TransactionFilterSidebar />
					</Card>
				</div>
				<div className="lg:col-span-3 space-y-4">
					<Card>
						<TransactionSearchBar />
					</Card>
					<Card>
						{selectedTransactions.length > 0 && (
							<div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-blue-900/10">
								<p>
									{selectedTransactions.length} transaction(s)
									selected.
								</p>
							</div>
						)}

						{loading.isLoading && !transactions?.data ? (
							<div className="flex justify-center items-center h-96">
								<LoadingSpinner text="Fetching transactions..." />
							</div>
						) : (
							<TransactionDataTable />
						)}
					</Card>
				</div>
			</div>
		</div>
	);
};
