import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { SlidersHorizontal, X, Calendar } from 'lucide-react';

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
  color?: string; // Parent can provide custom colors
}

export interface FilterConfig {
  key: string;
  label: string;
  type: 'select' | 'multiselect' | 'date' | 'date-range' | 'search' | 'number-range' | 'custom';
  options?: FilterOption[];
  placeholder?: string;
  renderCustom?: (value: any, onChange: (value: any) => void) => React.ReactNode;
}

interface FilterPanelProps {
  filters: FilterConfig[];
  initialValues?: Record<string, any>;
  onFiltersChange: (filters: Record<string, any>) => void;
  onClearAll?: () => void;
  className?: string;
  title?: string;
}

export function FilterPanel({
  filters,
  initialValues = {},
  onFiltersChange,
  onClearAll,
  className = '',
  title = 'Filters'
}: FilterPanelProps) {
  const [localFilters, setLocalFilters] = useState<Record<string, any>>(initialValues);
  const [dateRange, setDateRange] = useState('all');

  // Update local filters when initialValues change
  useEffect(() => {
    setLocalFilters(initialValues);
  }, [initialValues]);

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {};
    setLocalFilters(clearedFilters);
    setDateRange('all');
    if (onClearAll) {
      onClearAll();
    } else {
      onFiltersChange(clearedFilters);
    }
  };

  const hasActiveFilters = Object.keys(localFilters).some(key => {
    const value = localFilters[key];
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object' && value !== null) {
      return Object.values(value).some(v => v !== undefined && v !== '');
    }
    return value !== undefined && value !== '' && value !== null;
  });

  const getActiveFilterCount = () => {
    return Object.keys(localFilters).filter(key => {
      const value = localFilters[key];
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === 'object' && value !== null) {
        return Object.values(value).some(v => v !== undefined && v !== '');
      }
      return value !== undefined && value !== '' && value !== null;
    }).length;
  };

  const renderFilterInput = (filter: FilterConfig) => {
    switch (filter.type) {
      case 'select':
        return (
          <select
            value={localFilters[filter.key] || ''}
            onChange={(e) => handleFilterChange(filter.key, e.target.value)}
            className="w-full input-field text-sm"
          >
            <option value="">All {filter.label}</option>
            {filter.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label} {option.count !== undefined && `(${option.count})`}
              </option>
            ))}
          </select>
        );

      case 'multiselect':
        return (
          <div className="grid md:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
            {filter.options?.map(option => {
              const isSelected = (localFilters[filter.key] || []).includes(option.value);
              
              return (
                <button
                  key={option.value}
                  className={`w-full text-left px-3 py-2 rounded-lg border transition-all duration-200 hover:shadow-moderate ${
                    isSelected 
                      ? (option.color || 'bg-primary/10 text-primary border-primary/20') + ' shadow-gentle'
                      : 'border-gray-200 dark:border-gray-600 text-text-primary dark:text-text-primary-dark hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => {
                    const currentValues = localFilters[filter.key] || [];
                    const newValues = isSelected
                      ? currentValues.filter((v: string) => v !== option.value)
                      : [...currentValues, option.value];
                    handleFilterChange(filter.key, newValues);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {option.label}
                    </span>
                    <div className="flex items-center gap-2">
                      {option.count !== undefined && (
                        <span className="text-xs text-text-secondary dark:text-text-secondary-dark">
                          {option.count}
                        </span>
                      )}
                      {isSelected && (
                        <div className="w-2 h-2 bg-current rounded-full" />
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        );

      case 'search':
        return (
          <input
            type="text"
            placeholder={filter.placeholder}
            value={localFilters[filter.key] || ''}
            onChange={(e) => handleFilterChange(filter.key, e.target.value)}
            className="w-full input-field text-sm"
          />
        );

      case 'number-range':
        return (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-text-secondary dark:text-text-secondary-dark mb-1">
                Min
              </label>
              <input
                type="number"
                placeholder="0"
                value={localFilters[filter.key]?.min || ''}
                onChange={(e) => handleFilterChange(filter.key, {
                  ...localFilters[filter.key],
                  min: e.target.value ? Number(e.target.value) : undefined
                })}
                className="w-full input-field text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-text-secondary dark:text-text-secondary-dark mb-1">
                Max
              </label>
              <input
                type="number"
                placeholder="∞"
                value={localFilters[filter.key]?.max || ''}
                onChange={(e) => handleFilterChange(filter.key, {
                  ...localFilters[filter.key],
                  max: e.target.value ? Number(e.target.value) : undefined
                })}
                className="w-full input-field text-sm"
              />
            </div>
          </div>
        );

      case 'date-range':
        return (
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: 'today', label: 'Today' },
              { value: 'week', label: 'This Week' },
              { value: 'month', label: 'This Month' },
              { value: 'quarter', label: 'This Quarter' },
              { value: 'year', label: 'This Year' },
              { value: 'all', label: 'All Time' },
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
        );

      case 'custom':
        return filter.renderCustom?.(localFilters[filter.key], (value) => 
          handleFilterChange(filter.key, value)
        );

      default:
        return null;
    }
  };

  return (
    <Card className={className} padding={false}>
      <div className="space-y-6 p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-text-primary dark:text-text-primary-dark">
            <SlidersHorizontal className="h-5 w-5" />
            {title}
            {hasActiveFilters && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-primary text-white rounded-full">
                {getActiveFilterCount()}
              </span>
            )}
          </h3>
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters} 
              className="text-sm text-text-secondary dark:text-text-secondary-dark hover:text-error"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        <div className="space-y-6">
          {filters.map(filter => (
            <div key={filter.key}>
              <label className="block text-sm font-medium mb-3 text-text-primary dark:text-text-primary-dark flex items-center gap-2">
                {filter.type === 'date-range' && <Calendar className="h-4 w-4" />}
                {filter.label}
              </label>
              {renderFilterInput(filter)}
            </div>
          ))}
        </div>

        <Button onClick={applyFilters} className="w-full" size="lg">
          Apply Filters
        </Button>
      </div>
    </Card>
  );
}