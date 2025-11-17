import React from 'react';
import { Card } from '../../ui/Card';
import { DollarSign, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { getColorClasses } from '@/utils/statusHelpers';
import { StatCardType } from '@/stores/card';

export const TransactionStatsCards: React.FC = () => {
  const stats = {
    totalVolume: 56789000, // in kobo
    successfulTransactions: 1250,
    failedTransactions: 45,
    pendingTransactions: 12,
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount / 100);
  };

  const statCards: StatCardType[] = [
    {
      title: 'Total Volume',
      value: formatCurrency(stats.totalVolume),
      icon: DollarSign,
      color: 'blue',
      description: 'All transactions',
    },
    {
      title: 'Successful',
      value: stats.successfulTransactions,
      icon: CheckCircle,
      color: 'green',
      description: 'Completed transactions',
    },
    {
      title: 'Failed',
      value: stats.failedTransactions,
      icon: AlertCircle,
      color: 'red',
      description: 'Failed transactions',
    },
    {
      title: 'Pending',
      value: stats.pendingTransactions,
      icon: Clock,
      color: 'yellow',
      description: 'Awaiting processing',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary dark:text-text-secondary-dark mb-1">
                {stat.title}
              </p>
              <p className="text-2xl font-bold text-text-primary dark:text-text-primary-dark">
                {stat.value}
              </p>
              <p className="text-xs text-text-secondary dark:text-text-secondary-dark mt-1">
                {stat.description}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
              <stat.icon className="h-6 w-6" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};