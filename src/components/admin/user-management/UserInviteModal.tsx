import React, { useState } from 'react';
import { Modal } from '../../ui/Modal';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Mail, Shield, UserPlus } from 'lucide-react';

interface UserInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (email: string, role: string) => Promise<boolean>;
  loading?: boolean;
  currentUserRole?: string;
}

export const UserInviteModal: React.FC<UserInviteModalProps> = ({
  isOpen,
  onClose,
  onInvite,
  loading = false,
  currentUserRole
}) => {
  const [form, setForm] = useState({
    email: '',
    role: 'SUPPORT' as 'SUPER_ADMIN' | 'ADMIN' | 'SUPPORT',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onInvite(form.email, form.role);
    if (success) {
      setForm({ email: '', role: 'SUPPORT' });
      onClose();
    }
  };

  const getRolePermissions = (role: string) => {
    const permissions = {
      SUPPORT: [
        'View transactions and withdrawals',
        'Assist with customer inquiries',
        'Limited access to sensitive data',
      ],
      ADMIN: [
        'Full transaction and withdrawal management',
        'User management (Support users only)',
        'Financial reporting and analytics',
      ],
      SUPER_ADMIN: [
        'Complete system access',
        'Manage all user roles',
        'System configuration and settings',
      ],
    };
    return permissions[role as keyof typeof permissions] || permissions.SUPPORT;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Invite New User"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
              className="pl-10"
              placeholder="user@example.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2">
            Role
          </label>
          <div className="relative">
            <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={form.role}
              onChange={(e) => setForm(prev => ({ ...prev, role: e.target.value as any }))}
              className="input-field pl-10 w-full"
              required
            >
              <option value="SUPPORT">Support</option>
              <option value="ADMIN">Admin</option>
              {currentUserRole === 'SUPER_ADMIN' && (
                <option value="SUPER_ADMIN">Super Admin</option>
              )}
            </select>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Role Permissions
          </h4>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            {getRolePermissions(form.role).map((permission, index) => (
              <li key={index}>• {permission}</li>
            ))}
          </ul>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={loading}
            className="flex-1"
          >
            Send Invitation
          </Button>
        </div>
      </form>
    </Modal>
  );
};