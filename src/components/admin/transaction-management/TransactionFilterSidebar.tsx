import React, { useState } from 'react';
import { useAdminStore } from '../../../stores/useAdminStore';
import { Button } from '../../ui/Button';
import { TransactionStatus, Currency } from '../../../types/api';
import { Filter, X } from 'lucide-react';

export const TransactionFilterSidebar: React.FC = () => {
	const { transactionListParams, setTransactionListParams, fetchTransactions } = useAdminStore();
	const [filters, setFilters] = useState(transactionListParams.filters || {});

	const handleFilterChange = <K extends keyof typeof filters>(key: K, value: (typeof filters)[K]) => {
		setFilters(prev => ({ ...prev, [key]: value }));
	};

	const applyFilters = () => {
		setTransactionListParams({ filters, page: 1 });
		fetchTransactions();
	};

	const clearFilters = () => {
		const { search } = transactionListParams.filters || {};
		const clearedFilters = { search };
		setFilters(clearedFilters);
		setTransactionListParams({ filters: clearedFilters, page: 1 });
		fetchTransactions();
	};

	const transactionStatuses: TransactionStatus[] = ['PENDING', 'PROCESSING', 'SUCCESS', 'COMPLETED', 'FAILED', 'UNKNOWN_STATUS'];
	const currencies: Currency[] = ['NGN', 'GHS', 'KES', 'ZAR'];

	return (
		<div className="space-y-4 p-4">
			<div className="flex justify-between items-center">
				<h3 className="text-lg font-semibold flex items-center gap-2">
					<Filter className="h-5 w-5" />
					Filters
				</h3>
				<Button variant="ghost" size="sm" onClick={clearFilters} className="text-sm">
					<X className="h-4 w-4 mr-1" />
					Clear
				</Button>
			</div>
			
			{/* Status Filter */}
			<div>
				<label className="block text-sm font-medium mb-2">Status</label>
				<div className="flex flex-wrap gap-2">
					{transactionStatuses.map(status => (
						<Button
							key={status}
							variant={filters.status?.includes(status) ? 'primary' : 'outline'}
							size="sm"
							onClick={() => {
								const currentStatus = filters.status || [];
								const newStatus = currentStatus.includes(status)
									? currentStatus.filter(s => s !== status)
									: [...currentStatus, status];
								handleFilterChange('status', newStatus);
							}}
							className="text-xs"
						>
							{status}
						</Button>
					))}
				</div>
			</div>

			{/* Currency Filter */}
			<div>
				<label className="block text-sm font-medium mb-2">Currency</label>
				<div className="grid grid-cols-2 gap-2">
					{currencies.map(currency => (
						<Button
							key={currency}
							variant={filters.currency?.includes(currency) ? 'primary' : 'outline'}
							size="sm"
							onClick={() => {
								const currentCurrency = filters.currency || [];
								const newCurrency = currentCurrency.includes(currency)
									? currentCurrency.filter(c => c !== currency)
									: [...currentCurrency, currency];
								handleFilterChange('currency', newCurrency);
							}}
						>
							{currency}
						</Button>
					))}
				</div>
			</div>
			
			<Button onClick={applyFilters} className="w-full">
				Apply Filters
			</Button>
		</div>
	);
};
