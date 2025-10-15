// components/forms/WithdrawForm.tsx
import React, { useState, useEffect, useRef } from "react";
import {
	Landmark as Bank,
	ArrowLeft,
	CheckCircle,
	ChevronDown,
} from "lucide-react";
import { useBankStore } from "../../stores/useBankStore";
import { useWithdrawalStore } from "../../stores/useWithdrawalStore";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { ErrorMessage } from "../ui/ErrorMessage";
import toast from "react-hot-toast";
import type { Bank as BankType } from "../../types/api";

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
  const [bankSearch, setBankSearch] = useState("");
  const [isBankDropdownOpen, setIsBankDropdownOpen] = useState(false);
  const bankSelectRef = useRef<HTMLDivElement>(null);

  const { banks, resolvedAccount, loading: bankLoading, error: bankError, fetchBanks, resolveAccountName, clearError: clearBankError } = useBankStore();
  const { processWithdrawal, loading: withdrawalLoading, error: withdrawalError, clearError: clearWithdrawalError } = useWithdrawalStore();

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        bankSelectRef.current &&
        !bankSelectRef.current.contains(event.target as Node)
      ) {
        setIsBankDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const resolveAccountDetails = async () => {
    if (formData.accountNumber.length < 10 || !formData.bankCode) return;
    
    // Validate bank code format
    if (!/^[A-Z0-9]{3,10}$/.test(formData.bankCode)) {
      setFormErrors(prev => ({...prev, bankCode: "Invalid bank code format"}));
      return;
    }

    // Validate account number format
    if (!/^\d{10,20}$/.test(formData.accountNumber)) {
      setFormErrors(prev => ({...prev, accountNumber: "Invalid account number format"}));
      return;
    }

    setIsResolving(true);
    try {
      await resolveAccountName(
        formData.accountNumber.slice(0, 20), // Limit length
        formData.bankCode.toUpperCase().slice(0, 10)
      );
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

    // Additional sanitization
    const sanitizedAccountNumber = formData.accountNumber.replace(/\D/g, '');
    const sanitizedBankCode = formData.bankCode.replace(/[^a-zA-Z0-9]/g, '');
    
    if (!sanitizedAccountNumber || sanitizedAccountNumber.length < 10) {
      setFormErrors(prev => ({...prev, accountNumber: "Invalid account number"}));
      return;
    }

    if (!sanitizedBankCode) {
      setFormErrors(prev => ({...prev, bankCode: "Invalid bank code"}));
      return;
    }

    clearBankError();
    clearWithdrawalError();

    try {
      await processWithdrawal({
        quid,
        accessKey,
        amount,
        accountNumber: sanitizedAccountNumber,
        bankCode: sanitizedBankCode,
        accountName: formData.accountName.replace(/[^a-zA-Z\s]/g, '')
      });
      toast.success("Withdrawal request submitted successfully!");
      
      // Reset form after successful submission
      setFormData({ accountNumber: "", bankCode: "", accountName: "" });
    } catch (error: any) {
      console.error("Withdrawal failed:", error);
      toast.error(error.message || "Failed to process withdrawal");
    }
  };

  const handleBankSelect = (bank: BankType) => {
    handleInputChange("bankCode", bank.code);
    setBankSearch(bank.name);
    setIsBankDropdownOpen(false);
  };

  const handleBankSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBankSearch(e.target.value);
    if (formData.bankCode) {
      handleInputChange("bankCode", ""); // Clear selection if user types
    }
    if (!isBankDropdownOpen) {
      setIsBankDropdownOpen(true);
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

  const filteredBanks = banks.filter((bank) =>
    bank.name.toLowerCase().includes(bankSearch.toLowerCase())
  );

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

      {(bankError.hasError || withdrawalError.hasError) && (
        <ErrorMessage
          message={bankError.message || withdrawalError.message || "An error occurred"}
          onDismiss={() => {
            clearBankError();
            clearWithdrawalError();
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
          <div className="relative" ref={bankSelectRef}>
            <input
              type="text"
              id="bankCode"
              value={bankSearch}
              onChange={handleBankSearchChange}
              onFocus={() => setIsBankDropdownOpen(true)}
              className={`input-field pr-10 ${formErrors.bankCode ? "border-red-500 focus:ring-red-500" : ""}`}
              placeholder="Search and select your bank"
              autoComplete="off"
            />
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />

            {isBankDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-y-auto">
                <ul className="py-1">
                  {filteredBanks.length > 0 ? (
                    filteredBanks.map((bank: BankType) => (
                      <li
                        key={bank.code}
                        onClick={() => handleBankSelect(bank)}
                        className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        {bank.name}
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-sm text-gray-500">
                      No banks found
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
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
            disabled={bankLoading.isLoading || withdrawalLoading.isLoading || isResolving}
            className="flex-1 btn-primary py-2.5"
          >
            {bankLoading.isLoading || withdrawalLoading.isLoading ? (
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
