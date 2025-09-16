import React from 'react';
import { CreateGiftForm } from '../components/forms/CreateGiftForm';

export const CreateGiftPage: React.FC = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-text-primary-dark mb-4">
            Create a New Gift
          </h1>
          <p className="text-text-secondary dark:text-text-secondary-dark">
            Send money as a gift with custom rules and secure payment processing
          </p>
        </div>
        
        <CreateGiftForm />
      </div>
    </div>
  );
};