import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};
