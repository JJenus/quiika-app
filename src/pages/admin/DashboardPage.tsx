import React from 'react';

export const DashboardPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Admin Dashboard
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Welcome! Key metrics and system health will be displayed here.
      </p>
    </div>
  );
};
