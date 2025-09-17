// pages/RulesPage.tsx
import React from 'react';
import { RuleManager } from '../components/rules/RuleManager';

export const RulesPage: React.FC = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-text-primary-dark mb-4">
            Quid Rules Management
          </h1>
          <p className="text-text-secondary dark:text-text-secondary-dark">
            Manage rules for your Quid gifts
          </p>
        </div>
        
        <RuleManager />
      </div>
    </div>
  );
};