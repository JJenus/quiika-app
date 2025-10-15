// components/forms/WithdrawForm.tsx
import React, { useState, useEffect, useRef } from "react";
import {
	Landmark as Bank,
	ArrowLeft,
	CheckCircle,
	ChevronDown,
	AlertCircle,
	Clock,
	Shield,
} from "lucide-react";
import { useBankStore } from "../../stores/useBankStore";
import { useWithdrawalStore } from "../../stores/useWithdrawalStore";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { ErrorMessage } from "../ui/ErrorMessage";
import toast from "react-hot-toast";
import type { Bank as BankType } from "../../types/api";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";

interface WithdrawFormProps {
	quid: string;
	accessKey: string;
	amount: number;
	currency: string;
	onCancel: () => void;
}

export const WithdrawForm: React.FC<WithdrawFormProps> = ({
	quid,
	accessKey,
	amount,
	currency,
	onCancel,
}) => {
	const [formData, setFormData] = useState({
		accountNumber: "",
		bankCode: "",
		accountName: "",
	});
	const [formErrors, setFormErrors] = useState<Record<string, string>>({});
	const [isResolving, setIsResolving] = useState(false);
	const [bankSearch, setBankSearch] = useState("");
	const [isBankDropdownOpen, setIsBankDropdownOpen] = useState(false);
	const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
		useState(false);
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
	const bankSelectRef = useRef<HTMLDivElement>(null);

	const {
		banks,
		resolvedAccount,
		loading: bankLoading,
		error: bankError,
		fetchBanks,
		resolveAccountName,
		clearError: clearBankError,
	} = useBankStore();
	const {
		processWithdrawal,
		loading: withdrawalLoading,
		error: withdrawalError,
		clearError: clearWithdrawalError,
	} = useWithdrawalStore();

	useEffect(() => {
		fetchBanks();
	}, [fetchBanks]);

	useEffect(() => {
		if (formData.accountNumber.length >= 10 && formData.bankCode) {
			resolveAccountDetails();
		}
	}, [formData.accountNumber, formData.bankCode]);

	useEffect(() => {
		if (resolvedAccount) {
			setFormData((prev) => ({
				...prev,
				accountName: resolvedAccount.accountName || "",
			}));
		}
	}, [resolvedAccount]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				bankSelectRef.current &&
				!bankSelectRef.current.contains(event.target as Node)
			) {
				setIsBankDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const resolveAccountDetails = async () => {
		if (formData.accountNumber.length < 10 || !formData.bankCode) return;

		// Validate bank code format
		if (!/^[A-Z0-9]{3,10}$/.test(formData.bankCode)) {
			setFormErrors((prev) => ({
				...prev,
				bankCode: "Invalid bank code format",
			}));
			return;
		}

		// Validate account number format
		if (!/^\d{10,20}$/.test(formData.accountNumber)) {
			setFormErrors((prev) => ({
				...prev,
				accountNumber: "Invalid account number format",
			}));
			return;
		}

		setIsResolving(true);
		try {
			await resolveAccountName(
				formData.accountNumber.slice(0, 20), // Limit length
				formData.bankCode.toUpperCase().slice(0, 10)
			);
		} catch (error) {
			console.error("Failed to resolve account:", error);
		} finally {
			setIsResolving(false);
		}
	};

	const validateForm = (): boolean => {
		const errors: Record<string, string> = {};

		if (!formData.accountNumber) {
			errors.accountNumber = "Account number is required";
		} else if (formData.accountNumber.length < 10) {
			errors.accountNumber = "Account number must be at least 10 digits";
		}

		if (!formData.bankCode) {
			errors.bankCode = "Please select a bank";
		}

		if (!formData.accountName) {
			errors.accountName = "Account name could not be resolved";
		}

		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (validateForm()) {
			setIsConfirmationModalOpen(true);
		}
	};

	const handleConfirmWithdrawal = async () => {
		setIsConfirmationModalOpen(false);

		// Additional sanitization
		const sanitizedAccountNumber = formData.accountNumber.replace(
			/\D/g,
			""
		);
		const sanitizedBankCode = formData.bankCode.replace(
			/[^a-zA-Z0-9]/g,
			""
		);

		if (!sanitizedAccountNumber || sanitizedAccountNumber.length < 10) {
			setFormErrors((prev) => ({
				...prev,
				accountNumber: "Invalid account number",
			}));
			return;
		}

		if (!sanitizedBankCode) {
			setFormErrors((prev) => ({
				...prev,
				bankCode: "Invalid bank code",
			}));
			return;
		}

		clearBankError();
		clearWithdrawalError();

		try {
			await processWithdrawal({
				quid,
				accessKey,
				amount,
				accountNumber: sanitizedAccountNumber,
				bankCode: sanitizedBankCode,
				accountName: formData.accountName.replace(/[^a-zA-Z\s]/g, ""),
			});

			// Show success modal instead of toast
			setIsSuccessModalOpen(true);

			// Reset form after successful submission
			setFormData({ accountNumber: "", bankCode: "", accountName: "" });
			setBankSearch("");
		} catch (error: any) {
			console.error("Withdrawal failed:", error);
			toast.error(error.message || "Failed to process withdrawal");
		}
	};

	const handleSuccessModalClose = () => {
		setIsSuccessModalOpen(false);
		onCancel(); // Return to previous screen
	};

	const handleBankSelect = (bank: BankType) => {
		handleInputChange("bankCode", bank.code);
		setBankSearch(bank.name);
		setIsBankDropdownOpen(false);
	};

	const handleBankSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setBankSearch(e.target.value);
		if (formData.bankCode) {
			handleInputChange("bankCode", ""); // Clear selection if user types
		}
		if (!isBankDropdownOpen) {
			setIsBankDropdownOpen(true);
		}
	};

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));

		// Clear errors when user starts typing
		if (formErrors[field]) {
			setFormErrors((prev) => ({ ...prev, [field]: "" }));
		}
	};

	const formatCurrency = (amount: number): string => {
		return new Intl.NumberFormat("en-NG", {
			style: "currency",
			currency: currency,
			minimumFractionDigits: 2,
		}).format(amount / 100); // Assuming amount is in kobo
	};

	const filteredBanks = banks.filter((bank) =>
		bank.name.toLowerCase().includes(bankSearch.toLowerCase())
	);

	const WITHDRAWAL_FEE_PERCENTAGE = 0.03; // 3%
	const feeAmount = amount * WITHDRAWAL_FEE_PERCENTAGE;
	const netAmount = amount - feeAmount;
	const selectedBank = banks.find((b) => b.code === formData.bankCode);

	return (
		<div className="space-y-6">
			{/* Transaction Summary */}
			<div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 border border-blue-100 dark:border-gray-700 p-6 rounded-xl shadow-sm">
				<div className="space-y-3">
					<div className="flex justify-between items-center">
						<span className="text-sm font-medium text-gray-600 dark:text-gray-300">
							Amount to withdraw
						</span>
						<span className="text-sm font-semibold text-gray-900 dark:text-white">
							{formatCurrency(amount)}
						</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="text-sm font-medium text-gray-600 dark:text-gray-300">
							Withdrawal Fee (3%)
						</span>
						<span className="text-sm font-semibold text-gray-900 dark:text-white">
							- {formatCurrency(feeAmount)}
						</span>
					</div>
					<div className="border-t border-gray-200 dark:border-gray-600 pt-2">
						<div className="flex justify-between items-center">
							<span className="text-base font-bold text-gray-900 dark:text-white">
								You will receive
							</span>
							<span className="text-lg font-bold text-green-600 dark:text-green-400">
								{formatCurrency(netAmount)}
							</span>
						</div>
					</div>
					<div className="pt-2 text-xs text-gray-500 dark:text-gray-400 text-right">
						QUID: {quid}
					</div>
				</div>
			</div>

			{(bankError.hasError || withdrawalError.hasError) && (
				<ErrorMessage
					message={
						bankError.message ||
						withdrawalError.message ||
						"An error occurred"
					}
					onDismiss={() => {
						clearBankError();
						clearWithdrawalError();
					}}
				/>
			)}

			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<label
						htmlFor="accountNumber"
						className="block text-sm font-semibold text-gray-900 dark:text-white mb-3"
					>
						Account Number
					</label>
					<input
						type="text"
						id="accountNumber"
						value={formData.accountNumber}
            disabled={withdrawalLoading.isLoading}
						onChange={(e) =>
							handleInputChange(
								"accountNumber",
								e.target.value.replace(/\D/g, "")
							)
						}
						className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
							formErrors.accountNumber
								? "border-red-500 focus:ring-red-200 dark:focus:ring-red-800"
								: "border-gray-300 dark:border-gray-600 focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-500 dark:focus:border-blue-400"
						} bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
						placeholder="Enter your 10-digit account number"
						maxLength={10}
					/>
					{formErrors.accountNumber && (
						<p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
							<AlertCircle className="h-4 w-4 mr-1" />
							{formErrors.accountNumber}
						</p>
					)}
				</div>

				<div>
					<label
						htmlFor="bankCode"
						className="block text-sm font-semibold text-gray-900 dark:text-white mb-3"
					>
						Bank
					</label>
					<div className="relative" ref={bankSelectRef}>
						<input
							type="text"
							id="bankCode"
							value={bankSearch}
							onChange={handleBankSearchChange}
							onFocus={() => setIsBankDropdownOpen(true)}
							className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
								formErrors.bankCode
									? "border-red-500 focus:ring-red-200 dark:focus:ring-red-800"
									: "border-gray-300 dark:border-gray-600 focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-500 dark:focus:border-blue-400"
							} bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 pr-10`}
							placeholder="Search and select your bank"
							autoComplete="off"
						/>
						<ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500 pointer-events-none" />

						{isBankDropdownOpen && (
							<div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-xl max-h-60 overflow-y-auto">
								<ul className="py-2">
									{filteredBanks.length > 0 ? (
										filteredBanks.map((bank: BankType) => (
											<li
												key={bank.code}
												onClick={() =>
													handleBankSelect(bank)
												}
												className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer transition-colors border-b border-gray-100 dark:border-gray-600 last:border-b-0"
											>
												{bank.name}
											</li>
										))
									) : (
										<li className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
											No banks found
										</li>
									)}
								</ul>
							</div>
						)}
					</div>
					{formErrors.bankCode && (
						<p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
							<AlertCircle className="h-4 w-4 mr-1" />
							{formErrors.bankCode}
						</p>
					)}
				</div>

				<div>
					<label
						htmlFor="accountName"
						className="block text-sm font-semibold text-gray-900 dark:text-white mb-3"
					>
						Account Name
					</label>
					<div className="relative">
						<input
							type="text"
							id="accountName"
							value={formData.accountName}
							readOnly
							className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
								formErrors.accountName
									? "border-red-500 focus:ring-red-200 dark:focus:ring-red-800"
									: "border-gray-300 dark:border-gray-600 focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-500 dark:focus:border-blue-400"
							} bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
							placeholder="Account name will appear here"
						/>
						{isResolving && (
							<div className="absolute right-3 top-1/2 transform -translate-y-1/2">
								<LoadingSpinner size="sm" />
							</div>
						)}
						{formData.accountName && !isResolving && (
							<CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
						)}
					</div>
					{formErrors.accountName && (
						<p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
							<AlertCircle className="h-4 w-4 mr-1" />
							{formErrors.accountName}
						</p>
					)}
				</div>

				<div className="flex gap-4 pt-2">
					<Button
						type="button"
						onClick={onCancel}
						variant="secondary"
						className="flex-1 py-3 text-base font-medium"
					>
						<ArrowLeft className="h-5 w-5 mr-2 inline" />
						Back
					</Button>
					<Button
						type="submit"
            variant="primary"
						disabled={
							bankLoading.isLoading ||
							withdrawalLoading.isLoading ||
							isResolving ||
							!formData.accountName
						}
						className="flex-1 py-3 text-base font-medium disabled:cursor-not-allowed"
					>
						{bankLoading.isLoading ||
						withdrawalLoading.isLoading ? (
							<LoadingSpinner size="sm" text="Processing..." />
						) : (
							<>
								<Bank className="h-5 w-5 mr-2 inline" />
								Claim Funds
							</>
						)}
					</Button>
				</div>
			</form>

			{/* Confirmation Modal */}
			<Modal
				isOpen={isConfirmationModalOpen}
				onClose={() => setIsConfirmationModalOpen(false)}
				title="Confirm Withdrawal"
				size="md"
			>
				<div className="space-y-6">
					{/* Security Badge */}
					<div className="flex items-center justify-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
						<Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
						<span className="text-sm font-medium text-green-800 dark:text-green-300">
							Secure Transaction
						</span>
					</div>

					<div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
							Transfer Details
						</h3>
						<div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
							<div className="flex justify-between">
								<span className="font-medium text-gray-700 dark:text-gray-300">
									Bank
								</span>
								<span className="text-gray-900 dark:text-white font-semibold">
									{selectedBank?.name}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="font-medium text-gray-700 dark:text-gray-300">
									Account Number
								</span>
								<span className="text-gray-900 dark:text-white font-mono font-semibold">
									{formData.accountNumber}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="font-medium text-gray-700 dark:text-gray-300">
									Account Name
								</span>
								<span className="text-gray-900 dark:text-white font-semibold">
									{formData.accountName}
								</span>
							</div>
						</div>
					</div>

					<div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 border border-blue-100 dark:border-gray-700 p-4 rounded-lg space-y-2">
						<div className="flex justify-between items-center text-sm">
							<span className="text-gray-600 dark:text-gray-300">
								Amount
							</span>
							<span className="font-medium text-gray-900 dark:text-white">
								{formatCurrency(amount)}
							</span>
						</div>
						<div className="flex justify-between items-center text-sm">
							<span className="text-gray-600 dark:text-gray-300">
								Fee
							</span>
							<span className="font-medium text-gray-900 dark:text-white">
								- {formatCurrency(feeAmount)}
							</span>
						</div>
						<div className="border-t border-gray-200 dark:border-gray-600 pt-2">
							<div className="flex justify-between items-center">
								<span className="font-bold text-gray-900 dark:text-white">
									Total Receive
								</span>
								<span className="font-bold text-lg text-green-600 dark:text-green-400">
									{formatCurrency(netAmount)}
								</span>
							</div>
						</div>
					</div>

					{/* Processing Time Info */}
					<div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
						<Clock className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
						<div>
							<p className="text-sm font-medium text-blue-800 dark:text-blue-300">
								Processing Time
							</p>
							<p className="text-xs text-blue-600 dark:text-blue-400">
								Funds will arrive within 24 hours
							</p>
						</div>
					</div>

					<div className="flex gap-3 pt-2">
						<Button
							type="button"
							variant="outline"
							onClick={() => setIsConfirmationModalOpen(false)}
							className="flex-1 py-3"
							disabled={withdrawalLoading.isLoading}
						>
							Edit Details
						</Button>
						<Button
							type="button"
							onClick={handleConfirmWithdrawal}
							loading={withdrawalLoading.isLoading}
							className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
						>
							<Shield className="h-5 w-5 mr-2" />
							Confirm Transfer
						</Button>
					</div>
				</div>
			</Modal>

			{/* Success Modal */}
			<Modal
				isOpen={isSuccessModalOpen}
				onClose={handleSuccessModalClose}
				title=""
				size="sm"
				hideCloseButton
			>
				<div className="text-center space-y-6">
					{/* Success Icon */}
					<div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30">
						<CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
					</div>

					<div className="space-y-2">
						<h3 className="text-xl font-bold text-gray-900 dark:text-white">
							Withdrawal Successful!
						</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							Your funds are being processed and will be
							transferred to your bank account.
						</p>
					</div>

					{/* Transaction Summary */}
					<div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-2">
						<div className="flex justify-between text-sm">
							<span className="text-gray-600 dark:text-gray-400">
								Amount:
							</span>
							<span className="font-medium text-gray-900 dark:text-white">
								{formatCurrency(netAmount)}
							</span>
						</div>
						<div className="flex justify-between text-sm">
							<span className="text-gray-600 dark:text-gray-400">
								Bank:
							</span>
							<span className="font-medium text-gray-900 dark:text-white">
								{selectedBank?.name}
							</span>
						</div>
						<div className="flex justify-between text-sm">
							<span className="text-gray-600 dark:text-gray-400">
								Account:
							</span>
							<span className="font-medium text-gray-900 dark:text-white">
								{formData.accountNumber}
							</span>
						</div>
					</div>

					{/* Processing Info */}
					<div className="flex items-center justify-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
						<Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
						<span className="text-sm text-blue-700 dark:text-blue-300">
							Expected arrival: Within 24 hours
						</span>
					</div>

					<Button
						onClick={handleSuccessModalClose}
						className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
					>
						Done
					</Button>
				</div>
			</Modal>

			{/* Footer Info */}
			<div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
				<div className="flex items-center justify-center gap-2 mb-2">
					<Shield className="h-4 w-4 text-gray-400" />
					<p className="text-xs font-medium text-gray-500 dark:text-gray-400">
						Secure & Encrypted
					</p>
				</div>
				<p className="text-xs text-gray-500 dark:text-gray-400">
					Funds will be transferred to your bank account within 24
					hours
				</p>
			</div>
		</div>
	);
};
