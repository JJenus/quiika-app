import React from 'react';
import { Card } from '../../ui/Card';
import { DollarSign, Hash, ShieldOff, CheckCircle } from 'lucide-react';

export const QuidStatsCards: React.FC = () => {
	// In a real app, you'd get these stats from the store
	const stats = {
		totalValue: 1250000,
		totalQuids: 580,
		activeQuids: 450,
		blockedQuids: 15,
	};

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'NGN', // Assuming NGN, should be dynamic
			minimumFractionDigits: 2,
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
						<p className="text-sm text-text-secondary dark:text-text-secondary-dark">Total Value</p>
						<p className="text-2xl font-bold text-text-primary dark:text-text-primary-dark">
							{formatCurrency(stats.totalValue)}
						</p>
					</div>
				</div>
			</Card>
			<Card>
				<div className="flex items-center">
					<div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full mr-4">
						<Hash className="h-6 w-6 text-green-500" />
					</div>
					<div>
						<p className="text-sm text-text-secondary dark:text-text-secondary-dark">Total QUIDs</p>
						<p className="text-2xl font-bold text-text-primary dark:text-text-primary-dark">
							{stats.totalQuids}
						</p>
					</div>
				</div>
			</Card>
			<Card>
				<div className="flex items-center">
					<div className="bg-teal-100 dark:bg-teal-900/50 p-3 rounded-full mr-4">
						<CheckCircle className="h-6 w-6 text-teal-500" />
					</div>
					<div>
						<p className="text-sm text-text-secondary dark:text-text-secondary-dark">Active QUIDs</p>
						<p className="text-2xl font-bold text-text-primary dark:text-text-primary-dark">
							{stats.activeQuids}
						</p>
					</div>
				</div>
			</Card>
			<Card>
				<div className="flex items-center">
					<div className="bg-red-100 dark:bg-red-900/50 p-3 rounded-full mr-4">
						<ShieldOff className="h-6 w-6 text-red-500" />
					</div>
					<div>
						<p className="text-sm text-text-secondary dark:text-text-secondary-dark">Blocked QUIDs</p>
						<p className="text-2xl font-bold text-text-primary dark:text-text-primary-dark">
							{stats.blockedQuids}
						</p>
					</div>
				</div>
			</Card>
		</div>
	);
};
