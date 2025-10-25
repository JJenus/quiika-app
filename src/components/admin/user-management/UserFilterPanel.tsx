import React from 'react';
import { useAdminStore } from '../../../stores/useAdminStore';
import { FilterPanel, FilterConfig } from '../../ui/FilterPanel';

interface UserFilterPanelProps {
  onFiltersChange?: () => void;
}

export const UserFilterPanel: React.FC<UserFilterPanelProps> = ({ onFiltersChange }) => {
  const { users } = useAdminStore();

  // Calculate counts from current data
  const roleCounts = React.useMemo(() => {
    return {
      SUPER_ADMIN: users.filter(u => u.role === 'SUPER_ADMIN').length || 0,
      ADMIN: users.filter(u => u.role === 'ADMIN').length || 0,
      SUPPORT: users.filter(u => u.role === 'SUPPORT').length || 0,
    };
  }, [users]);

  const statusCounts = React.useMemo(() => {
    return {
      active: users.filter(u => u.isActive).length || 0,
      inactive: users.filter(u => !u.isActive).length || 0,
    };
  }, [users]);

  const filters: FilterConfig[] = [
    {
      key: 'role',
      label: 'User Role',
      type: 'multiselect',
      options: [
        { 
          value: 'SUPER_ADMIN', 
          label: 'Super Admin', 
          count: roleCounts.SUPER_ADMIN,
          color: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300'
        },
        { 
          value: 'ADMIN', 
          label: 'Admin', 
          count: roleCounts.ADMIN,
          color: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300'
        },
        { 
          value: 'SUPPORT', 
          label: 'Support', 
          count: roleCounts.SUPPORT,
          color: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300'
        },
      ],
    },
    {
      key: 'status',
      label: 'Account Status',
      type: 'multiselect',
      options: [
        { 
          value: 'active', 
          label: 'Active', 
          count: statusCounts.active,
          color: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300'
        },
        { 
          value: 'inactive', 
          label: 'Inactive', 
          count: statusCounts.inactive,
          color: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300'
        },
      ],
    },
    {
      key: 'dateRange',
      label: 'Join Date',
      type: 'date-range',
    },
    {
      key: 'search',
      label: 'Search',
      type: 'search',
      placeholder: 'Search by name, email...',
    },
  ];

  const handleFiltersChange = (filters: Record<string, any>) => {
    // Handle user filter changes - you can integrate this with your store
    console.log('User filters changed:', filters);
    if (onFiltersChange) onFiltersChange();
  };

  return (
    <FilterPanel
      filters={filters}
      initialValues={{}}
      onFiltersChange={handleFiltersChange}
      title="User Filters"
    />
  );
};