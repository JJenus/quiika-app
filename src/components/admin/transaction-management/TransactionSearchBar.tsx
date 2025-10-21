import React, { useState, useEffect } from 'react';
import { useAdminStore } from '../../../stores/useAdminStore';
import { useDebounce } from '../../../hooks/useDebounce';
import { Input } from '../../ui/Input';
import { Search } from 'lucide-react';

export const TransactionSearchBar: React.FC = () => {
	const { transactionListParams, setTransactionListParams, fetchTransactions } = useAdminStore();
	const [searchTerm, setSearchTerm] = useState(transactionListParams.filters?.search || '');
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	useEffect(() => {
		if (debouncedSearchTerm !== transactionListParams.filters?.search) {
			setTransactionListParams({
				filters: {
					...transactionListParams.filters,
					search: debouncedSearchTerm,
				},
				page: 1,
			});
			fetchTransactions();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedSearchTerm]);

	return (
		<div className="relative">
			<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
			<Input
				type="text"
				placeholder="Search by QUID, email, reference, transaction ID..."
				className="pl-10 w-full"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
		</div>
	);
};
