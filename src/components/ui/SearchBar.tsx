import React, { useState, useRef, useCallback } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { Input } from './Input';
import { Button } from './Button';
import { Search, Filter, X, ChevronDown } from 'lucide-react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  onFiltersToggle?: () => void;
  placeholder?: string;
  initialValue?: string;
  showFiltersButton?: boolean;
  filtersOpen?: boolean;
  className?: string;
}

export function SearchBar({
  onSearch,
  onFiltersToggle,
  placeholder = "Search...",
  initialValue = '',
  showFiltersButton = true,
  filtersOpen = false,
  className = ''
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const lastSearchTermRef = useRef(initialValue);

  // Handle debounced search
  React.useEffect(() => {
    if (debouncedSearchTerm !== lastSearchTermRef.current) {
      lastSearchTermRef.current = debouncedSearchTerm;
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearch]);

  // Handle initial value changes from parent
  React.useEffect(() => {
    if (initialValue !== searchTerm) {
      setSearchTerm(initialValue);
      lastSearchTermRef.current = initialValue;
    }
  }, [initialValue]);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
    lastSearchTermRef.current = '';
    onSearch('');
  }, [onSearch]);

  const handleFiltersToggle = () => {
    if (onFiltersToggle) {
      onFiltersToggle();
    } else {
      setShowAdvanced(!showAdvanced);
    }
  };

  const handleManualSearch = useCallback(() => {
    if (searchTerm !== lastSearchTermRef.current) {
      lastSearchTermRef.current = searchTerm;
      onSearch(searchTerm);
    }
  }, [searchTerm, onSearch]);

  const isFiltersOpen = onFiltersToggle ? filtersOpen : showAdvanced;

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder={placeholder}
            className="pl-10 pr-20 w-full input-field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleManualSearch();
              }
            }}
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
          {showFiltersButton && (
            <Button
              variant="outline"
              onClick={handleFiltersToggle}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
              <ChevronDown className={`h-4 w-4 transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} />
            </Button>
          )}
          
          <Button 
            onClick={handleManualSearch}
            className="flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            Search
          </Button>
        </div>
      </div>

      {isFiltersOpen && !onFiltersToggle && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 animate-slide-down">
          <div>
            <label className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2">
              Status
            </label>
            <select className="input-field text-sm">
              <option value="">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="COMPLETED">Completed</option>
              <option value="PENDING">Pending</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2">
              Type
            </label>
            <select className="input-field text-sm">
              <option value="">All Types</option>
              <option value="TYPE1">Type 1</option>
              <option value="TYPE2">Type 2</option>
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
            </select>
          </div>
        </div>
      )}
    </div>
  );
}