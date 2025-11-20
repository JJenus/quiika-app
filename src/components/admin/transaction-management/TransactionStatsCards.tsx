import React from "react";
import { DollarSign, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { StatCardProps, StatsCards } from "../shared/StatsCards";
import { formatCurrency } from "@/utils/numberFormatter";
import { useAdminStore } from "@/stores/useAdminStore";

export const TransactionStatsCards: React.FC = () => {
	const { transactionMetrics: stats, loading } = useAdminStore();

	const getStatValue = (stat: string) => {
		if(!stats.transactionsByStatus || stats.transactionsByStatus.length === 0){
			return 0;
		}

		return stats.transactionsByStatus[stat] || 0
	}

	const statCards: StatCardProps[] = [
		{
			title: "Total Volume",
			value: stats.totalTransactions?.value || 0,
			icon: <DollarSign className="h-4 w-4" />,
			gradient: "blue",
			description: "All transactions",
			growth: stats.totalTransactions?.growth,
		},
		{
			title: "Successful",
			value: formatCurrency(
				stats.totalSuccessfulTransactionValue?.value || 0,
				"NGN",
				true
			),
			icon: <CheckCircle className="h-4 w-4" />,
			gradient: "green",
			description: "Completed transactions",
			growth: stats.totalSuccessfulTransactionValue?.growth,
		},
		{
			title: "Failed",
			value: getStatValue("FAILED") || 0,
			icon: <AlertCircle className="h-4 w-4" />,
			gradient: "red",
			description: "Failed transactions",
			growth: 0,
		},
		{
			title: "Pending",
			value: getStatValue("PROCESSING") || 0,
			icon: <Clock className="h-4 w-4" />,
			gradient: "yellow",
			description: "Awaiting processing",
			growth: 0,
		},
	];

	return <StatsCards cards={statCards} columns={4} loading={loading.isLoading} />;
};
