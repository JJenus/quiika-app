import React, { useEffect, useState, useCallback } from 'react';
import { useAdminStore } from '../../stores/useAdminStore';
import useAuthStore from '../../stores/useAuthStore';
import { UserStatsCards } from '../../components/admin/user-management/UserStatsCards';
import { UserFilterPanel } from '../../components/admin/user-management/UserFilterPanel';
import { UserDataTable } from '../../components/admin/user-management/UserDataTable';
import { UserSearchBar } from '../../components/admin/user-management/UserSearchBar';
import { UserInviteModal } from '../../components/admin/user-management/UserInviteModal';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { ErrorMessage } from '../../components/ui/ErrorMessage';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { UserPlus, Download, RefreshCw } from 'lucide-react';
import { AdminUser } from '../../types/admin';

export const UserManagementPage: React.FC = () => {
  const {
    users,
    fetchUsers,
    inviteUser,
    deactivateUser,
    loading,
    error,
    clearError,
    selectedUsers,
    clearUserSelection,
    exportUsers
  } = useAdminStore();

  const { user: currentUser } = useAuthStore();

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState<AdminUser | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Filter users based on search term
  const filteredUsers = React.useMemo(() => {
    if (!searchTerm) return users;
    
    const term = searchTerm.toLowerCase();
    return users.filter(user => 
      user.email.toLowerCase().includes(term) ||
      user.firstName.toLowerCase().includes(term) ||
      user.lastName.toLowerCase().includes(term) ||
      user.role.toLowerCase().includes(term)
    );
  }, [users, searchTerm]);

  const handleInviteUser = async (email: string, role: string) => {
    return await inviteUser(email, role as any);
  };

  const handleViewDetails = useCallback((user: AdminUser) => {
    setShowUserDetails(user);
  }, []);

  const handleEditUser = useCallback((user: AdminUser) => {
    // Implement edit user functionality
    console.log('Edit user:', user);
  }, []);

  const handleDeleteUser = useCallback((user: AdminUser) => {
    if (window.confirm(`Are you sure you want to deactivate ${user.firstName} ${user.lastName}?`)) {
      deactivateUser(user.id);
    }
  }, [deactivateUser]);

  const handleSendInvite = useCallback((user: AdminUser) => {
    // Implement resend invite functionality
    console.log('Resend invite to:', user.email);
  }, []);

  const handleRefresh = useCallback(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleExport = useCallback(() => {
    exportUsers('csv');
  }, [exportUsers]);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const handleBulkAction = useCallback((action: string) => {
    console.log('Bulk action:', action, selectedUsers);
    // Implement bulk actions
  }, [selectedUsers]);

  const canManageUsers = currentUser?.role === 'SUPER_ADMIN' || currentUser?.role === 'ADMIN';

  if (loading.isLoading && users.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" text={loading.message} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary dark:text-text-primary-dark">
            User Management
          </h1>
          <p className="text-text-secondary dark:text-text-secondary-dark mt-1">
            Manage admin users and their permissions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={handleRefresh} variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button onClick={handleExport} variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          {canManageUsers && (
            <Button onClick={() => setShowInviteModal(true)} className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Invite User
            </Button>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error.hasError && (
        <ErrorMessage
          message={error.message || "Failed to load users"}
          onRetry={fetchUsers}
          onDismiss={clearError}
        />
      )}

      {/* Stats Cards */}
      <UserStatsCards />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <Card padding={false}>
            <UserFilterPanel onFiltersChange={handleRefresh} />
          </Card>
        </div>

        {/* Table Section */}
        <div className="lg:col-span-3 space-y-4">
          <Card>
            <UserSearchBar onSearchChange={handleSearch} />
          </Card>

          <Card>
            {/* Bulk Actions Toolbar */}
            {selectedUsers.length > 0 && (
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-blue-900/20">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    {selectedUsers.length} user(s) selected
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleBulkAction('activate')}
                    >
                      Activate Selected
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleBulkAction('deactivate')}
                    >
                      Deactivate Selected
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={clearUserSelection}
                    >
                      Clear Selection
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Data Table */}
            {loading.isLoading && !users.length ? (
              <div className="flex justify-center items-center h-96">
                <LoadingSpinner text="Loading users..." />
              </div>
            ) : (
              <UserDataTable
                onViewDetails={handleViewDetails}
                onEditUser={handleEditUser}
                onDeleteUser={handleDeleteUser}
                onSendInvite={handleSendInvite}
              />
            )}
          </Card>
        </div>
      </div>

      {/* Invite User Modal */}
      <UserInviteModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onInvite={handleInviteUser}
        loading={loading.isLoading}
        currentUserRole={currentUser?.role}
      />

      {/* User Details Modal */}
      <Modal
        isOpen={!!showUserDetails}
        onClose={() => setShowUserDetails(null)}
        title="User Details"
        size="lg"
      >
        {showUserDetails && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {showUserDetails.firstName[0]}{showUserDetails.lastName[0]}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary dark:text-text-primary-dark">
                  {showUserDetails.firstName} {showUserDetails.lastName}
                </h3>
                <p className="text-text-secondary dark:text-text-secondary-dark">
                  {showUserDetails.email}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary dark:text-text-secondary-dark mb-1">
                  Role
                </label>
                <p className="text-text-primary dark:text-text-primary-dark font-medium">
                  {showUserDetails.role.replace('_', ' ')}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary dark:text-text-secondary-dark mb-1">
                  Status
                </label>
                <p className={`font-medium ${
                  showUserDetails.isActive ? 'text-success' : 'text-error'
                }`}>
                  {showUserDetails.isActive ? 'Active' : 'Inactive'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary dark:text-text-secondary-dark mb-1">
                  Last Login
                </label>
                <p className="text-text-primary dark:text-text-primary-dark">
                  {showUserDetails.lastLogin 
                    ? new Date(showUserDetails.lastLogin).toLocaleString()
                    : 'Never'
                  }
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary dark:text-text-secondary-dark mb-1">
                  Joined
                </label>
                <p className="text-text-primary dark:text-text-primary-dark">
                  {new Date(showUserDetails.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {showUserDetails.invitedBy && (
              <div>
                <label className="block text-sm font-medium text-text-secondary dark:text-text-secondary-dark mb-1">
                  Invited By
                </label>
                <p className="text-text-primary dark:text-text-primary-dark">
                  User #{showUserDetails.invitedBy}
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};