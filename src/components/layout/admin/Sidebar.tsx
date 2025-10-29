import React from "react";
import {
	ChartBar as BarChart3,
	FileDown,
	RefreshCw,
	LayoutDashboard,
	UserPlus,
	ChevronLeft,
	ChevronRight,
	DoorOpen,
	Gift,
	Banknote,
	Users,
	Gavel,
	DollarSign,
} from "lucide-react";
import { useUIStore } from "../../../stores/uiStore";
import useAuthStore from "../../../stores/useAuthStore";
import { Logo } from "../../ui/Logo";
import { Button } from "../../ui/Button";
import { Link } from "react-router-dom";

const menuItems = [
	{ id: "/admin/dashboard", label: "Dashboard", icon:  LayoutDashboard},
	{ id: "/admin/financial", label: "Financial", icon: DollarSign },
	{ id: "/admin/quids", label: "QUID Management", icon: Gift },
	{ id: "/admin/transactions", label: "Transactions", icon: RefreshCw },
	{ id: "/admin/withdrawals", label: "Withdrawals", icon: Banknote },
	// { id: "/admin/rules", label: "Rules Engine", icon: Gavel },
	{
		id: "/admin/users",
		label: "User Management",
		icon: Users,
		roles: ["SUPER_ADMIN", "ADMIN"],
	},
	// {
	// 	id: "/admin/invite-user",
	// 	label: "Invite User",
	// 	icon: UserPlus,
	// 	roles: ["SUPER_ADMIN", "ADMIN"],
	// },
	{ id: "/admin/reports", label: "Reports", icon: FileDown },
];

export const Sidebar: React.FC = () => {
	const {
		sidebarOpen,
		sidebarCollapsed,
		currentPage,
		setCurrentPage,
		toggleSidebarCollapsed,
		setSidebarOpen,
	} = useUIStore();
	const { user, logout } = useAuthStore();

	const handleLogout = () => {
		logout();
	};

	const canAccessMenuItem = (item: any) => {
		if (!item.roles) return true;
		if (!user) return false;
		return item.roles.includes(user.role);
	};

	return (
		<>
			{/* Mobile backdrop */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 bg-opacity-50 bg-primary z-50 md:hidden"
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<div
				className={` bg-surface dark:bg-surface-dark backdrop-blur-md bg-opacity-95 dark:bg-opacity-95
        fixed left-0 top-0 h-screen shadow-lg transform transition-all duration-300 ease-in-out z-50
        md:sticky md:top-0 md:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        ${sidebarCollapsed ? "w-16" : "w-64"}
      `}
			>
				<div
					className={`p-4 lg:border-b border-gray-200 dark:border-gray-700 ${
						sidebarCollapsed && "px-6"
					}`}
				>
					<div
						className={`flex items-center ${
							sidebarCollapsed && "justify-center"
						}`}
					>
						{!sidebarCollapsed ? (
							<div className="flex items-center gap-3">
								<Logo />
								<div>
									<h2 className="font-bold text-lg text-text-primary dark:text-text-primary-dark">
										Quiika
									</h2>
									<p className="text-xs text-text-secondary dark:text-text-secondary-dark">
										Admin
									</p>
								</div>
							</div>
						) : (
							<div className="pb-1">
								<Logo />
							</div>
						)}
					</div>
				</div>

				<nav className="p-3 space-y-1">
					{menuItems.filter(canAccessMenuItem).map((item) => {
						const Icon = item.icon;
						const isActive = currentPage === item.label;

						return (
							<Link
								to={item.id}
								key={item.id}
								onClick={() => {
									setCurrentPage(item.label);
									setSidebarOpen(false);
								}}
								className={`
                  w-full flex items-center rounded-lg text-left transition-colors group
                  ${
						isActive
							? "bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-700 border border-blue-200 dark:text-text-primary-dark dark:gradient-bg dark:border-secondary"
							: "text-gray-600 dark:text-text-secondary-dark hover:bg-gray-50 dark:hover:bg-secondary/5 hover:text-gray-900 dark:hover:text-text-primary-dark"
					}
                  ${
						sidebarCollapsed
							? "justify-center p-3"
							: "justify-start gap-3 px-3 py-2.5"
					}
                `}
								title={
									sidebarCollapsed ? item.label : undefined
								}
							>
								<Icon className="h-5 w-5 flex-shrink-0" />
								{!sidebarCollapsed && (
									<span className="font-medium whitespace-nowrap">
										{item.label}
									</span>
								)}
								{sidebarCollapsed && (
									<div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
										{item.label}
									</div>
								)}
							</Link>
						);
					})}
				</nav>

				{/* Collapse/Expand button at bottom */}
				<div className="absolute bottom-4 left-0 right-0 px-3">
					<Button
						variant="ghost"
						onClick={toggleSidebarCollapsed}
						className="hidden md:flex items-center justify-center w-full p-2 rounded-lg"
					>
						{sidebarCollapsed ? (
							<ChevronRight className="h-5 w-5 text-gray-600" />
						) : (
							<ChevronLeft className="h-5 w-5 text-gray-600" />
						)}
						{!sidebarCollapsed && (
							<span className="ml-2 text-sm text-gray-600">
								Collapse
							</span>
						)}
					</Button>
				</div>

				<div className="absolute bottom-16 left-4 right-4">
					<div className="mb-10">
						<Button
							variant="primary"
							onClick={handleLogout}
							className={`
								w-full flex items-center rounded-lg text-left transition-colors group
								${sidebarCollapsed ? "justify-center p-3" : "justify-start gap-3 px-3 py-2.5"}
							`}
							title="logout"
						>
							<DoorOpen className="h-5 w-5 flex-shrink-0" />
							{!sidebarCollapsed && (
								<span className="font-medium whitespace-nowrap">
									Logout
								</span>
							)}
							{sidebarCollapsed && (
								<div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
									Logout
								</div>
							)}
						</Button>
					</div>
					{sidebarOpen && (
						<div className="flex items-center justify-center gap-3">
							<Logo />
							<div>
								<h2 className="font-bold text-lg text-text-primary dark:text-text-primary-dark">
									Quiika
								</h2>
								<p className="text-xs text-text-secondary dark:text-text-secondary-dark">
									Gifting Platform
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};
