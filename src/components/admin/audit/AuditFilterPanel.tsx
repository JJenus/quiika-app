import React from 'react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Filter, X } from 'lucide-react';

interface AuditFilterPanelProps {
  filters: {
    actionType?: string;
    startDate?: string;
    endDate?: string;
    targetEntityId?: string;
  };
  onFiltersChange: (filters: any) => void;
  onClearFilters: () => void;
}

export const AuditFilterPanel: React.FC<AuditFilterPanelProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
}) => {
  const actionTypes = [
    'CREATE',
    'UPDATE', 
    'DELETE',
    'READ',
    'LOGIN',
    'LOGOUT',
  ];

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined && value !== '');

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Filters
          </h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Clear Filters
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Action Type
          </label>
          <select
            value={filters.actionType || ''}
            onChange={(e) => onFiltersChange({ actionType: e.target.value || undefined })}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 dark:focus:ring-gray-300"
          >
            <option value="">All Actions</option>
            {actionTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Start Date
          </label>
          <Input
            type="date"
            value={filters.startDate || ''}
            onChange={(e) => onFiltersChange({ startDate: e.target.value || undefined })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            End Date
          </label>
          <Input
            type="date"
            value={filters.endDate || ''}
            onChange={(e) => onFiltersChange({ endDate: e.target.value || undefined })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Target Entity ID
          </label>
          <Input
            placeholder="Enter entity ID"
            value={filters.targetEntityId || ''}
            onChange={(e) => onFiltersChange({ targetEntityId: e.target.value || undefined })}
          />
        </div>
      </div>
    </div>
  );
};