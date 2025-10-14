import { useEffect } from "react";
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

const PublicLayout = () => (
	<Layout>
		<RouteSEO />
		<Outlet />
	</Layout>
);

function App() {
	const { initializeTheme } = useThemeStore();

	useEffect(() => {
		initializeTheme();
	}, [initializeTheme]);

	return (
		<Router>
			<div className="App">
				<Routes>
					{/* Public Routes */}
					<Route element={<PublicLayout />}>
						<Route path="/" element={<HomePage />} />
						<Route path="/create" element={<CreateGiftPage />} />
						<Route path="/claim" element={<ClaimGiftPage />} />
						<Route path="/claim/:quid" element={<ClaimGiftPage />} />
						<Route path="/transactions" element={<TransactionsPage />} />
						<Route path="/rules" element={<RulesPage />} />
						<Route
							path="/payment/callback"
							element={<PaymentCallbackPage />}
						/>
						<Route path="/withdraw" element={<WithdrawPage />} />
						<Route path="/help" element={<HelpPage />} />
						<Route path="/privacy" element={<PrivacyPolicyPage />} />
						<Route path="/terms" element={<TermsConditionsPage />} />
						<Route path="/cookies" element={<CookiePolicyPage />} />
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
