import React from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";

export const AdminLayout: React.FC = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
			<div className="flex">
				<Sidebar />

				<div className="flex-1 min-w-0">
					<Header />

					<main className="p-4 md:p-6">
						<Outlet />
					</main>
				</div>
			</div>
		</div>
	);
};
