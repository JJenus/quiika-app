import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Mail, Lock, Eye, EyeOff, Gift } from "lucide-react";
import useAuthStore from "../../stores/useAuthStore";
import { Button } from "../../components/ui/Button";
import { ErrorMessage } from "../../components/ui/ErrorMessage";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export const LoginPage: React.FC = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	const { login, loading, error, clearError, isAuthenticated } =
		useAuthStore();

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/admin/dashboard");
		}
	}, [isAuthenticated, navigate]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		clearError();

		const success = await login(formData.email, formData.password);
		if (success) {
			navigate("/admin/dashboard");
		}
	};

	const handleInputChange = (field: keyof typeof formData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		if (error.hasError) {
			clearError();
		}
	};

	return (
		<div className="min-h-screen bg-surface dark:bg-surface-dark">
			{/* Header with Quiika Branding */}
			<header className="pt-8 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<div className="flex items-center justify-center gap-3 mb-2">
						<Logo />
						<span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
							Quiika
						</span>
					</div>
				</div>
			</header>

			<div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8 animate-fade-in">
					{/* Login Card */}
					<div className="card p-8 md:p-10 backdrop-blur-sm ">
						<div className="text-center mb-8">
							<div className="bg-gradient-to-br from-primary to-secondary p-4 rounded-2xl mx-auto w-fit mb-6 group hover:scale-105 transition-transform duration-300">
								<Shield className="h-12 w-12 text-white group-hover:scale-110 transition-transform duration-300" />
							</div>
							<h2 className="text-3xl font-bold text-text-primary dark:text-text-primary-dark mb-2">
								Admin Portal
							</h2>
							<p className="text-text-secondary dark:text-text-secondary-dark">
								Sign in to manage Quiika
							</p>
						</div>

						{error.hasError && (
							<ErrorMessage
								message={error.message || "Login failed"}
								onDismiss={clearError}
								className="mb-6 animate-slide-up"
							/>
						)}

						<form onSubmit={handleSubmit} className="space-y-6">
							{/* Email Field */}
							<div className="group">
								<label
									htmlFor="email"
									className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2 group-hover:text-primary dark:group-hover:text-gray-500 transition-colors duration-200"
								>
									Email Address
								</label>
								<div className="relative">
									<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5 group-hover:text-primary transition-colors duration-200" />
									<input
										id="email"
										type="email"
										value={formData.email}
										onChange={(e) =>
											handleInputChange(
												"email",
												e.target.value
											)
										}
										className="input-field pl-10 focus:border-primary focus:ring-1 focus:ring-primary dark:focus:border-primary dark:focus:ring-primary transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-600"
										placeholder="admin@quiika.com"
										required
									/>
								</div>
							</div>

							{/* Password Field */}
							<div className="group">
								<label
									htmlFor="password"
									className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2 group-hover:text-primary dark:group-hover:text-gray-500 transition-colors duration-200"
								>
									Password
								</label>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5 group-hover:text-primary transition-colors duration-200" />
									<input
										id="password"
										type={
											showPassword ? "text" : "password"
										}
										value={formData.password}
										onChange={(e) =>
											handleInputChange(
												"password",
												e.target.value
											)
										}
										className="input-field pl-10 pr-10 focus:border-primary focus:ring-1 focus:ring-primary dark:focus:border-primary dark:focus:ring-primary transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-600"
										placeholder="Enter your password"
										required
									/>
									<button
										type="button"
										onClick={() =>
											setShowPassword(!showPassword)
										}
										className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary transition-colors duration-200"
									>
										{showPassword ? (
											<EyeOff className="h-5 w-5" />
										) : (
											<Eye className="h-5 w-5" />
										)}
									</button>
								</div>
							</div>

							{/* Submit Button */}
							<Button
								type="submit"
								loading={loading.isLoading}
								className="w-full py-3 text-base font-semibold mt-8 group hover:scale-105 transition-transform duration-200"
							>
								{loading.isLoading ? (
									"Signing in..."
								) : (
									<span className="flex items-center justify-center">
										Sign In
										<svg
											className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M13 7l5 5m0 0l-5 5m5-5H6"
											/>
										</svg>
									</span>
								)}
							</Button>
						</form>

						{/* Demo Credentials */}
						<div className="mt-8 p-4 bg-primary/5 dark:bg-primary/10 rounded-lg border border-primary/10 dark:border-primary/20">
							<p className="text-xs text-text-secondary dark:text-text-secondary-dark text-center">
								<strong className="text-primary dark:text-primary-light">
									Demo credentials:
								</strong>
								<br />
								admin@quiika.com / admin123
							</p>
						</div>
					</div>

					<div>
						<ThemeToggle />
					</div>

					{/* Footer Links */}
					<div className="text-center">
						<p className="text-sm text-text-secondary dark:text-text-secondary-dark">
							Need help?{" "}
							<a
								href="#"
								className="text-primary hover:text-primary/80 dark:text-primary-light dark:hover:text-primary-light/80 transition-colors duration-200 font-medium"
							>
								Contact Support
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
