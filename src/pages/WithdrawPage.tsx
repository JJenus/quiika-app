import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { WithdrawForm } from '../components/forms/WithdrawForm';
import { withdrawalAPI } from '../lib/api';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import type { WithdrawForm as WithdrawFormType } from '../types/api';

export const WithdrawPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);

  const quid = searchParams.get('quid');
  const amount = parseFloat(searchParams.get('amount') || '0');

  const handleWithdraw = async (formData: WithdrawFormType) => {
    if (!quid) {
      setError('Missing gift code (QUID)');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const withdrawalRequest = {
        quid,
        accountNumber: formData.accountNumber,
        bankCode: formData.bankCode,
        amount: Math.round(formData.amount * 100), // Convert to kobo/pesewas
        // These will be resolved by the backend or set by the form
        accountName: '',
        bank: '',
        reference: `withdraw_${Date.now()}`,
        currency: 'NGN' as const, // Default, should be determined by backend
        status: 'PENDING' as const,
        accessKey: '',
        transaction: {} as any, // Will be populated by backend
        id: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await withdrawalAPI.initiateRequest(withdrawalRequest);
      setSuccess(true);
      
      // Redirect to success page after a delay
      setTimeout(() => {
        navigate('/transactions');
      }, 3000);

    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Withdrawal failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (!quid || !amount) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-2xl mx-auto">
          <div className="card p-8 text-center">
            <h1 className="text-2xl font-bold text-error mb-4">Invalid Request</h1>
            <p className="text-text-secondary dark:text-text-secondary-dark mb-6">
              Missing gift information. Please make sure you have a valid gift to withdraw from.
            </p>
            <button
              onClick={() => navigate('/claim')}
              className="btn-primary px-6 py-3"
            >
              Go to Claim Gift
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-2xl mx-auto">
          <div className="card p-8 text-center">
            <div className="bg-success/10 p-4 rounded-xl mx-auto w-fit mb-6">
              <CheckCircle className="h-12 w-12 text-success" />
            </div>
            
            <h1 className="text-2xl font-bold text-text-primary dark:text-text-primary-dark mb-4">
              Withdrawal Successful! 🎉
            </h1>
            
            <p className="text-text-secondary dark:text-text-secondary-dark mb-6">
              Your withdrawal request has been processed successfully. 
              The money should arrive in your account within a few minutes.
            </p>
            
            <div className="bg-success/10 p-4 rounded-lg mb-6">
              <p className="text-lg font-semibold text-success">
                Amount: ${amount.toFixed(2)}
              </p>
            </div>
            
            <LoadingSpinner size="sm" text="Redirecting to transactions..." />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-text-primary-dark mb-4">
            Withdraw Your Gift
          </h1>
          <p className="text-text-secondary dark:text-text-secondary-dark">
            Enter your bank details to receive your gift money
          </p>
        </div>

        {error && (
          <ErrorMessage 
            message={error} 
            onDismiss={() => setError('')}
            className="mb-6"
          />
        )}
        
        <WithdrawForm 
          amount={amount}
          onSubmit={handleWithdraw}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};