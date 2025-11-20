import { RouteConfig } from "@/types/route-config";

// Admin pages
import { LoginPage } from '@/pages/admin/LoginPage';
import { DashboardPage } from '@/pages/admin/DashboardPage';
import { FinancialPage } from '@/pages/admin/FinancialPage';
import { QuidManagementPage } from '@/pages/admin/QuidManagementPage';
import { TransactionManagementPage } from '@/pages/admin/TransactionManagementPage';
import { WithdrawalsPage } from '@/pages/admin/WithdrawalsPage';
import { RulesEnginePage } from '@/pages/admin/RulesEnginePage';
import { UserManagementPage } from '@/pages/admin/UserManagementPage';
import { ComingSoon } from '@/pages/admin/ComingSoon';

// Admin routes configuration
export const adminRoutes: RouteConfig[] = [
    {
      path: '/admin/login',
      element: <LoginPage />,
      layout: 'none',
    },
    {
      path: '/admin/dashboard',
      element: <DashboardPage />,
      layout: 'admin',
      protected: true,
    },
    {
      path: '/admin/financial',
      element: <FinancialPage />,
      layout: 'admin',
      protected: true,
    },
    {
      path: '/admin/quids',
      element: <QuidManagementPage />,
      layout: 'admin',
      protected: true,
    },
    {
      path: '/admin/transactions',
      element: <TransactionManagementPage />,
      layout: 'admin',
      protected: true,
    },
    {
      path: '/admin/withdrawals',
      element: <WithdrawalsPage />,
      layout: 'admin',
      protected: true,
    },
    {
      path: '/admin/rules',
      element: <RulesEnginePage />,
      layout: 'admin',
      protected: true,
    },
    {
      path: '/admin/users',
      element: <UserManagementPage />,
      layout: 'admin',
      protected: true,
      requiredRoles: ['MODERATOR', 'ADMIN'],
    },
    {
      path: '/admin/invite-user',
      element: <ComingSoon />,
      layout: 'admin',
      protected: true,
      requiredRoles: ['MODERATOR', 'ADMIN'],
    },
    {
      path: '/admin/workload',
      element: <ComingSoon />,
      layout: 'admin',
      protected: true,
    },
    {
      path: '/admin/reports',
      element: <ComingSoon />,
      layout: 'admin',
      protected: true,
    },
  ];