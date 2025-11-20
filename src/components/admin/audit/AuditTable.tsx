import React from 'react';
import { DataTable, Column } from '../../ui/DataTable';
import { AuditLogDto } from '@/lib/api';
import { Badge } from '../../ui/Badge';
import { Eye, Download } from 'lucide-react';
import { ActionItem } from '@/types/table';

interface AuditTableProps {
  data: AuditLogDto[];
  loading?: boolean;
  onViewDetails: (log: AuditLogDto) => void;
}

export const AuditTable: React.FC<AuditTableProps> = ({ 
  data, 
  loading, 
  onViewDetails 
}) => {
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getActionTypeVariant = (actionType: string) => {
    const variants: Record<string, 'default' | 'primary' | 'secondary' | 'destructive'> = {
      CREATE: 'primary',
      UPDATE: 'secondary',
      DELETE: 'destructive',
      READ: 'default',
      LOGIN: 'default',
      LOGOUT: 'default',
    };
    return variants[actionType] || 'default';
  };

  const columns: Column<AuditLogDto>[] = [
    {
      key: 'timestamp',
      header: 'Timestamp',
      sortable: true,
      render: (item) => formatTimestamp(item.timestamp || ""),
    },
    {
      key: 'adminUser',
      header: 'Admin User',
      sortable: true,
      render: (item) => item.adminUserId || 'System',
    },
    {
      key: 'actionType',
      header: 'Action Type',
      sortable: true,
      render: (item) => (
        <Badge variant={getActionTypeVariant(item.actionType || "default")}>
          {item.actionType}
        </Badge>
      ),
    },
    {
      key: 'targetEntity',
      header: 'Target Entity',
      sortable: true,
      render: (item) => item.targetEntity || '-',
    },
    {
      key: 'targetEntityId',
      header: 'Target ID',
      sortable: true,
      render: (item) => item.targetEntityId || '-',
    },
    {
      key: 'description',
      header: 'Description',
      render: (item) => (
        <div className="max-w-xs truncate" title={item.details}>
          {item.details}
        </div>
      ),
    },
    {
      key: 'ipAddress',
      header: 'IP Address',
      render: (item) => item.id || '-',
    },
    {
      key: 'userAgent',
      header: 'User Agent',
      render: (item) => (
        <div className="max-w-xs truncate" title={item.details}>
          {item.details || '-'}
        </div>
      ),
    },
  ];

  const getActions = (item: AuditLogDto): ActionItem[] => [
    {
      label: 'View Details',
      icon: <Eye className="h-4 w-4" />,
      onClick: () => onViewDetails(item),
    },
    {
      label: 'Download Log',
      icon: <Download className="h-4 w-4" />,
      onClick: () => console.log('Download log:', item.id),
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      loading={loading}
      actions={getActions}
      emptyMessage="No audit logs found"
      emptyDescription="Audit logs will appear here as administrators perform actions in the system."
    />
  );
};