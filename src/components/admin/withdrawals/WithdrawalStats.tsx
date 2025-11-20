import React from 'react';
import { Clock, Banknote, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { StatsCards } from '../shared/StatsCards';
import { formatFractionalCurrency as formatCurrency } from '@/utils/ruleUtils';
import { WithdrawalMetrics } from '@/lib/api';

interface WithdrawalStatsProps {
  metrics?: WithdrawalMetrics;
  loading?: boolean;
}

export const WithdrawalStats: React.FC<WithdrawalStatsProps> = ({ 
  metrics, 
  loading = false 
}) => {
  const totalWithdrawals = metrics?.totalWithdrawals?.value || 0;
  const totalWithdrawalsGrowth = metrics?.totalWithdrawals?.growth || 0;
  
  const totalApprovedValue = metrics?.totalApprovedWithdrawalValue?.value || 0;
  const totalApprovedValueGrowth = metrics?.totalApprovedWithdrawalValue?.growth || 0;
  
  const withdrawalsByStatus = metrics?.withdrawalsByStatus || {};
  const pendingCount = withdrawalsByStatus['PENDING'] || 0;
  const completedCount = withdrawalsByStatus['COMPLETED'] || 0;
  const failedCount = withdrawalsByStatus['FAILED'] || 0;

  const cards = [
    {
      title: 'Pending Requests',
      value: pendingCount.toLocaleString(),
      icon: <Clock className="h-6 w-6 " />,
      gradient: 'orange',
      description: 'Awaiting approval',
    },
    {
      title: 'Total Approved Value',
      value: formatCurrency(totalApprovedValue),
      icon: <Banknote className="h-6 w-6 " />,
      gradient: 'blue',
      description: 'Total processed amount',
      growth: totalApprovedValueGrowth,
    },
    {
      title: 'Total Withdrawals',
      value: totalWithdrawals.toLocaleString(),
      icon: <CheckCircle className="h-6 w-6 " />,
      gradient: 'green',
      description: 'All time withdrawals',
      growth: totalWithdrawalsGrowth,
    },
    {
      title: 'Success Rate',
      value: totalWithdrawals > 0 
        ? `${((completedCount / totalWithdrawals) * 100).toFixed(1)}%`
        : '0%',
      icon: <TrendingUp className="h-6 w-6 " />,
      gradient: 'purple',
      description: `Completed: ${completedCount} / Failed: ${failedCount}`,
    },
  ];

  return (
    <StatsCards cards={cards} loading={loading} columns={4} />
  );
};