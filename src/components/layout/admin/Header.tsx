import React from "react";
import { Menu, Bell, User } from "lucide-react";
import { useUIStore } from "../../../stores/uiStore";
import { Logo } from "../../ui/Logo";
import { ThemeToggle } from "../../ui/ThemeToggle";

export const Header: React.FC = () => {
	const {
		sidebarOpen,
		toasts,
		currentPage,
		setSidebarOpen,
		toggleSidebarCollapsed,
	} = useUIStore();

	const unreadCount = toasts.length;

	return (
		<header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between">
			<div className="flex items-center gap-4">
				<button
					onClick={() => setSidebarOpen(!sidebarOpen)}
					className="p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
				>
					<Menu />
				</button>

				{/* Desktop collapse button */}
				<button
					onClick={toggleSidebarCollapsed}
					className="hidden md:block p-3 hover:bg-gray-100 rounded-lg transition-colors"
				>
					<Menu className="h-5 w-5" />
				</button>

				<div className="flex items-center gap-3">
					{/* <Logo /> */}
					<div>
						<h1 className="text-xl font-semibold text-gray-900">
							{currentPage}
						</h1>
						<p className="text-sm text-gray-500">Manage Quiika</p>
					</div>
				</div>
			</div>

			<div className="flex items-center gap-3">
				<ThemeToggle />
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
						Admin
					</span>
				</div>
			</div>
		</header>
	);
};
