import { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	Outlet,
} from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { CreateGiftPage } from "./pages/CreateGiftPage";
import { ClaimGiftPage } from "./pages/ClaimGiftPage";
import { TransactionsPage } from "./pages/TransactionsPage";
import { PaymentCallbackPage } from "./pages/PaymentCallbackPage";
import { WithdrawPage } from "./pages/WithdrawPage";
import { useThemeStore } from "./stores/useThemeStore";
import { HelpPage } from "./pages/HelpPage";
import { Toaster } from "react-hot-toast";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";

import { RulesPage } from "./pages/RulesPage";
import { TermsConditionsPage } from "./pages/TermsConditionsPage";
import { CookiePolicyPage } from "./pages/CookiePolicyPage";
import { RouteSEO } from "./components/seo/RouteSEO";
import { LoginPage } from "./pages/admin/LoginPage";
import { DashboardPage } from "./pages/admin/DashboardPage";
import { FinancialPage } from "./pages/admin/FinancialPage";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { AdminLayout } from "./components/layout/admin/AdminLayout";
import { ComingSoon } from "./pages/admin/ComingSoon";
import { QuidManagementPage } from "./pages/admin/QuidManagementPage";
import { UserManagementPage } from "./pages/admin/UserManagementPage";
import { TransactionManagementPage } from "./pages/admin/TransactionManagementPage";
import { RulesEnginePage } from "./pages/admin/RulesEnginePage";
import { WithdrawalsPage } from "./pages/admin/WithdrawalsPage";

import useAuthStore from "./stores/useAuthStore";
import { initializeApiKeyManager } from "./utils/apiKeyManager";

const PublicLayout = () => (
	<Layout>
		<RouteSEO />
		<Outlet />
	</Layout>
);

function App() {
	const { initializeTheme } = useThemeStore();
	const { initializeAuth } = useAuthStore();
	const initialize = async () => {
		// Initialize API key
		await initializeApiKeyManager();
	};

	useEffect(() => {
		initialize();
		initializeTheme();
		initializeAuth();
	}, [initializeTheme, initializeAuth]);

	return (
		<Router>
			<div className="App">
				<Routes>
					{/* Public Routes */}
					<Route element={<PublicLayout />}>
						<Route path="/" element={<HomePage />} />
						<Route path="/create" element={<CreateGiftPage />} />
						<Route path="/claim" element={<ClaimGiftPage />} />
						<Route
							path="/claim/:quid"
							element={<ClaimGiftPage />}
						/>
						<Route
							path="/transactions"
							element={<TransactionsPage />}
						/>
						<Route path="/rules" element={<RulesPage />} />
						<Route
							path="/payment/callback"
							element={<PaymentCallbackPage />}
						/>
						<Route path="/withdraw" element={<WithdrawPage />} />
						<Route path="/help" element={<HelpPage />} />
						<Route
							path="/privacy"
							element={<PrivacyPolicyPage />}
						/>
						<Route
							path="/terms"
							element={<TermsConditionsPage />}
						/>
						<Route path="/cookies" element={<CookiePolicyPage />} />
					</Route>

					{/* Admin Login Route */}
					<Route path="/admin/login" element={<LoginPage />} />

					{/* Protected Admin Routes */}
					<Route path="/admin" element={<AdminLayout />}>
						<Route element={<ProtectedRoute />}>
							<Route
								path="dashboard"
								element={<DashboardPage />}
							/>
							<Route
								path="financial"
								element={<FinancialPage />}
							/>
							<Route
								path="quids"
								element={<QuidManagementPage />}
							/>
							<Route
								path="transactions"
								element={<TransactionManagementPage />}
							/>
							<Route
								path="withdrawals"
								element={<WithdrawalsPage />}
							/>
							<Route path="rules" element={<RulesEnginePage />} />
							<Route
								element={
									<ProtectedRoute
										requiredRoles={["SUPER_ADMIN", "ADMIN"]}
									/>
								}
							>
								<Route
									path="users"
									element={<UserManagementPage />}
								/>
								<Route
									path="invite-user"
									element={<ComingSoon />}
								/>
							</Route>
							<Route path="workload" element={<ComingSoon />} />
							<Route path="reports" element={<ComingSoon />} />
						</Route>
						<Route
							path="*"
							element={<Navigate to="/admin/dashboard" replace />}
						/>
					</Route>

					{/* Redirect any unknown routes to home */}
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
				<Toaster
					position="top-right"
					toastOptions={{
						duration: 4000,
						style: {
							background: "#363636",
							color: "#fff",
						},
						success: {
							duration: 3000,
							iconTheme: {
								primary: "#10B981",
								secondary: "#fff",
							},
						},
						error: {
							duration: 5000,
							iconTheme: {
								primary: "#EF4444",
								secondary: "#fff",
							},
						},
					}}
				/>
			</div>
		</Router>
	);
}

export default App;
