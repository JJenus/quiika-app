import React from 'react';
import { useAdminStore } from '../../../stores/useAdminStore';
import { TransactionStatus, Currency } from '../../../types/api';
import { FilterPanel, FilterConfig } from '../../ui/FilterPanel';

interface TransactionFilterSidebarProps {
  onFiltersChange?: () => void;
}

export const TransactionFilterSidebar: React.FC<TransactionFilterSidebarProps> = ({ onFiltersChange }) => {
  const { transactionListParams, setTransactionListParams, fetchTransactions, transactions } = useAdminStore();

  // Calculate counts from current data
  const statusCounts = React.useMemo(() => {
    return {
      PENDING: transactions?.data.filter(tx => tx.status === 'PENDING').length || 0,
      PROCESSING: transactions?.data.filter(tx => tx.status === 'PROCESSING').length || 0,
      SUCCESS: transactions?.data.filter(tx => tx.status === 'SUCCESS').length || 0,
      COMPLETED: transactions?.data.filter(tx => tx.status === 'COMPLETED').length || 0,
      FAILED: transactions?.data.filter(tx => tx.status === 'FAILED').length || 0,
      UNKNOWN_STATUS: transactions?.data.filter(tx => tx.status === 'UNKNOWN_STATUS').length || 0,
    };
  }, [transactions]);

  const currencyCounts = React.useMemo(() => {
    return {
      NGN: transactions?.data.filter(tx => tx.currency === 'NGN').length || 0,
      GHS: transactions?.data.filter(tx => tx.currency === 'GHS').length || 0,
      KES: transactions?.data.filter(tx => tx.currency === 'KES').length || 0,
      ZAR: transactions?.data.filter(tx => tx.currency === 'ZAR').length || 0,
    };
  }, [transactions]);

  // Define filters with transaction-specific colors and options
  const filters: FilterConfig[] = [
    {
      key: 'dateRange',
      label: 'Date Range',
      type: 'date-range',
    },
    {
      key: 'status',
      label: 'Status',
      type: 'multiselect',
      options: [
        { 
          value: 'PENDING', 
          label: 'Pending', 
          count: statusCounts.PENDING,
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800'
        },
        { 
          value: 'PROCESSING', 
          label: 'Processing', 
          count: statusCounts.PROCESSING,
          color: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800'
        },
        { 
          value: 'SUCCESS', 
          label: 'Success', 
          count: statusCounts.SUCCESS,
          color: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800'
        },
        { 
          value: 'COMPLETED', 
          label: 'Completed', 
          count: statusCounts.COMPLETED,
          color: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800'
        },
        { 
          value: 'FAILED', 
          label: 'Failed', 
          count: statusCounts.FAILED,
          color: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800'
        },
        { 
          value: 'UNKNOWN_STATUS', 
          label: 'Unknown', 
          count: statusCounts.UNKNOWN_STATUS,
          color: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
        },
      ],
    },
    {
      key: 'currency',
      label: 'Currency',
      type: 'multiselect',
      options: [
        { 
          value: 'NGN', 
          label: 'NGN', 
          count: currencyCounts.NGN,
          color: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300'
        },
        { 
          value: 'GHS', 
          label: 'GHS', 
          count: currencyCounts.GHS,
          color: 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300'
        },
        { 
          value: 'KES', 
          label: 'KES', 
          count: currencyCounts.KES,
          color: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300'
        },
        { 
          value: 'ZAR', 
          label: 'ZAR', 
          count: currencyCounts.ZAR,
          color: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300'
        },
      ],
    },
    {
      key: 'amount',
      label: 'Amount Range',
      type: 'number-range',
    },
    {
      key: 'search',
      label: 'Search',
      type: 'search',
      placeholder: 'Search by QUID, email, transaction ID...',
    },
  ];

  const handleFiltersChange = (filters: Record<string, any>) => {
    setTransactionListParams({ 
      ...transactionListParams, 
      filters: { ...transactionListParams.filters, ...filters },
      page: 1 
    });
    
    if (onFiltersChange) {
      onFiltersChange();
    } else {
      fetchTransactions();
    }
  };

  const handleClearAll = () => {
    setTransactionListParams({ 
      ...transactionListParams, 
      filters: { search: transactionListParams.filters?.search } 
    });
    
    if (onFiltersChange) {
      onFiltersChange();
    } else {
      fetchTransactions();
    }
  };

  return (
    <FilterPanel
      filters={filters}
      initialValues={transactionListParams.filters || {}}
      onFiltersChange={handleFiltersChange}
      onClearAll={handleClearAll}
      title="Transaction Filters"
    />
  );
};