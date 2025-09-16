import React, { useState, useEffect } from 'react';
import { CreditCard, Building, User, CheckCircle } from 'lucide-react';
import { useBankStore } from '../../stores/useBankStore';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import type { WithdrawForm, Bank } from '../../types/api';

interface WithdrawFormProps {
  amount: number;
  onSubmit: (data: WithdrawForm) => void;
  isLoading?: boolean;
}

export const WithdrawForm: React.FC<WithdrawFormProps> = ({
  amount,
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<WithdrawForm>({
    accountNumber: '',
    bankCode: '',
    amount: amount,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);

  const { 
    banks, 
    resolvedAccount, 
    loading, 
    error, 
    fetchBanks, 
    resolveAccountName,
    clearResolvedAccount,
    clearError 
  } = useBankStore();

  useEffect(() => {
    if (banks.length === 0) {
      fetchBanks();
    }
  }, []);

  useEffect(() => {
    // Auto-resolve account name when account number and bank are provided
    if (formData.accountNumber.length === 10 && formData.bankCode) {
      const timeoutId = setTimeout(() => {
        resolveAccountName(formData.accountNumber, formData.bankCode);
      }, 500);
      return () => clearTimeout(timeoutId);
    } else {
      clearResolvedAccount();
    }
  }, [formData.accountNumber, formData.bankCode]);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.accountNumber || formData.accountNumber.length !== 10) {
      errors.accountNumber = 'Please enter a valid 10-digit account number';
    }

    if (!formData.bankCode) {
      errors.bankCode = 'Please select a bank';
    }

    if (!resolvedAccount?.accountName) {
      errors.accountName = 'Account name could not be resolved';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    onSubmit(formData);
  };

  const handleInputChange = (field: keyof WithdrawForm, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleBankSelect = (bank: Bank) => {
    setSelectedBank(bank);
    handleInputChange('bankCode', bank.code);
    clearResolvedAccount();
  };

  return (
    <div className="card p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="bg-gradient-to-br from-success to-info p-3 rounded-xl mx-auto w-fit mb-3">
          <CreditCard className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary dark:text-text-primary-dark mb-2">
          Withdraw Funds
        </h2>
        <p className="text-text-secondary dark:text-text-secondary-dark">
          Enter your bank details to receive your money
        </p>
        <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg mt-4">
          <p className="text-lg font-semibold text-green-800 dark:text-green-200">
            Amount: ${amount.toFixed(2)}
          </p>
        </div>
      </div>

      {error.hasError && (
        <ErrorMessage 
          message={error.message || 'Something went wrong'} 
          onDismiss={clearError}
          className="mb-6"
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="bank" className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2">
            Select Bank
          </label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              id="bank"
              value={formData.bankCode}
              onChange={(e) => {
                const bank = banks.find(b => b.code === e.target.value);
                if (bank) handleBankSelect(bank);
              }}
              className={`input-field pl-10 ${formErrors.bankCode ? 'border-red-500 focus:ring-red-500' : ''}`}
            >
              <option value="">Choose your bank</option>
              {banks.map((bank) => (
                <option key={bank.code} value={bank.code}>
                  {bank.name}
                </option>
              ))}
            </select>
          </div>
          {formErrors.bankCode && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.bankCode}</p>
          )}
        </div>

        <div>
          <label htmlFor="accountNumber" className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2">
            Account Number
          </label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              id="accountNumber"
              maxLength={10}
              value={formData.accountNumber}
              onChange={(e) => handleInputChange('accountNumber', e.target.value.replace(/\D/g, ''))}
              className={`input-field pl-10 ${formErrors.accountNumber ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Enter 10-digit account number"
            />
            {loading.isLoading && formData.accountNumber.length === 10 && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <LoadingSpinner size="sm" />
              </div>
            )}
          </div>
          {formErrors.accountNumber && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.accountNumber}</p>
          )}
        </div>

        {/* Account Name Resolution */}
        {resolvedAccount?.accountName && (
          <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center">
              <User className="h-5 w-5 text-green-600 mr-2" />
              <div>
                <p className="text-sm text-green-800 dark:text-green-200 font-medium">Account Name</p>
                <p className="text-green-900 dark:text-green-100 font-semibold">
                  {resolvedAccount.accountName}
                </p>
              </div>
              <CheckCircle className="h-5 w-5 text-green-600 ml-auto" />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || loading.isLoading || !resolvedAccount?.accountName}
          className="w-full btn-primary py-3 text-base font-semibold"
        >
          {isLoading ? (
            <LoadingSpinner size="sm" text="Processing Withdrawal..." />
          ) : (
            'Withdraw Money'
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-xs text-text-secondary dark:text-text-secondary-dark">
          Withdrawals are processed instantly via Paystack
        </p>
      </div>
    </div>
  );
};