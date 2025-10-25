import React from 'react';
import { useAdminStore } from '../../../stores/useAdminStore';
import { SearchBar } from '../../ui/SearchBar';

interface TransactionSearchBarProps {
  onSearchChange?: () => void;
}

export const TransactionSearchBar: React.FC<TransactionSearchBarProps> = ({ onSearchChange }) => {
  const { transactionListParams, setTransactionListParams, fetchTransactions } = useAdminStore();

  const handleSearch = (searchTerm: string) => {
    setTransactionListParams({
      ...transactionListParams,
      filters: {
        ...transactionListParams.filters,
        search: searchTerm,
      },
      page: 1,
    });
    
    if (onSearchChange) {
      onSearchChange();
    } else {
      fetchTransactions();
    }
  };

  return (
    <SearchBar
      onSearch={handleSearch}
      placeholder="Search by QUID, email, transaction ID..."
      initialValue={transactionListParams.filters?.search || ''}
      showFiltersButton={false} // Filters are in the sidebar
    />
  );
};