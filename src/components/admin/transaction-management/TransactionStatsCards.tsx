import React from 'react';
import { Card } from '../../ui/Card';
import { DollarSign, CheckCircle, AlertCircle, Clock } from 'lucide-react';

export const TransactionStatsCards: React.FC = () => {
	const stats = {
		totalVolume: 56789000, // in kobo
		successfulTransactions: 1250,
		failedTransactions: 45,
		pendingTransactions: 12,
	};

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'NGN',
		}).format(amount / 100);
	};

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
			<Card>
				<div className="flex items-center">
					<div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full mr-4">
						<DollarSign className="h-6 w-6 text-blue-500" />
					</div>
					<div>
						<p className="text-sm text-text-secondary dark:text-text-secondary-dark">Total Volume</p>
						<p className="text-2xl font-bold text-text-primary dark:text-text-primary-dark">
							{formatCurrency(stats.totalVolume)}
						</p>
					</div>
				</div>
			</Card>
			<Card>
				<div className="flex items-center">
					<div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full mr-4">
						<CheckCircle className="h-6 w-6 text-green-500" />
					</div>
					<div>
						<p className="text-sm text-text-secondary dark:text-text-secondary-dark">Successful</p>
						<p className="text-2xl font-bold text-text-primary dark:text-text-primary-dark">
							{stats.successfulTransactions}
						</p>
					</div>
				</div>
			</Card>
			<Card>
				<div className="flex items-center">
					<div className="bg-red-100 dark:bg-red-900/50 p-3 rounded-full mr-4">
						<AlertCircle className="h-6 w-6 text-red-500" />
					</div>
					<div>
						<p className="text-sm text-text-secondary dark:text-text-secondary-dark">Failed</p>
						<p className="text-2xl font-bold text-text-primary dark:text-text-primary-dark">
							{stats.failedTransactions}
						</p>
					</div>
				</div>
			</Card>
			<Card>
				<div className="flex items-center">
					<div className="bg-yellow-100 dark:bg-yellow-900/50 p-3 rounded-full mr-4">
						<Clock className="h-6 w-6 text-yellow-500" />
					</div>
					<div>
						<p className="text-sm text-text-secondary dark:text-text-secondary-dark">Pending</p>
						<p className="text-2xl font-bold text-text-primary dark:text-text-primary-dark">
							{stats.pendingTransactions}
						</p>
					</div>
				</div>
			</Card>
		</div>
	);
};
