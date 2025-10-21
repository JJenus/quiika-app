import React, { useEffect, useState } from "react";
import {
	Users,
	UserPlus,
	Shield,
	Mail,
	Calendar,
	MoreVertical,
	Edit,
	Trash2,
	CheckCircle,
	XCircle,
} from "lucide-react";
import { useAdminStore } from "../../stores/useAdminStore";
import useAuthStore from "../../stores/useAuthStore";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { ErrorMessage } from "../../components/ui/ErrorMessage";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";

export const UserManagementPage: React.FC = () => {
	const {
		users,
		fetchUsers,
		inviteUser,
		updateUserRole,
		deactivateUser,
		loading,
		error,
		clearError,
	} = useAdminStore();

	const { user: currentUser } = useAuthStore();

	const [showInviteModal, setShowInviteModal] = useState(false);
	const [inviteForm, setInviteForm] = useState({
		email: "",
		role: "SUPPORT" as "SUPER_ADMIN" | "ADMIN" | "SUPPORT",
	});
	const [selectedUser, setSelectedUser] = useState<string | null>(null);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	const handleInviteUser = async (e: React.FormEvent) => {
		e.preventDefault();
		const success = await inviteUser(inviteForm.email, inviteForm.role);
		if (success) {
			setShowInviteModal(false);
			setInviteForm({ email: "", role: "SUPPORT" });
		}
	};

	const handleRoleChange = async (
		userId: string,
		newRole: "SUPER_ADMIN" | "ADMIN" | "SUPPORT"
	) => {
		await updateUserRole(userId, newRole);
	};

	const handleDeactivateUser = async (userId: string) => {
		if (confirm("Are you sure you want to deactivate this user?")) {
			await deactivateUser(userId);
		}
	};

	const getRoleBadgeColor = (role: string) => {
		switch (role) {
			case "SUPER_ADMIN":
				return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
			case "ADMIN":
				return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
			case "SUPPORT":
				return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
			default:
				return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
		}
	};

	const canManageUser = (targetUser: any) => {
		if (!currentUser) return false;
		if (currentUser.role === "SUPER_ADMIN") return true;
		if (currentUser.role === "ADMIN" && targetUser.role === "SUPPORT")
			return true;
		return false;
	};

	if (loading.isLoading && users.length === 0) {
		return (
			<div className="flex items-center justify-center h-64">
				<LoadingSpinner size="lg" text={loading.message} />
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold text-text-primary dark:text-text-primary-dark">
						User Management
					</h1>
					<p className="text-text-secondary dark:text-text-secondary-dark mt-1">
						Manage admin users and their permissions
					</p>
				</div>

				{(currentUser?.role === "SUPER_ADMIN" ||
					currentUser?.role === "ADMIN") && (
					<Button onClick={() => setShowInviteModal(true)}>
						<UserPlus className="h-4 w-4 mr-2" />
						Invite User
					</Button>
				)}
			</div>

			{error.hasError && (
				<ErrorMessage
					message={error.message || "Failed to load users"}
					onRetry={fetchUsers}
					onDismiss={clearError}
				/>
			)}

			{/* Users Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{users.map((user) => (
					<Card
						key={user.id}
						className="p-6 hover:shadow-moderate transition-all duration-200"
					>
						<div className="flex items-start justify-between mb-4">
							<div className="flex items-center space-x-3">
								<div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
									<span className="text-white font-semibold text-sm">
										{user.firstName[0]}
										{user.lastName[0]}
									</span>
								</div>
								<div>
									<h3 className="font-semibold text-text-primary dark:text-text-primary-dark">
										{user.firstName} {user.lastName}
									</h3>
									<p className="text-sm text-text-secondary dark:text-text-secondary-dark">
										{user.email}
									</p>
								</div>
							</div>

							{canManageUser(user) && (
								<div className="relative">
									<button
										onClick={() =>
											setSelectedUser(
												selectedUser === user.id
													? null
													: user.id
											)
										}
										className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
									>
										<MoreVertical className="h-4 w-4" />
									</button>

									{selectedUser === user.id && (
										<div className="absolute right-0 top-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-10 min-w-[150px]">
											<button
												onClick={() => {
													// Handle edit user
													setSelectedUser(null);
												}}
												className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
											>
												<Edit className="h-4 w-4 mr-2" />
												Edit User
											</button>
											<button
												onClick={() => {
													handleDeactivateUser(
														user.id
													);
													setSelectedUser(null);
												}}
												className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center text-error"
											>
												<Trash2 className="h-4 w-4 mr-2" />
												Deactivate
											</button>
										</div>
									)}
								</div>
							)}
						</div>

						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<span className="text-sm text-text-secondary dark:text-text-secondary-dark">
									Role
								</span>
								<select
									value={user.role}
									onChange={(e) =>
										handleRoleChange(
											user.id,
											e.target.value as any
										)
									}
									disabled={
										!canManageUser(user) ||
										loading.isLoading
									}
									className={`text-xs px-2 py-1 rounded-full font-medium ${getRoleBadgeColor(
										user.role
									)} ${
										canManageUser(user)
											? "cursor-pointer"
											: "cursor-not-allowed"
									}`}
								>
									<option value="SUPPORT">Support</option>
									<option value="ADMIN">Admin</option>
									{currentUser?.role === "SUPER_ADMIN" && (
										<option value="SUPER_ADMIN">
											Super Admin
										</option>
									)}
								</select>
							</div>

							<div className="flex items-center justify-between">
								<span className="text-sm text-text-secondary dark:text-text-secondary-dark">
									Status
								</span>
								<div className="flex items-center">
									{user.isActive ? (
										<CheckCircle className="h-4 w-4 text-success mr-1" />
									) : (
										<XCircle className="h-4 w-4 text-error mr-1" />
									)}
									<span
										className={`text-xs font-medium ${
											user.isActive
												? "text-success"
												: "text-error"
										}`}
									>
										{user.isActive ? "Active" : "Inactive"}
									</span>
								</div>
							</div>

							<div className="flex items-center justify-between">
								<span className="text-sm text-text-secondary dark:text-text-secondary-dark">
									Last Login
								</span>
								<span className="text-xs text-text-secondary dark:text-text-secondary-dark">
									{user.lastLogin
										? new Date(
												user.lastLogin
										  ).toLocaleDateString()
										: "Never"}
								</span>
							</div>

							<div className="flex items-center justify-between">
								<span className="text-sm text-text-secondary dark:text-text-secondary-dark">
									Joined
								</span>
								<span className="text-xs text-text-secondary dark:text-text-secondary-dark">
									{new Date(
										user.createdAt
									).toLocaleDateString()}
								</span>
							</div>
						</div>
					</Card>
				))}
			</div>

			{/* Invite User Modal */}
			<Modal
				isOpen={showInviteModal}
				onClose={() => setShowInviteModal(false)}
				title="Invite New User"
				size="md"
			>
				<form onSubmit={handleInviteUser} className="space-y-6">
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2"
						>
							Email Address
						</label>
						<div className="relative">
							<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
							<input
								id="email"
								type="email"
								value={inviteForm.email}
								onChange={(e) =>
									setInviteForm((prev) => ({
										...prev,
										email: e.target.value,
									}))
								}
								className="input-field pl-10"
								placeholder="user@example.com"
								required
							/>
						</div>
					</div>

					<div>
						<label
							htmlFor="role"
							className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2"
						>
							Role
						</label>
						<div className="relative">
							<Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
							<select
								id="role"
								value={inviteForm.role}
								onChange={(e) =>
									setInviteForm((prev) => ({
										...prev,
										role: e.target.value as any,
									}))
								}
								className="input-field pl-10"
								required
							>
								<option value="SUPPORT">Support</option>
								<option value="ADMIN">Admin</option>
								{currentUser?.role === "SUPER_ADMIN" && (
									<option value="SUPER_ADMIN">
										Super Admin
									</option>
								)}
							</select>
						</div>
					</div>

					<div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
						<h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
							Role Permissions:
						</h4>
						<ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
							{inviteForm.role === "SUPPORT" && (
								<>
									<li>• View transactions and withdrawals</li>
									<li>• Assist with customer inquiries</li>
									<li>• Limited access to sensitive data</li>
								</>
							)}
							{inviteForm.role === "ADMIN" && (
								<>
									<li>
										• Full transaction and withdrawal
										management
									</li>
									<li>
										• User management (Support users only)
									</li>
									<li>• Financial reporting and analytics</li>
								</>
							)}
							{inviteForm.role === "SUPER_ADMIN" && (
								<>
									<li>• Complete system access</li>
									<li>• Manage all user roles</li>
									<li>• System configuration and settings</li>
								</>
							)}
						</ul>
					</div>

					<div className="flex gap-3 pt-4">
						<Button
							type="button"
							variant="outline"
							onClick={() => setShowInviteModal(false)}
							className="flex-1"
						>
							Cancel
						</Button>
						<Button
							type="submit"
							loading={loading.isLoading}
							className="flex-1"
						>
							Send Invitation
						</Button>
					</div>
				</form>
			</Modal>
		</div>
	);
};
