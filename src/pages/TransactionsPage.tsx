import React, { useEffect } from 'react';
import { Calendar, DollarSign, CheckCircle, Clock, XCircle, AlertTriangle } from 'lucide-react';
import { useTransactionStore } from '../stores/useTransactionStore';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import type { Transaction, TransactionStatus } from '../types/api';

export const TransactionsPage: React.FC = () => {
  const { transactions, loading, error, fetchTransactions, clearError } = useTransactionStore();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const getStatusIcon = (status: TransactionStatus) => {
    switch (status) {
      case 'SUCCESS':
      case 'COMPLETED':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'PENDING':
      case 'PROCESSING':
        return <Clock className="h-5 w-5 text-warning" />;
      case 'FAILED':
        return <XCircle className="h-5 w-5 text-error" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: TransactionStatus) => {
    switch (status) {
      case 'SUCCESS':
      case 'COMPLETED':
        return 'text-success bg-success/10';
      case 'PENDING':
      case 'PROCESSING':
        return 'text-warning bg-warning/10';
      case 'FAILED':
        return 'text-error bg-error/10';
      default:
        return 'text-gray-500 bg-gray-100 dark:bg-gray-800';
    }
  };

  const formatAmount = (amount: number) => {
    return (amount / 100).toFixed(2); // Convert from kobo/pesewas to main currency
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading.isLoading) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto">
          <LoadingSpinner size="lg" text={loading.message} className="py-20" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-text-primary-dark mb-4">
            Transaction History
          </h1>
          <p className="text-text-secondary dark:text-text-secondary-dark">
            View and manage all your gift transactions
          </p>
        </div>

        {error.hasError && (
          <ErrorMessage 
            message={error.message || 'Failed to load transactions'} 
            onRetry={fetchTransactions}
            onDismiss={clearError}
            className="mb-8"
          />
        )}

        {transactions.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mx-auto w-fit mb-4">
              <DollarSign className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-text-primary dark:text-text-primary-dark mb-2">
              No Transactions Yet
            </h3>
            <p className="text-text-secondary dark:text-text-secondary-dark">
              Your transaction history will appear here once you create or receive gifts.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="card p-6 hover:shadow-moderate transition-all duration-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start space-x-4 mb-4 md:mb-0">
                    <div className="flex-shrink-0 bg-gradient-to-br from-primary/10 to-secondary/10 p-3 rounded-xl">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark truncate">
                          Gift Transaction
                        </h3>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                          {getStatusIcon(transaction.status)}
                          <span className="ml-1">{transaction.status}</span>
                        </div>
                      </div>
                      
                      <div className="text-sm text-text-secondary dark:text-text-secondary-dark space-y-1">
                        <p>To: {transaction.email}</p>
                        <p>QUID: {transaction.quid}</p>
                        <p>Reference: {transaction.reference}</p>
                        {transaction.transactionId && (
                          <p>Transaction ID: {transaction.transactionId}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:items-end space-y-2">
                    <div className="text-2xl font-bold text-text-primary dark:text-text-primary-dark">
                      ${formatAmount(transaction.amount)}
                    </div>
                    <div className="flex items-center text-sm text-text-secondary dark:text-text-secondary-dark">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(transaction.createdAt)}
                    </div>
                    {transaction.currency && (
                      <div className="text-sm text-text-secondary dark:text-text-secondary-dark">
                        {transaction.currency}
                      </div>
                    )}
                  </div>
                </div>

                {transaction.blocked && (
                  <div className="mt-4 p-3 bg-error/10 border border-error/20 rounded-lg">
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-error mr-2" />
                      <span className="text-sm text-error font-medium">
                        This transaction is currently blocked
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};