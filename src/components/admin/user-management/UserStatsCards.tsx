import React from 'react';
import { useAdminStore } from '../../../stores/useAdminStore';
import { Users, UserPlus, Shield, UserCheck } from 'lucide-react';
import { Card } from '../../ui/Card';
import { getColorClasses } from '@/utils/statusHelpers';
import { StatCardType } from '@/stores/card';

export const UserStatsCards: React.FC = () => {
  const { users } = useAdminStore();

  const stats = React.useMemo(() => {
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.isActive).length;
    const superAdmins = users.filter(u => u.role === 'SUPER_ADMIN').length;
    const admins = users.filter(u => u.role === 'ADMIN').length;
    const supportUsers = users.filter(u => u.role === 'SUPPORT').length;
    const pendingInvites = users.filter(u => !u.isActive).length;

    return {
      totalUsers,
      activeUsers,
      superAdmins,
      admins,
      supportUsers,
      pendingInvites,
    };
  }, [users]);

  const statCards: StatCardType[] = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'blue',
      description: 'All system users',
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: UserCheck,
      color: 'green',
      description: 'Currently active',
    },
    {
      title: 'Pending Invites',
      value: stats.pendingInvites,
      icon: UserPlus,
      color: 'yellow',
      description: 'Awaiting activation',
    },
    {
      title: 'Admin Users',
      value: stats.admins + stats.superAdmins,
      icon: Shield,
      color: 'purple',
      description: 'Admin privileges',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary dark:text-text-secondary-dark mb-1">
                {stat.title}
              </p>
              <p className="text-2xl font-bold text-text-primary dark:text-text-primary-dark">
                {stat.value}
              </p>
              <p className="text-xs text-text-secondary dark:text-text-secondary-dark mt-1">
                {stat.description}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
              <stat.icon className="h-6 w-6" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};