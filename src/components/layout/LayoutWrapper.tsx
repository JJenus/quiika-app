import { ReactNode } from 'react';
import { Layout } from './Layout';
import { AdminLayout } from './admin/AdminLayout';
import { RouteSEO } from '../seo/RouteSEO';

interface LayoutWrapperProps {
  layout: 'public' | 'admin' | 'none';
  children: ReactNode;
  showSEO?: boolean;
}

export const LayoutWrapper = ({ layout, children, showSEO = false }: LayoutWrapperProps) => {
  if (layout === 'none') {
    return <>{children}</>;
  }

  const content = (
    <>
      {showSEO && <RouteSEO />}
      {children}
    </>
  );

  switch (layout) {
    case 'admin':
      return <AdminLayout>{content}</AdminLayout>;
    case 'public':
    default:
      return <Layout>{content}</Layout>;
  }
};