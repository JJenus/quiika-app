// components/rules/QuidDetailsDisplay.tsx
import React from 'react';
import type { Quid } from '../../types/api';

interface QuidDetailsDisplayProps {
  quidDetails: Quid;
  formatFractionalCurrency: (amount: number, currency: string) => string;
}

export const QuidDetailsDisplay: React.FC<QuidDetailsDisplayProps> = ({ 
  quidDetails, 
  formatFractionalCurrency 
}) => {
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <span className="font-semibold text-text-primary dark:text-text-primary-dark">
            Amount: {formatFractionalCurrency(quidDetails.amount, quidDetails.currency)}
          </span>
          <span className="hidden sm:block text-gray-400">•</span>
          <span className="text-text-secondary dark:text-text-secondary-dark">
            Status: <span className="font-medium">{quidDetails.status}</span>
          </span>
        </div>
        <div className="text-text-secondary dark:text-text-secondary-dark text-sm">
          Created: {new Date(quidDetails.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};