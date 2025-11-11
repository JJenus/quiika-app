import React from 'react';
import { useAdminStore } from '../../../stores/useAdminStore';
import { AdminUser } from '../../../types/admin';
import { DataTable, Column } from '../../ui/DataTable';
import { Eye, Edit, Trash2, Mail, Shield, User, CheckCircle, XCircle } from 'lucide-react';
import { ActionItem } from '../../../types/table';
import { Badge } from '@/components/ui/Badge';

interface UserDataTableProps {
  onViewDetails: (user: AdminUser) => void;
  onEditUser: (user: AdminUser) => void;
  onDeleteUser: (user: AdminUser) => void;
  onSendInvite: (user: AdminUser) => void;
}

export const UserDataTable: React.FC<UserDataTableProps> = ({
  onViewDetails,
  onEditUser,
  onDeleteUser,
  onSendInvite
}) => {
  const { 
    users, 
    loading, 
    selectedUsers, 
    selectUser,
    selectAllUsers 
  } = useAdminStore();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getRoleVariant = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'error';
      case 'ADMIN':
        return 'processing';
      case 'SUPPORT':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusVariant = (isActive: boolean) => {
    return isActive ? 'success' : 'error';
  };

  const columns: Column<AdminUser>[] = [
    {
      key: 'name',
      header: 'User',
      render: (user) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-xs">
              {user.firstName[0]}{user.lastName[0]}
            </span>
          </div>
          <div>
            <div className="font-medium text-text-primary dark:text-text-primary-dark">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-sm text-text-secondary dark:text-text-secondary-dark">
              {user.email}
            </div>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      key: 'role',
      header: 'Role',
      render: (user) => (
        <Badge variant={getRoleVariant(user.role)}>
          {user.role.replace('_', ' ')}
        </Badge>
      ),
      sortable: true,
    },
    {
      key: 'isActive',
      header: 'Status',
      render: (user) => (
        <Badge variant={getStatusVariant(user.isActive)}>
          {user.isActive ? 'Active' : 'Inactive'}
        </Badge>
      ),
      sortable: true,
    },
    {
      key: 'lastLogin',
      header: 'Last Login',
      render: (user) => (
        <div className="text-sm">
          {user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
        </div>
      ),
      sortable: true,
    },
    {
      key: 'createdAt',
      header: 'Joined',
      render: (user) => formatDate(user.createdAt),
      sortable: true,
    },
  ];

  const actions = (user: AdminUser) => {
    const actionItems: ActionItem[] = [
      {
        label: 'View Details',
        onClick: onViewDetails,
        icon: <Eye className="h-4 w-4" />,
      },
      {
        label: 'Edit User',
        onClick: onEditUser,
        icon: <Edit className="h-4 w-4" />,
      },
    ];

    if (!user.isActive) {
      actionItems.push({
        label: 'Resend Invite',
        onClick: onSendInvite,
        icon: <Mail className="h-4 w-4" />,
      });
    }

    actionItems.push({
      label: 'Deactivate',
      onClick: onDeleteUser,
      icon: <Trash2 className="h-4 w-4" />,
      variant: 'destructive' as const,
    });

    return actionItems;
  };

  const handleSelectItem = (userId: number) => {
    selectUser(userId+"", !selectedUsers.includes(userId+""));
  };

  const handleSelectAll = (selected: boolean) => {
    selectAllUsers(selected);
  };

  return (
    <DataTable
      data={users}
      columns={columns}
      loading={loading.isLoading}
      actions={actions}
      selectedItems={selectedUsers}
      onSelectItem={handleSelectItem}
      onSelectAll={handleSelectAll}
      selectable={true}
      keyField="id"
      emptyMessage="No users found"
      emptyDescription="Try adjusting your filters or invite new users."
    />
  );
};