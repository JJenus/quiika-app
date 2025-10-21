import React, { useState } from 'react';
import { useAdminStore } from '../../../stores/useAdminStore';
import { Button } from '../../ui/Button';
import { QuidStatus, Currency } from '../../../types/api';
import { Filter, X } from 'lucide-react';

export const QuidFilterPanel: React.FC = () => {
	const { quidListParams, setQuidListParams } = useAdminStore();
	const [filters, setFilters] = useState(quidListParams.filters || {});

	const handleFilterChange = <K extends keyof typeof filters>(key: K, value: (typeof filters)[K]) => {
		setFilters(prev => ({ ...prev, [key]: value }));
	};

	const applyFilters = () => {
		setQuidListParams({ filters, page: 1 });
	};

	const clearFilters = () => {
		const { search } = quidListParams.filters || {};
		setFilters({ search });
		setQuidListParams({ filters: { search } });
	};

	const quidStatuses: QuidStatus[] = ['ACTIVE', 'CLAIMED', 'BLOCKED', 'EXPIRED', 'SPLIT', 'CONFLICTED'];
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
					Clear Filters
				</Button>
			</div>
			
			{/* Status Filter */}
			<div>
				<label className="block text-sm font-medium mb-1">Status</label>
				<div className="flex flex-wrap gap-2">
					{quidStatuses.map(status => (
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
						>
							{status}
						</Button>
					))}
				</div>
			</div>

			{/* Currency Filter */}
			<div>
				<label className="block text-sm font-medium mb-1">Currency</label>
				<div className="flex flex-wrap gap-2">
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
