import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface ProtectedRouteProps {
  requiredRoles?: Array<'SUPER_ADMIN' | 'ADMIN' | 'SUPPORT'>;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  requiredRoles = ['SUPER_ADMIN', 'ADMIN', 'SUPPORT'] 
}) => {
  const { isAuthenticated, user, loading } = useAuthStore();

  if (loading.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Authenticating..." />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!requiredRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-error mb-4">Access Denied</h1>
          <p className="text-text-secondary dark:text-text-secondary-dark">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return <Outlet />;
};