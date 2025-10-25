import React from 'react';
import { useAdminStore } from '../../../stores/useAdminStore';
import { AdminQuid, QuidStatus, SortDirection } from '../../../types/api';
import { DataTable, Column, Badge, Pagination } from '../../ui/DataTable';
import { Eye, Edit, Trash2, Blocks as Block, Download, CheckCircle } from 'lucide-react';

export const QuidDataTable: React.FC = () => {
  const { 
    quids, 
    loading, 
    selectedQuids, 
    selectQuid,
    selectAllQuids,
    quidListParams,
    setQuidListParams,
    fetchQuids,
    updateQuidStatus,
    exportQuids
  } = useAdminStore();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(amount / 100);
  };

  const getStatusVariant = (status: QuidStatus) => {
    switch (status) {
      case 'ACTIVE':
        return 'success';
      case 'CLAIMED':
        return 'default';
      case 'BLOCKED':
        return 'error';
      case 'EXPIRED':
        return 'warning';
      case 'SPLIT':
        return 'info';
      case 'CONFLICTED':
        return 'error';
      default:
        return 'default';
    }
  };

  const columns: Column<AdminQuid>[] = [
    {
      key: 'quid',
      header: 'QUID',
      render: (quid) => (
        <span className="font-mono text-sm">{quid.quid}</span>
      ),
      sortable: true,
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (quid) => formatCurrency(quid.amount, quid.currency),
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      render: (quid) => (
        <Badge variant={getStatusVariant(quid.status)}>
          {quid.status}
        </Badge>
      ),
      sortable: true,
    },
    {
      key: 'creatorEmail',
      header: 'Creator Email',
      sortable: true,
    },
    {
      key: 'transactionCount',
      header: 'Transactions',
      sortable: true,
    },
    {
      key: 'createdAt',
      header: 'Created At',
      render: (quid) => formatDate(quid.createdAt),
      sortable: true,
    },
  ];

  const handleViewDetails = (quid: AdminQuid) => {
    // Navigate to quid details page
    console.log('View quid details:', quid);
    // You can use your routing here, e.g., navigate(`/admin/quids/${quid.id}`);
  };

  const handleEdit = (quid: AdminQuid) => {
    // Open edit modal
    console.log('Edit quid:', quid);
  };

  const handleToggleBlock = (quid: AdminQuid) => {
    const newStatus: QuidStatus = quid.status === 'BLOCKED' ? 'ACTIVE' : 'BLOCKED';
    updateQuidStatus(quid.id, newStatus);
  };

  const handleExport = (quid: AdminQuid) => {
    exportQuids('csv');
  };

  const handleDelete = (quid: AdminQuid) => {
    if (window.confirm(`Are you sure you want to delete QUID ${quid.quid}?`)) {
      console.log('Delete quid:', quid);
      // Implement delete logic
    }
  };

  const actions = (quid: AdminQuid) => [
    {
      label: 'View Details',
      onClick: handleViewDetails,
      icon: <Eye className="h-4 w-4" />,
    },
    {
      label: 'Edit',
      onClick: handleEdit,
      icon: <Edit className="h-4 w-4" />,
    },
    {
      label: 'Export',
      onClick: handleExport,
      icon: <Download className="h-4 w-4" />,
    },
    {
      label: quid.status === 'BLOCKED' ? 'Unblock' : 'Block',
      onClick: handleToggleBlock,
      icon: quid.status === 'BLOCKED' ? <CheckCircle className="h-4 w-4" /> : <Block className="h-4 w-4" />,
      variant: quid.status === 'BLOCKED' ? 'default' as const : 'destructive' as const,
    },
    {
      label: 'Delete',
      onClick: handleDelete,
      icon: <Trash2 className="h-4 w-4" />,
      variant: 'destructive' as const,
    },
  ];

  const handleSort = (field: string, direction: SortDirection) => {
    setQuidListParams({
      sort: { field: field as keyof AdminQuid, direction },
      page: 1,
    });
    fetchQuids();
  };

  const handlePageChange = (page: number) => {
    setQuidListParams({ page });
    fetchQuids();
  };

  const handleSelectItem = (quidId: number) => {
    const isSelected = selectedQuids.includes(quidId);
    selectQuid(quidId, !isSelected);
  };

  const handleSelectAll = (selected: boolean) => {
    selectAllQuids(selected);
  };

  // Safe data access
  const tableData = quids?.data || [];
  const pagination = quids || {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  };

  return (
    <div className="space-y-4">
      <DataTable
        data={tableData}
        columns={columns}
        loading={loading.isLoading}
        actions={actions}
        onSort={handleSort}
        sortBy={quidListParams.sort?.field as string}
        sortDirection={quidListParams.sort?.direction}
        selectedItems={selectedQuids}
        onSelectItem={handleSelectItem}
        onSelectAll={handleSelectAll}
        selectable={true}
        keyField="id"
      />
      
      {tableData.length > 0 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          totalItems={pagination.total}
          itemsPerPage={pagination.limit}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};