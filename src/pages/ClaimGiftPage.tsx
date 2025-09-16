import React from 'react';
import { ClaimGiftForm } from '../components/forms/ClaimGiftForm';

export const ClaimGiftPage: React.FC = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-text-primary-dark mb-4">
            Claim Your Gift
          </h1>
          <p className="text-text-secondary dark:text-text-secondary-dark">
            Enter your gift code (QUID) to claim your money
          </p>
        </div>
        
        <ClaimGiftForm />
      </div>
    </div>
  );
};