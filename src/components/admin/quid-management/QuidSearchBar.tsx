import React, { useState, useEffect } from 'react';
import { useAdminStore } from '../../../stores/useAdminStore';
import { useDebounce } from '../../../hooks/useDebounce';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Search, Filter, X, ChevronDown } from 'lucide-react';

interface QuidSearchBarProps {
  onSearchChange?: () => void;
}

export const QuidSearchBar: React.FC<QuidSearchBarProps> = ({ onSearchChange }) => {
  const { quidListParams, setQuidListParams, fetchQuids } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState(quidListParams.filters?.search || '');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm !== quidListParams.filters?.search) {
      setQuidListParams({
        filters: {
          ...quidListParams.filters,
          search: debouncedSearchTerm,
        },
        page: 1,
      });
      
      if (onSearchChange) {
        onSearchChange();
      } else {
        fetchQuids();
      }
    }
  }, [debouncedSearchTerm, onSearchChange]);

  const clearSearch = () => {
    setSearchTerm('');
    setQuidListParams({
      filters: {
        ...quidListParams.filters,
        search: '',
      },
      page: 1,
    });
    if (onSearchChange) {
      onSearchChange();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search by QUID, email, creator..."
            className="pl-10 pr-20 w-full input-field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
            <ChevronDown className={`h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
          </Button>
          
          <Button 
            onClick={onSearchChange}
            className="flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            Search
          </Button>
        </div>
      </div>

      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 animate-slide-down">
          <div>
            <label className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2">
              Status
            </label>
            <select className="input-field text-sm">
              <option value="">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="CLAIMED">Claimed</option>
              <option value="BLOCKED">Blocked</option>
              <option value="EXPIRED">Expired</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2">
              Currency
            </label>
            <select className="input-field text-sm">
              <option value="">All Currencies</option>
              <option value="NGN">NGN</option>
              <option value="GHS">GHS</option>
              <option value="KES">KES</option>
              <option value="ZAR">ZAR</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2">
              Date Range
            </label>
            <select className="input-field text-sm">
              <option value="">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};