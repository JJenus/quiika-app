import React from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";

interface AdminLayoutProps {
  children?: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background dark:bg-background-dark transition-colors duration-300">
      <div className="flex">
        <Sidebar />

        <div className="flex-1 min-w-0">
          <Header />

          <main className="p-4 md:p-6">
            {children || <Outlet />} {/* Support both patterns */}
          </main>
        </div>
      </div>
    </div>
  );
};