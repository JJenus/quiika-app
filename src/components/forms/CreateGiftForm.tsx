import React, { useEffect, useState } from "react";
import {
	Gift,
	Mail,
	HandCoins as DollarSign,
	Lock,
	Eye,
	EyeOff,
} from "lucide-react";
import { useTransactionStore } from "../../stores/useTransactionStore";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { ErrorMessage } from "../ui/ErrorMessage";
import type { CreateGiftForm as GiftForm } from "../../types/api";

export const CreateGiftForm: React.FC = () => {
	const [formData, setFormData] = useState<GiftForm>({
		amount: 0,
		email: "",
		isAnonymous: false,
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [formErrors, setFormErrors] = useState<Record<string, string>>({}); 

	const { initializeTransaction, loading, error, clearError } =
		useTransactionStore();

	const validateForm = (): boolean => {
		const errors: Record<string, string> = {};

		if (!formData.amount || formData.amount <= 0) {
			errors.amount = "Please enter a valid amount";
		}

		if (!formData.email) {
			errors.email = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			errors.email = "Please enter a valid email address";
		}

		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) return;

		clearError();

		const response = await initializeTransaction({
			amount: Math.round(formData.amount * 100), // Convert to kobo/pesewas
			email: formData.email,
		});

		const paymentUrl = response?.authorizationUrl;

		if (paymentUrl) {
			console.log("Opening payment")
			window.open(paymentUrl, "_blank");
		}
	};

	const handleInputChange = (field: keyof GiftForm, value: any) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		if (formErrors[field]) {
			setFormErrors((prev) => ({ ...prev, [field]: "" }));
		}
	};

	return (
		<>
			<div className="card p-6 max-w-md mx-auto">
				<div className="text-center mb-6">
					<div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-xl mx-auto w-fit mb-3">
						<Gift className="h-8 w-8 text-white" />
					</div>
					<h2 className="text-2xl font-bold text-text-primary dark:text-text-primary-dark mb-2">
						Create a Gift
					</h2>
					<p className="text-text-secondary dark:text-text-secondary-dark">
						Send money as a gift with custom rules and conditions
					</p>
				</div>

				{error.hasError && (
					<ErrorMessage
						message={error.message || "Something went wrong"}
						onDismiss={clearError}
						className="mb-6"
					/>
				)}

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label
							htmlFor="amount"
							className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2"
						>
							Amount
						</label>
						<div className="relative">
							<DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
							<input
								type="number"
								id="amount"
								min="1"
								step="0.01"
								value={formData.amount || ""}
								onChange={(e) =>
									handleInputChange(
										"amount",
										parseFloat(e.target.value) || 0
									)
								}
								className={`input-field pl-10 ${
									formErrors.amount
										? "border-red-500 focus:ring-red-500"
										: ""
								}`}
								placeholder="Enter amount"
							/>
						</div>
						{formErrors.amount && (
							<p className="mt-1 text-sm text-red-600 dark:text-red-400">
								{formErrors.amount}
							</p>
						)}
					</div>

					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2"
						>
							Recipient Email
						</label>
						<div className="relative">
							<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
							<input
								type="email"
								id="email"
								value={formData.email}
								onChange={(e) =>
									handleInputChange("email", e.target.value)
								}
								className={`input-field pl-10 ${
									formErrors.email
										? "border-red-500 focus:ring-red-500"
										: ""
								}`}
								placeholder="recipient@example.com"
							/>
						</div>
						{formErrors.email && (
							<p className="mt-1 text-sm text-red-600 dark:text-red-400">
								{formErrors.email}
							</p>
						)}
					</div>

					<div className="flex items-center">
						<input
							type="checkbox"
							id="anonymous"
							checked={formData.isAnonymous}
							onChange={(e) =>
								handleInputChange(
									"isAnonymous",
									e.target.checked
								)
							}
							className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
						/>
						<label
							htmlFor="anonymous"
							className="ml-2 text-sm text-text-primary dark:text-text-primary-dark"
						>
							Send anonymously
						</label>
					</div>

					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2"
						>
							Protection Password (Optional)
						</label>
						<div className="relative">
							<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
							<input
								type={showPassword ? "text" : "password"}
								id="password"
								value={formData.password}
								onChange={(e) =>
									handleInputChange(
										"password",
										e.target.value
									)
								}
								className="input-field pl-10 pr-10"
								placeholder="Optional protection password"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
							>
								{showPassword ? (
									<EyeOff className="h-5 w-5" />
								) : (
									<Eye className="h-5 w-5" />
								)}
							</button>
						</div>
						<p className="mt-1 text-xs text-text-secondary dark:text-text-secondary-dark">
							Add a password to protect your gift from
							unauthorized claims
						</p>
					</div>

					<button
						type="submit"
						disabled={loading.isLoading}
						className="w-full btn-primary py-3 text-base font-semibold"
					>
						{loading.isLoading ? (
							<LoadingSpinner
								size="sm"
								text="Initializing Payment..."
							/>
						) : (
							"Create Gift & Pay"
						)}
					</button>
				</form>

				<div className="mt-6 text-center">
					<p className="text-xs text-text-secondary dark:text-text-secondary-dark">
						You'll be redirected to Paystack to complete the payment
					</p>
				</div>
			</div>
		</>
	);
};
