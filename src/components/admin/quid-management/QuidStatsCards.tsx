import React from 'react';
import { DollarSign, Hash, ShieldOff, CheckCircle } from 'lucide-react';
import { useAdminStore } from '@/stores/useAdminStore';
import { StatsCards } from '@/components/admin/shared/StatsCards';

export const QuidStatsCards: React.FC = () => {
  const { quidMetrics } = useAdminStore();

  const stats = React.useMemo(() => {
    const totalValue = quidMetrics?.totalQuidValue?.value || 0;
    const totalValueGrowth = quidMetrics?.totalQuidValue?.growth || 0;
    
    const totalQuids = quidMetrics?.totalQuids?.value || 0;
    const totalQuidsGrowth = quidMetrics?.totalQuids?.growth || 0;
    
    const activeQuids = quidMetrics?.quidsByStatus?.['ACTIVE'] || 0;
    const blockedQuids = quidMetrics?.quidsByStatus?.['BLOCKED'] || 0;

    return {
      totalValue: {
        value: totalValue,
        growth: totalValueGrowth
      },
      totalQuids: {
        value: totalQuids,
        growth: totalQuidsGrowth
      },
      activeQuids: {
        value: activeQuids,
        growth: 0
      },
      blockedQuids: {
        value: blockedQuids,
        growth: 0
      }
    };
  }, [quidMetrics]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
    }).format(amount / 100);
  };

  const cards = [
    {
      title: 'Total Value',
      value: formatCurrency(stats.totalValue.value),
      icon: <DollarSign className="h-6 w-6 text-blue-500" />,
      gradient: 'blue',
      description: 'Total QUID value',
      growth: stats.totalValue.growth,
    },
    {
      title: 'Total QUIDs',
      value: stats.totalQuids.value.toLocaleString(),
      icon: <Hash className="h-6 w-6" />,
      gradient: 'green',
      description: 'All QUIDs created',
      growth: stats.totalQuids.growth,
    },
    {
      title: 'Active QUIDs',
      value: stats.activeQuids.value.toLocaleString(),
      icon: <CheckCircle className="h-6 w-6" />,
      gradient: 'purple',
      description: 'Currently active',
      growth: stats.activeQuids.growth,
    },
    {
      title: 'Blocked QUIDs',
      value: stats.blockedQuids.value.toLocaleString(),
      icon: <ShieldOff className="h-6 w-6" />,
      gradient: 'red',
      description: 'Suspended QUIDs',
      growth: stats.blockedQuids.growth,
    },
  ];

  return <StatsCards cards={cards} columns={4} />;
};