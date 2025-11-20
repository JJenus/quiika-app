import React from 'react';
import { Activity, UserCheck, Shield, FileText } from 'lucide-react';
import { StatsCards } from '../shared/StatsCards';

interface AuditStatsCardsProps {
  stats?: {
    totalActions: number;
    todayActions: number;
    adminUsers: number;
    uniqueEntities: number;
  };
  loading?: boolean;
}

export const AuditStatsCards: React.FC<AuditStatsCardsProps> = ({ 
  stats, 
  loading = false 
}) => {
  const cards = [
    {
      title: 'Total Actions',
      value: stats?.totalActions || 0,
      icon: <Activity/>,
      description: 'All time audit events',
      gradient: 'blue',
    },
    {
      title: "Today's Actions",
      value: stats?.todayActions || 0,
      icon: <FileText />,
      description: 'Actions in last 24 hours',
      gradient: 'green',
    },
    {
      title: 'Admin Users',
      value: stats?.adminUsers || 0,
      icon: <UserCheck/>,
      description: 'Active administrators',
      gradient: 'purple',
    },
    {
      title: 'Unique Entities',
      value: stats?.uniqueEntities || 0,
      icon: <Shield/>,
      description: 'Different entities tracked',
      gradient: 'orange',
    },
  ];

  return (
    <StatsCards cards={cards} loading={loading} />
  );
};