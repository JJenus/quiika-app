import React, { useEffect, useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, ChartPie as PieChart, ChartBar as BarChart3, Download, Calendar, ListFilter as Filter } from 'lucide-react';
import { useAdminStore } from '../../stores/useAdminStore';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { ErrorMessage } from '../../components/ui/ErrorMessage';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const FinancialPage: React.FC = () => {
  const { 
    financialData, 
    fetchFinancialData, 
    loading, 
    error, 
    clearError 
  } = useAdminStore();

  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  useEffect(() => {
    fetchFinancialData();
  }, [fetchFinancialData]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount / 100);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
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
            Financial Overview
          </h1>
          <p className="text-text-secondary dark:text-text-secondary-dark mt-1">
            Track revenue, expenses, and profitability
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="input-field py-2 px-3 text-sm"
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {error.hasError && (
        <ErrorMessage 
          message={error.message || 'Failed to load financial data'} 
          onRetry={fetchFinancialData}
          onDismiss={clearError}
        />
      )}

      {/* Key Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary dark:text-text-secondary-dark">
                Total Revenue
              </p>
              <p className="text-2xl font-bold text-text-primary dark:text-text-primary-dark mt-2">
                {formatCurrency(financialData.totalRevenue)}
              </p>
              <div className="flex items-center mt-2 text-sm text-success">
                <TrendingUp className="h-4 w-4 mr-1" />
                +15.3%
              </div>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary dark:text-text-secondary-dark">
                Total Fees Collected
              </p>
              <p className="text-2xl font-bold text-text-primary dark:text-text-primary-dark mt-2">
                {formatCurrency(financialData.totalFees)}
              </p>
              <div className="flex items-center mt-2 text-sm text-success">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12.8%
              </div>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600">
              <PieChart className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary dark:text-text-secondary-dark">
                Total Withdrawals
              </p>
              <p className="text-2xl font-bold text-text-primary dark:text-text-primary-dark mt-2">
                {formatCurrency(financialData.totalWithdrawals)}
              </p>
              <div className="flex items-center mt-2 text-sm text-warning">
                <TrendingDown className="h-4 w-4 mr-1" />
                -2.1%
              </div>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600">
              <TrendingDown className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary dark:text-text-secondary-dark">
                Net Profit
              </p>
              <p className="text-2xl font-bold text-text-primary dark:text-text-primary-dark mt-2">
                {formatCurrency(financialData.netProfit)}
              </p>
              <div className="flex items-center mt-2 text-sm text-success">
                <TrendingUp className="h-4 w-4 mr-1" />
                +18.7%
              </div>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark">
            Monthly Revenue Trend
          </h3>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-text-secondary dark:text-text-secondary-dark" />
            <span className="text-sm text-text-secondary dark:text-text-secondary-dark">
              Last 6 Months
            </span>
          </div>
        </div>
        
        <div className="space-y-4">
          {financialData.monthlyRevenue.map((month, index) => {
            const maxRevenue = Math.max(...financialData.monthlyRevenue.map(m => m.revenue));
            const revenuePercentage = (month.revenue / maxRevenue) * 100;
            const feesPercentage = (month.fees / maxRevenue) * 100;
            
            return (
              <div key={month.month} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-text-primary dark:text-text-primary-dark">
                    {month.month}
                  </span>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-text-primary dark:text-text-primary-dark">
                      {formatCurrency(month.revenue)}
                    </div>
                    <div className="text-xs text-text-secondary dark:text-text-secondary-dark">
                      Fees: {formatCurrency(month.fees)}
                    </div>
                  </div>
                </div>
                <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                    style={{ width: `${revenuePercentage}%` }}
                  />
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-500"
                    style={{ width: `${feesPercentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Revenue Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-6">
            Revenue Sources
          </h3>
          <div className="space-y-4">
            {financialData.revenueBySource.map((source, index) => (
              <div key={source.source} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-text-primary dark:text-text-primary-dark">
                    {source.source}
                  </span>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-text-primary dark:text-text-primary-dark">
                      {formatCurrency(source.amount)}
                    </div>
                    <div className="text-xs text-text-secondary dark:text-text-secondary-dark">
                      {formatPercentage(source.percentage)}
                    </div>
                  </div>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      index === 0 ? 'bg-gradient-to-r from-blue-400 to-blue-500' :
                      index === 1 ? 'bg-gradient-to-r from-green-400 to-green-500' :
                      'bg-gradient-to-r from-purple-400 to-purple-500'
                    }`}
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-6">
            Financial Health Metrics
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-text-secondary dark:text-text-secondary-dark">
                  Profit Margin
                </span>
                <span className="text-lg font-bold text-success">
                  {formatPercentage((financialData.netProfit / financialData.totalRevenue) * 100)}
                </span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-success to-green-400 rounded-full"
                  style={{ width: `${(financialData.netProfit / financialData.totalRevenue) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-text-secondary dark:text-text-secondary-dark">
                  Fee Collection Rate
                </span>
                <span className="text-lg font-bold text-primary">
                  {formatPercentage((financialData.totalFees / financialData.totalRevenue) * 100)}
                </span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                  style={{ width: `${(financialData.totalFees / financialData.totalRevenue) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-text-secondary dark:text-text-secondary-dark">
                  Withdrawal Rate
                </span>
                <span className="text-lg font-bold text-warning">
                  {formatPercentage((financialData.totalWithdrawals / financialData.totalRevenue) * 100)}
                </span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-warning to-orange-400 rounded-full"
                  style={{ width: `${(financialData.totalWithdrawals / financialData.totalRevenue) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};