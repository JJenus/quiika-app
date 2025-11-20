import React, { useEffect, useState } from 'react';
import { useAuditStore } from '../../stores/useAuditStore';
import { AuditTable } from '../../components/admin/audit/AuditTable';
import { AuditFilterPanel } from '../../components/admin/audit/AuditFilterPanel';
import { AuditStatsCards } from '../../components/admin/audit/AuditStatsCards';
import { Pagination } from '../../components/ui/DataTable';
import { Button } from '../../components/ui/Button';
import { Download, RefreshCw } from 'lucide-react';
import { AuditLogDto } from '@/lib/api';

const AuditPage: React.FC = () => {
  const {
    logs,
    loading,
    error,
    filters,
    pagination,
    fetchLogs,
    setFilters,
    clearFilters,
    downloadLogs,
  } = useAuditStore();

  const [selectedLog, setSelectedLog] = useState<AuditLogDto | null>(null);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const handlePageChange = (page: number) => {
    fetchLogs(page - 1); // Convert to 0-based index
  };

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleViewDetails = (log: AuditLogDto) => {
    setSelectedLog(log);
    // You can implement a modal or drawer to show detailed view
    console.log('View details:', log);
  };

  const handleDownloadAll = async () => {
    await downloadLogs();
  };

  const handleRefresh = () => {
    fetchLogs(pagination.page);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Audit Logs
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor and track all administrative actions
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            onClick={handleDownloadAll}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download All
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      <AuditStatsCards loading={loading} />

      <AuditFilterPanel
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={clearFilters}
      />

      <AuditTable
        data={logs}
        loading={loading}
        onViewDetails={handleViewDetails}
      />

      {pagination.total > 0 && (
        <Pagination
          currentPage={pagination.page + 1} // Convert to 1-based index
          totalPages={Math.ceil(pagination.total / pagination.size)}
          totalItems={pagination.total}
          itemsPerPage={pagination.size}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default AuditPage;