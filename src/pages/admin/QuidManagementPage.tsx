import React, { useEffect, useCallback } from 'react';
import { useAdminStore } from '../../stores/useAdminStore';
import { QuidStatsCards } from '../../components/admin/quid-management/QuidStatsCards';
import { QuidFilterPanel } from '../../components/admin/quid-management/QuidFilterPanel';
import { QuidDataTable } from '../../components/admin/quid-management/QuidDataTable';
import { QuidSearchBar } from '../../components/admin/quid-management/QuidSearchBar';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const QuidManagementPage: React.FC = () => {
  const { fetchQuids, quids, loading, selectedQuids } = useAdminStore();

  // Fetch quids only on initial mount
  useEffect(() => {
    fetchQuids();
  }, []); // Empty dependency array - only run on mount

  // Create a stable refresh function
  const handleRefresh = useCallback(() => {
    fetchQuids();
  }, [fetchQuids]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary dark:text-text-primary-dark">
            QUID Management
          </h1>
          <p className="text-text-secondary dark:text-text-secondary-dark mt-1">
            Monitor, filter, and manage all QUIDs in the system.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleRefresh} variant="outline">
            Refresh
          </Button>
          <Button>Export</Button>
        </div>
      </div>

      <QuidStatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card padding={false}>
            <QuidFilterPanel onFiltersChange={handleRefresh} />
          </Card>
        </div>
        <div className="lg:col-span-3 space-y-4">
          <Card>
            <QuidSearchBar onSearchChange={handleRefresh} />
          </Card>
          <Card>
            {selectedQuids.length > 0 && <p>Bulk actions toolbar here...</p>}
            
            {loading.isLoading && !quids?.data ? (
              <div className="flex justify-center items-center h-96">
                <LoadingSpinner text="Fetching QUIDs..." />
              </div>
            ) : (
              <QuidDataTable />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};