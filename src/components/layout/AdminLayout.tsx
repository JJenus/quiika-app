import React from 'react';
import { Outlet } from 'react-router-dom';

export const AdminLayout: React.FC = () => {
  // A basic layout for the admin section.
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-white dark:bg-gray-800 shadow-lg">
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Admin Panel</h2>
          <nav className="mt-6">
            {/* Navigation links will be added here */}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-gray-800 shadow-md p-4">
          {/* Header content like user menu, notifications */}
          <div className="flex justify-end">
            <span className="text-gray-700 dark:text-gray-300">User Menu</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
