import { ReactNode } from 'react';
import { ProtectedRoute } from '../auth/ProtectedRoute';
import { RouteConfig } from '@/types/route-config';

interface RouteRendererProps {
  route: RouteConfig;
}

export const RouteRenderer = ({ route }: RouteRendererProps) => {
  let element: ReactNode = route.element;

  // Apply protection if needed
  if (route.protected) {
    element = (
      <ProtectedRoute>
        {route.element}
      </ProtectedRoute>
    );
  }

  return element;
};