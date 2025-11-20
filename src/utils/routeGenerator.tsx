import { Route } from 'react-router-dom';
import { RouteRenderer } from '../components/routing/RouteRenderer';
import { LayoutWrapper } from '../components/layout/LayoutWrapper';
import { RouteConfig } from '@/types/route-config';

export const generateRoutes = (routes: RouteConfig[]) => {
  return routes.map((route) => {
    const element = (
      <LayoutWrapper layout={route.layout || 'public'} showSEO={route.seo}>
        <RouteRenderer route={route} />
      </LayoutWrapper>
    );

    return (
      <Route
        key={route.path}
        path={route.path}
        element={element}
      />
    );
  });
};

// Group routes by layout for nested routes
export const generateNestedRoutes = (routes: RouteConfig[]) => {
  const routesByLayout = routes.reduce((acc, route) => {
    const layout = route.layout || 'public';
    if (!acc[layout]) {
      acc[layout] = [];
    }
    acc[layout].push(route);
    return acc;
  }, {} as Record<string, RouteConfig[]>);

  return routesByLayout;
};