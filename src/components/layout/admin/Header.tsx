// @/components/layout/admin/Header
import React from "react";
import { Menu, Bell, User } from "lucide-react";
import { useUIStore } from "../../../stores/uiStore";
import useAuthStore from "../../../stores/useAuthStore";
import { ThemeToggle } from "../../ui/ThemeToggle";
import { Button } from "../../ui/Button";

export const Header: React.FC = () => {
	const {
		sidebarOpen,
		toasts,
		currentPage,
		setSidebarOpen,
		toggleSidebarCollapsed,
	} = useUIStore();
	const { user } = useAuthStore();

	const unreadCount = toasts.length;

	return (
		<header className="bg-surface dark:bg-surface-dark border-b border-gray-200 dark:border-gray-700 backdrop-blur-md bg-opacity-95 dark:bg-opacity-95 sticky top-0 z-50 shadow-sm px-4 py-3 flex items-center justify-between">
			<div className="flex items-center gap-4">
				<Button
					variant="ghost"
					onClick={() => setSidebarOpen(!sidebarOpen)}
					className="p-2 hover:bg-gray-100 px-2 py-2 rounded-lg transition-colors md:hidden"
				>
					<Menu />
				</Button>

				{/* Desktop collapse button */}
				<Button
					variant="ghost"
					onClick={toggleSidebarCollapsed}
					className="hidden md:block px-2 py-3 rounded-lg"
				>
					<Menu className="h-5 w-5" />
				</Button>

				<div className="flex items-center gap-3">
					{/* <Logo /> */}
					<div>
						<h1 className="text-xl font-semibold text-text-primary dark:text-text-primary-dark">
							{currentPage}
						</h1>
						<p className="text-sm text-text-secondary dark:text-text-secondary-dark">
							Manage Quiika
						</p>
					</div>
				</div>
			</div>

			<div className="flex items-center gap-3">
				<ThemeToggle switchOnMobile={true} />
				<button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
					<Bell className="h-5 w-5 text-gray-600" />
					{unreadCount > 0 && (
						<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
							{unreadCount}
						</span>
					)}
				</button>

				<div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
					<div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
						<User className="h-4 w-4 text-white" />
					</div>
					<span className="text-sm font-medium text-gray-700 hidden sm:block">
						{user?.firstName || 'Admin'}
					</span>
				</div>
			</div>
		</header>
	);
};
