import React, { useState } from 'react';
import { useAdminStore } from '../../../stores/useAdminStore';
import { Button } from '../../ui/Button';
import { QuidStatus, Currency } from '../../../types/api';
import { Filter, X, SlidersHorizontal, Calendar } from 'lucide-react';

interface QuidFilterPanelProps {
  onFiltersChange?: () => void;
}

export const QuidFilterPanel: React.FC<QuidFilterPanelProps> = ({ onFiltersChange }) => {
  const { quidListParams, setQuidListParams, fetchQuids } = useAdminStore();
  const [filters, setFilters] = useState(quidListParams.filters || {});
  const [dateRange, setDateRange] = useState('all');

  const handleFilterChange = <K extends keyof typeof filters>(key: K, value: (typeof filters)[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    setQuidListParams({ filters, page: 1 });
    if (onFiltersChange) {
      onFiltersChange();
    } else {
      fetchQuids();
    }
  };

  const clearFilters = () => {
    const { search } = quidListParams.filters || {};
    const clearedFilters = { search };
    setFilters(clearedFilters);
    setDateRange('all');
    setQuidListParams({ filters: clearedFilters });
    if (onFiltersChange) {
      onFiltersChange();
    } else {
      fetchQuids();
    }
  };

  const hasActiveFilters = Object.keys(filters).some(key => 
    filters[key as keyof typeof filters] && 
    (Array.isArray(filters[key as keyof typeof filters]) 
      ? (filters[key as keyof typeof filters] as any[]).length > 0
      : true)
  );

  const quidStatuses: QuidStatus[] = ['ACTIVE', 'CLAIMED', 'BLOCKED', 'EXPIRED', 'SPLIT', 'CONFLICTED'];
  const currencies: Currency[] = ['NGN', 'GHS', 'KES', 'ZAR'];

  const getStatusColor = (status: QuidStatus) => {
    const colors = {
      ACTIVE: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800',
      CLAIMED: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
      BLOCKED: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
      EXPIRED: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700',
      SPLIT: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800',
      CONFLICTED: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800',
    };
    return colors[status] || colors.ACTIVE;
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-text-primary dark:text-text-primary-dark">
          <SlidersHorizontal className="h-5 w-5" />
          Filters
          {hasActiveFilters && (
            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-primary text-white rounded-full">
              {Object.values(filters).filter(v => v && (Array.isArray(v) ? v.length > 0 : true)).length}
            </span>
          )}
        </h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-sm text-text-secondary dark:text-text-secondary-dark hover:text-error">
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Date Range Filter */}
      <div>
        <label className="block text-sm font-medium mb-3 text-text-primary dark:text-text-primary-dark flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Date Range
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: 'today', label: 'Today' },
            { value: 'week', label: 'This Week' },
            { value: 'month', label: 'This Month' },
            { value: 'quarter', label: 'This Quarter' },
          ].map((range) => (
            <Button
              key={range.value}
              variant={dateRange === range.value ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setDateRange(range.value)}
              className="text-xs"
            >
              {range.label}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Status Filter */}
      <div>
        <label className="block text-sm font-medium mb-3 text-text-primary dark:text-text-primary-dark">
          Status
        </label>
        <div className="grid grid-cols-2 gap-2">
          {quidStatuses.map(status => (
            <button
              key={status}
              className={`w-full text-left px-3 py-2 rounded-lg border transition-all duration-200 hover:shadow-moderate ${
                filters.status?.includes(status) 
                  ? getStatusColor(status) + ' shadow-gentle'
                  : 'border-gray-200 dark:border-gray-600 text-text-primary dark:text-text-primary-dark hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              onClick={() => {
                const currentStatus = filters.status || [];
                const newStatus = currentStatus.includes(status)
                  ? currentStatus.filter(s => s !== status)
                  : [...currentStatus, status];
                handleFilterChange('status', newStatus);
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{status}</span>
                {filters.status?.includes(status) && (
                  <div className="w-2 h-2 bg-current rounded-full" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Currency Filter */}
      <div>
        <label className="block text-sm font-medium mb-3 text-text-primary dark:text-text-primary-dark">
          Currency
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
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
              className="text-xs"
            >
              {currency}
            </Button>
          ))}
        </div>
      </div>
      
      <Button onClick={applyFilters} className="w-full" size="lg">
        Apply Filters
      </Button>
    </div>
  );
};