import React, { useState, useRef } from 'react';
import { User, Mail, Phone, Calendar, Download, Camera } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { safeFormatDistanceToNow, safeToLocaleDateString } from '@/utils/dateUtils';

export const ProfileTab: React.FC = () => {
  const { 
    profile, 
    profileActivities, 
    loading, 
    updateProfile, 
    changePassword, 
    updateAvatar,
    downloadPersonalData 
  } = useSettingsStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [profileForm, setProfileForm] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    phone: profile.phone || ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(profileForm);
    setIsEditing(false);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords don't match");
      return;
    }
    await changePassword(passwordForm.currentPassword, passwordForm.newPassword);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateAvatar(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const getStatusColor = (status: string) => {
    return status === 'ACTIVE' ? 'success' : 'error';
  };

  const getRoleColor = (role: string) => {
    const colors: Record<string, 'primary' | 'secondary' | 'warning'> = {
      'SUPER_ADMIN': 'primary',
      'ADMIN': 'secondary',
      'SUPPORT': 'warning'
    };
    return colors[role] || 'secondary';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Profile Settings</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage your personal information and account settings</p>
        </div>
        <Button 
          onClick={() => downloadPersonalData()}
          loading={loading}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Export Data
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Personal Information</h3>
              <Button
                variant={isEditing ? "outline" : "primary"}
                onClick={() => setIsEditing(!isEditing)}
                disabled={loading}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>

            <div className="flex items-start gap-6 mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-semibold">
                  {profile.avatar ? (
                    <img 
                      src={profile.avatar} 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-8 w-8" />
                  )}
                </div>
                <button
                  onClick={triggerFileInput}
                  className="absolute -bottom-1 -right-1 bg-gray-900 text-white p-1.5 rounded-full hover:bg-gray-800 transition-colors"
                >
                  <Camera className="h-3 w-3" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {profile.firstName} {profile.lastName}
                  </h4>
                  <Badge variant={getStatusColor(profile.status)}>
                    {profile.status}
                  </Badge>
                  <Badge variant={getRoleColor(profile.role)}>
                    {profile.role.replace('_', ' ')}
                  </Badge>
                </div>
                <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {profile.email}
                </p>
                {profile.phone && (
                  <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2 mt-1">
                    <Phone className="h-4 w-4" />
                    {profile.phone}
                  </p>
                )}
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Member since {safeToLocaleDateString(profile.createdAt, 'Unknown date')}
                </p>
              </div>
            </div>

            {isEditing ? (
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    value={profileForm.firstName}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, firstName: e.target.value }))}
                    required
                  />
                  <Input
                    label="Last Name"
                    value={profileForm.lastName}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, lastName: e.target.value }))}
                    required
                  />
                </div>
                <Input
                  label="Email"
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
                <Input
                  label="Phone"
                  type="tel"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+2348012345678"
                />
                <div className="flex gap-3 pt-2">
                  <Button type="submit" loading={loading}>
                    Save Changes
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="text-gray-600 dark:text-gray-400">First Name</label>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{profile.firstName}</p>
                </div>
                <div>
                  <label className="text-gray-600 dark:text-gray-400">Last Name</label>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{profile.lastName}</p>
                </div>
                <div>
                  <label className="text-gray-600 dark:text-gray-400">Email</label>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{profile.email}</p>
                </div>
                <div>
                  <label className="text-gray-600 dark:text-gray-400">Phone</label>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{profile.phone || 'Not provided'}</p>
                </div>
              </div>
            )}
          </Card>

          {/* Password Change Card */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Change Password</h3>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                required
              />
              <Input
                label="New Password"
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                required
                minLength={8}
              />
              <Input
                label="Confirm New Password"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                required
              />
              <Button type="submit" loading={loading}>
                Update Password
              </Button>
            </form>
          </Card>
        </div>

        {/* Activity Sidebar */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {profileActivities.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-sm text-gray-900 dark:text-gray-100">{activity.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {safeFormatDistanceToNow(activity.timestamp, 'Some time ago')}
                    </p>
                    {activity.ipAddress && (
                      <p className="text-xs text-gray-500 dark:text-gray-500">IP: {activity.ipAddress}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Account Status */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Account Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Last Login</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {safeFormatDistanceToNow(profile.lastLogin, 'Never')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Password Changed</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {safeFormatDistanceToNow(profile.lastPasswordChange, 'Never')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Account Created</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {safeFormatDistanceToNow(profile.createdAt, 'Unknown')}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};