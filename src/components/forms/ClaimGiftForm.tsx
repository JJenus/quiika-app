// components/forms/ClaimGiftForm.tsx
import React, { useState } from "react";
import { Search, Lock, Eye, EyeOff, Banknote } from "lucide-react";
import { useQuidStore } from "../../stores/useQuidStore";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { ErrorMessage } from "../ui/ErrorMessage";
import { Button } from "../ui/Button";
import { WithdrawForm } from "./WithdrawForm";
import type { ClaimGiftForm as ClaimForm } from "../../types/api";

export const ClaimGiftForm: React.FC = () => {
	const [formData, setFormData] = useState<ClaimForm>({
		quid: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [formErrors, setFormErrors] = useState<Record<string, string>>({});
	const [showWithdrawal, setShowWithdrawal] = useState(false);

	const {
		verifyQuidClaim,
		loading,
		error,
		clearError,
		claimResponse,
		clearQuid,
	} = useQuidStore();

	const validateForm = (): boolean => {
		const errors: Record<string, string> = {};

		if (!formData.quid) {
			errors.quid = "Gift code (QUID) is required";
		} else if (formData.quid.length !== 13) {
			errors.quid = "QUID must be 13 characters";
		}

		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) return;

		clearError();

		const result = await verifyQuidClaim(formData.quid);

		if (result && result.allowAccess) {
			// Success - show withdrawal form
			console.log("Gift claimed successfully:", result);
		}
	};

	const handleInputChange = (field: keyof ClaimForm, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		// Clear field error when user starts typing
		if (formErrors[field]) {
			setFormErrors((prev) => ({ ...prev, [field]: "" }));
		}
	};

	const handleReset = () => {
		setFormData({ quid: "", password: "" });
		setShowWithdrawal(false);
		clearQuid();
	};

	// Show withdrawal form if claim was successful and access is allowed
	if (showWithdrawal && claimResponse && claimResponse.allowAccess) {
		return (
			<div className="card p-6 max-w-md mx-auto">
				<div className="text-center mb-6">
					<div className="bg-gradient-to-br from-success to-green-600 p-3 rounded-xl mx-auto w-fit mb-3">
						<Banknote className="h-8 w-8 text-white" />
					</div>
					<h2 className="text-2xl font-bold text-text-primary dark:text-text-primary-dark mb-2">
						Withdraw Your Gift
					</h2>
					<p className="text-text-secondary dark:text-text-secondary-dark">
						Transfer your funds to your bank account
					</p>
				</div>

				<WithdrawForm 
					quid={formData.quid}
					accessKey={claimResponse.accessKey}
					amount={claimResponse.quid?.amount || 0}
					currency={claimResponse.quid?.currency || 'NGN'}
					onCancel={handleReset}
				/>
			</div>
		);
	}

	// Show success message if claim was successful
	if (claimResponse && claimResponse.allowAccess) {
		return (
			<div className="card p-6 max-w-md mx-auto">
				<div className="text-center">
					<div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mx-auto w-fit mb-4">
						<Search className="h-8 w-8 text-green-600" />
					</div>
					<h2 className="text-2xl font-bold text-text-primary dark:text-text-primary-dark mb-2">
						Gift Claimed Successfully!
					</h2>
					<p className="text-text-secondary dark:text-text-secondary-dark mb-4">
						{claimResponse.message}
					</p>
					
					{claimResponse.accessKey && (
						<div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mb-4">
							<p className="text-sm text-text-secondary dark:text-text-secondary-dark mb-1">
								Access Key:
							</p>
							<p className="text-lg font-mono text-text-primary dark:text-text-primary-dark break-all">
								{claimResponse.accessKey}
							</p>
						</div>
					)}

					<Button
						onClick={() => setShowWithdrawal(true)}
						size="lg"
						className="w-full font-semibold"
					>
						<Banknote className="h-5 w-5 mr-2 inline" />
						Withdraw Funds
					</Button>

					<Button
						onClick={handleReset}
						variant="secondary"
						size="lg"
						className="w-full font-semibold mt-3"
					>
						Claim Another Gift
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="card p-6 max-w-md mx-auto">
			<div className="text-center mb-6">
				<div className="bg-gradient-to-br from-info to-primary p-3 rounded-xl mx-auto w-fit mb-3">
					<Search className="h-8 w-8 text-white" />
				</div>
				<h2 className="text-2xl font-bold text-text-primary dark:text-text-primary-dark mb-2">
					Claim Your Gift
				</h2>
				<p className="text-text-secondary dark:text-text-secondary-dark">
					Enter your gift code to claim your money
				</p>
			</div>

			{error.hasError && (
				<ErrorMessage
					message={error.message || "Failed to claim gift"}
					onDismiss={clearError}
					className="mb-6"
				/>
			)}

			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<label
						htmlFor="quid"
						className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2"
					>
						Gift Code (QUID)
					</label>
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
						<input
							type="text"
							id="quid"
							value={formData.quid}
							onChange={(e) =>
								handleInputChange("quid", e.target.value.toUpperCase())
							}
							className={`input-field pl-10 uppercase ${
								formErrors.quid
									? "border-red-500 focus:ring-red-500"
									: ""
							}`}
							placeholder="Enter your 8-character gift code"
							maxLength={15}
						/>
					</div>
					{formErrors.quid && (
						<p className="mt-1 text-sm text-red-600 dark:text-red-400">
							{formErrors.quid}
						</p>
					)}
				</div>

				<div>
					<label
						htmlFor="password"
						className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2"
					>
						Password (If Required)
					</label>
					<div className="relative">
						<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
						<input
							type={showPassword ? "text" : "password"}
							id="password"
							value={formData.password}
							onChange={(e) =>
								handleInputChange("password", e.target.value)
							}
							className="input-field pl-10 pr-10"
							placeholder="Enter password if gift is protected"
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
							aria-label={showPassword ? "Hide password" : "Show password"}
						>
							{showPassword ? (
								<EyeOff className="h-5 w-5" />
							) : (
								<Eye className="h-5 w-5" />
							)}
						</button>
					</div>
					<p className="mt-1 text-xs text-text-secondary dark:text-text-secondary-dark">
						Only required if the gift is password protected
					</p>
				</div>

				<Button
					type="submit"
					loading={loading.isLoading}
					size="lg"
					className="w-full font-semibold"
				>
					{loading.isLoading ? "Claiming Gift..." : "Claim Gift"}
				</Button>
			</form>

			<div className="mt-6 text-center">
				<p className="text-xs text-text-secondary dark:text-text-secondary-dark">
					Don't have a gift code? Ask the sender for your unique QUID
				</p>
			</div>
		</div>
	);
};
