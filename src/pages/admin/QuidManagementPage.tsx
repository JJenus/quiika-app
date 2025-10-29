import React, { useEffect, useCallback } from 'react';
import { useAdminStore } from '../../stores/useAdminStore';
import { QuidStatsCards } from '../../components/admin/quid-management/QuidStatsCards';
import { QuidFilterPanel } from '../../components/admin/quid-management/QuidFilterPanel';
import { QuidDataTable } from '../../components/admin/quid-management/QuidDataTable';
import { QuidSearchBar } from '../../components/admin/quid-management/QuidSearchBar';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Download, RefreshCw } from 'lucide-react';

export const QuidManagementPage: React.FC = () => {
  const { 
    fetchQuids, 
    quids, 
    loading, 
    selectedQuids, 
    clearQuidSelection,
    exportQuids,
    bulkUpdateQuidStatus 
  } = useAdminStore();

  // Fetch quids on mount and when dependencies change
  useEffect(() => {
    fetchQuids();
  }, []);

  const handleRefresh = useCallback(() => {
    fetchQuids();
  }, [fetchQuids]);

  const handleExport = () => {
    exportQuids('csv');
  };

  const handleBulkAction = (status: string) => {
    // Implement bulk action logic
    console.log('Bulk action:', status, selectedQuids);
  };

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
          <Button onClick={handleRefresh} variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button onClick={handleExport} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <QuidStatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-4i gap-6">
        <div className="hidden lg:col-span-1">
          <Card padding={false}>
            <QuidFilterPanel onFiltersChange={handleRefresh} />
          </Card>
        </div>
        <div className="lg:col-span-3i space-y-4">
          <Card>
            <QuidSearchBar onSearchChange={handleRefresh} />
          </Card>
          <Card>
            {selectedQuids.length > 0 && (
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-blue-900/20">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    {selectedQuids.length} QUID(s) selected
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleBulkAction('ACTIVE')}
                    >
                      Activate
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleBulkAction('BLOCKED')}
                    >
                      Block
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={clearQuidSelection}
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
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