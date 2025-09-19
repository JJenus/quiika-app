// components/forms/WithdrawForm.tsx
import React, { useState, useEffect } from "react";
import { Landmark as Bank, ArrowLeft, CheckCircle } from "lucide-react";
import { useBankStore } from "../../stores/useBankStore";
import { useTransactionStore } from "../../stores/useTransactionStore";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { ErrorMessage } from "../ui/ErrorMessage";
import toast from "react-hot-toast";
import type { Bank as BankType, ResolveBank } from "../../types/api";

interface WithdrawFormProps {
  quid: string;
  accessKey: string;
  amount: number;
  currency: string;
  onCancel: () => void;
}

export const WithdrawForm: React.FC<WithdrawFormProps> = ({
  quid,
  accessKey,
  amount,
  currency,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    accountNumber: "",
    bankCode: "",
    accountName: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isResolving, setIsResolving] = useState(false);

  const { banks, resolvedAccount, loading: bankLoading, error: bankError, fetchBanks, resolveAccountName, clearError: clearBankError } = useBankStore();
  const { loading: transactionLoading, error: transactionError, clearError: clearTransactionError } = useTransactionStore();

  useEffect(() => {
    fetchBanks();
  }, [fetchBanks]);

  useEffect(() => {
    if (formData.accountNumber.length >= 10 && formData.bankCode) {
      resolveAccountDetails();
    }
  }, [formData.accountNumber, formData.bankCode]);

  useEffect(() => {
    if (resolvedAccount) {
      setFormData(prev => ({
        ...prev,
        accountName: resolvedAccount.accountName || ""
      }));
    }
  }, [resolvedAccount]);

  const resolveAccountDetails = async () => {
    if (formData.accountNumber.length < 10 || !formData.bankCode) return;
    
    setIsResolving(true);
    try {
      await resolveAccountName(formData.accountNumber, formData.bankCode);
    } catch (error) {
      console.error("Failed to resolve account:", error);
    } finally {
      setIsResolving(false);
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.accountNumber) {
      errors.accountNumber = "Account number is required";
    } else if (formData.accountNumber.length < 10) {
      errors.accountNumber = "Account number must be at least 10 digits";
    }

    if (!formData.bankCode) {
      errors.bankCode = "Please select a bank";
    }

    if (!formData.accountName) {
      errors.accountName = "Account name could not be resolved";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    clearBankError();
    clearTransactionError();

    try {
      // This would typically call a withdrawal API endpoint
      // For now, we'll simulate a successful withdrawal
      toast.success("Withdrawal request submitted successfully!");
      
      // Reset form after successful submission
      setFormData({ accountNumber: "", bankCode: "", accountName: "" });
    } catch (error) {
      toast.error("Failed to process withdrawal");
      console.error("Withdrawal failed:", error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear errors when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount / 100); // Assuming amount is in kobo
  };

  return (
    <div className="space-y-6">
      {/* Transaction Summary */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-text-primary dark:text-text-primary-dark">
            Amount to withdraw:
          </span>
          <span className="text-lg font-bold text-primary dark:text-primary-light">
            {formatCurrency(amount)}
          </span>
        </div>
        <div className="mt-2 text-xs text-text-secondary dark:text-text-secondary-dark">
          QUID: {quid}
        </div>
      </div>

      {(bankError.hasError || transactionError.hasError) && (
        <ErrorMessage
          message={bankError.message || transactionError.message || "An error occurred"}
          onDismiss={() => {
            clearBankError();
            clearTransactionError();
          }}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="accountNumber" className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2">
            Account Number
          </label>
          <input
            type="text"
            id="accountNumber"
            value={formData.accountNumber}
            onChange={(e) => handleInputChange("accountNumber", e.target.value.replace(/\D/g, ''))}
            className={`input-field ${formErrors.accountNumber ? "border-red-500 focus:ring-red-500" : ""}`}
            placeholder="Enter your account number"
            maxLength={10}
          />
          {formErrors.accountNumber && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {formErrors.accountNumber}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="bankCode" className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2">
            Bank
          </label>
          <select
            id="bankCode"
            value={formData.bankCode}
            onChange={(e) => handleInputChange("bankCode", e.target.value)}
            className={`input-field ${formErrors.bankCode ? "border-red-500 focus:ring-red-500" : ""}`}
          >
            <option value="">Select your bank</option>
            {banks.map((bank: BankType) => (
              <option key={bank.code} value={bank.code}>
                {bank.name}
              </option>
            ))}
          </select>
          {formErrors.bankCode && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {formErrors.bankCode}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="accountName" className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2">
            Account Name
          </label>
          <div className="relative">
            <input
              type="text"
              id="accountName"
              value={formData.accountName}
              readOnly
              className={`input-field bg-gray-50 dark:bg-gray-800 ${formErrors.accountName ? "border-red-500" : ""}`}
              placeholder="Account name will appear here"
            />
            {isResolving && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <LoadingSpinner size="sm" />
              </div>
            )}
            {formData.accountName && !isResolving && (
              <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
            )}
          </div>
          {formErrors.accountName && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {formErrors.accountName}
            </p>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 btn-secondary py-2.5"
          >
            <ArrowLeft className="h-4 w-4 mr-1 inline" />
            Back
          </button>
          <button
            type="submit"
            disabled={bankLoading.isLoading || transactionLoading.isLoading || isResolving}
            className="flex-1 btn-primary py-2.5"
          >
            {bankLoading.isLoading || transactionLoading.isLoading ? (
              <LoadingSpinner size="sm" text="Processing..." />
            ) : (
              <>
                <Bank className="h-4 w-4 mr-1 inline" />
                Withdraw Funds
              </>
            )}
          </button>
        </div>
      </form>

      <div className="text-center">
        <p className="text-xs text-text-secondary dark:text-text-secondary-dark">
          Funds will be transferred to your bank account within 24 hours
        </p>
      </div>
    </div>
  );
};