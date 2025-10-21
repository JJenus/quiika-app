import React, { useState, useEffect } from 'react';
import { useAdminStore } from '../../../stores/useAdminStore';
import { useDebounce } from '../../../hooks/useDebounce';
import { Input } from '../../ui/Input';
import { Search } from 'lucide-react';

export const QuidSearchBar: React.FC = () => {
	const { quidListParams, setQuidListParams } = useAdminStore();
	const [searchTerm, setSearchTerm] = useState(quidListParams.filters?.search || '');
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	useEffect(() => {
		setQuidListParams({
			filters: {
				...quidListParams.filters,
				search: debouncedSearchTerm,
			},
			page: 1, // Reset to first page on search
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedSearchTerm]);

	return (
		<div className="relative">
			<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
			<Input
				type="text"
				placeholder="Search by QUID, email..."
				className="pl-10 w-full"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
		</div>
	);
};
