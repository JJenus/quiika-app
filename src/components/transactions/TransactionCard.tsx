import React from 'react';
import { Calendar, DollarSign, CheckCircle, Clock, XCircle, AlertTriangle } from 'lucide-react';
import type { Transaction, TransactionStatus } from '../../types/api';

interface TransactionCardProps {
  transaction: Transaction;
  onClick?: () => void;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({ transaction, onClick }) => {
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
    return (amount / 100).toFixed(2);
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

  return (
    <div 
      className={`card p-6 hover:shadow-moderate transition-all duration-200 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
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
  );
};