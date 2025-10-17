import React, { useEffect } from 'react';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useAdminStore } from '../../stores/useAdminStore';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { ErrorMessage } from '../../components/ui/ErrorMessage';
import { Card } from '../../components/ui/Card';

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  trend?: { value: number; isPositive: boolean };
  color: string;
}> = ({ title, value, icon: Icon, trend, color }) => (
  <Card className="p-6 hover:shadow-moderate transition-all duration-200">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-text-secondary dark:text-text-secondary-dark">
          {title}
        </p>
        <p className="text-3xl font-bold text-text-primary dark:text-text-primary-dark mt-2">
          {value}
        </p>
        {trend && (
          <div className={`flex items-center mt-2 text-sm ${
            trend.isPositive ? 'text-success' : 'text-error'
          }`}>
            {trend.isPositive ? (
              <ArrowUpRight className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDownRight className="h-4 w-4 mr-1" />
            )}
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
  </Card>
);

export const DashboardPage: React.FC = () => {
  const { 
    stats, 
    fetchDashboardStats, 
    loading, 
    error, 
    clearError 
  } = useAdminStore();

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount / 100);
  };

  if (loading.isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" text={loading.message} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary dark:text-text-primary-dark">
            Dashboard Overview
          </h1>
          <p className="text-text-secondary dark:text-text-secondary-dark mt-1">
            Welcome back! Here's what's happening with Quiika.
          </p>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-text-secondary dark:text-text-secondary-dark">
          <Clock className="h-4 w-4" />
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {error.hasError && (
        <ErrorMessage 
          message={error.message || 'Failed to load dashboard data'} 
          onRetry={fetchDashboardStats}
          onDismiss={clearError}
        />
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          icon={Users}
          trend={{ value: stats.monthlyGrowth, isPositive: true }}
          color="bg-gradient-to-r from-blue-500 to-blue-600"
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={DollarSign}
          trend={{ value: 12.5, isPositive: true }}
          color="bg-gradient-to-r from-green-500 to-green-600"
        />
        <StatCard
          title="Active QUIDs"
          value={stats.activeQuids}
          icon={Activity}
          trend={{ value: 8.2, isPositive: true }}
          color="bg-gradient-to-r from-purple-500 to-purple-600"
        />
        <StatCard
          title="Conversion Rate"
          value={`${stats.conversionRate}%`}
          icon={TrendingUp}
          trend={{ value: 3.1, isPositive: true }}
          color="bg-gradient-to-r from-orange-500 to-orange-600"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark">
              Transactions
            </h3>
            <CheckCircle className="h-5 w-5 text-success" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-text-secondary dark:text-text-secondary-dark">Total</span>
              <span className="font-semibold">{stats.totalTransactions.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary dark:text-text-secondary-dark">This Month</span>
              <span className="font-semibold text-success">+234</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark">
              Withdrawals
            </h3>
            <AlertTriangle className="h-5 w-5 text-warning" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-text-secondary dark:text-text-secondary-dark">Completed</span>
              <span className="font-semibold">{formatCurrency(stats.totalWithdrawals)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary dark:text-text-secondary-dark">Pending</span>
              <span className="font-semibold text-warning">{stats.pendingWithdrawals}</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark">
              System Health
            </h3>
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-text-secondary dark:text-text-secondary-dark">Uptime</span>
              <span className="font-semibold text-success">99.9%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary dark:text-text-secondary-dark">Response Time</span>
              <span className="font-semibold">120ms</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="btn-outline p-4 text-left hover:bg-primary/5 transition-colors">
            <div className="font-medium">Review Pending Withdrawals</div>
            <div className="text-sm text-text-secondary dark:text-text-secondary-dark mt-1">
              {stats.pendingWithdrawals} requests waiting
            </div>
          </button>
          <button className="btn-outline p-4 text-left hover:bg-primary/5 transition-colors">
            <div className="font-medium">Invite New Admin</div>
            <div className="text-sm text-text-secondary dark:text-text-secondary-dark mt-1">
              Add team members
            </div>
          </button>
          <button className="btn-outline p-4 text-left hover:bg-primary/5 transition-colors">
            <div className="font-medium">Generate Report</div>
            <div className="text-sm text-text-secondary dark:text-text-secondary-dark mt-1">
              Export financial data
            </div>
          </button>
        </div>
      </Card>
    </div>
  );
};