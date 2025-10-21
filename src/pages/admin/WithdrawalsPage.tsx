import React, { useEffect, useState } from "react";
import {
	Banknote,
	Clock,
	CheckCircle,
	XCircle,
	Eye,
	Filter,
	Search,
	Calendar,
	AlertTriangle,
} from "lucide-react";
import { useAdminStore } from "../../stores/useAdminStore";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { ErrorMessage } from "../../components/ui/ErrorMessage";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import type { WithdrawalRequest } from "../../types/api";

export const WithdrawalsPage: React.FC = () => {
	const {
		pendingWithdrawals,
		approveWithdrawal,
		rejectWithdrawal,
		loading,
		error,
		clearError,
	} = useAdminStore();

	const [selectedWithdrawal, setSelectedWithdrawal] =
		useState<WithdrawalRequest | null>(null);
	const [showRejectModal, setShowRejectModal] = useState(false);
	const [rejectReason, setRejectReason] = useState("");
	const [filter, setFilter] = useState("all");
	const [searchTerm, setSearchTerm] = useState("");

	// Mock data for demonstration
	const mockWithdrawals: WithdrawalRequest[] = [
		{
			id: 1,
			quid: "MGOG8R-BSO3LG",
			transaction: {
				id: 1,
				email: "user@example.com",
				amount: 50000,
				currency: "NGN",
				quid: "MGOG8R-BSO3LG",
				reference: "ref_123",
				transactionId: "txn_123",
				status: "SUCCESS",
				blocked: false,
				createdAt: "2024-01-15T10:30:00Z",
				updatedAt: "2024-01-15T10:30:00Z",
			},
			accountName: "John Doe",
			accountNumber: "1234567890",
			amount: 48500, // After fees
			bank: "First Bank",
			bankCode: "011",
			reference: "withdraw_123",
			currency: "NGN",
			status: "PENDING",
			accessKey: "access_key_123",
			createdAt: "2024-01-15T11:00:00Z",
			updatedAt: "2024-01-15T11:00:00Z",
		},
		{
			id: 2,
			quid: "ABCD12-XYZ789",
			transaction: {
				id: 2,
				email: "jane@example.com",
				amount: 100000,
				currency: "NGN",
				quid: "ABCD12-XYZ789",
				reference: "ref_456",
				transactionId: "txn_456",
				status: "SUCCESS",
				blocked: false,
				createdAt: "2024-01-14T15:20:00Z",
				updatedAt: "2024-01-14T15:20:00Z",
			},
			accountName: "Jane Smith",
			accountNumber: "9876543210",
			amount: 97000,
			bank: "GTBank",
			bankCode: "058",
			reference: "withdraw_456",
			currency: "NGN",
			status: "PENDING",
			accessKey: "access_key_456",
			createdAt: "2024-01-14T16:00:00Z",
			updatedAt: "2024-01-14T16:00:00Z",
		},
	];

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-NG", {
			style: "currency",
			currency: "NGN",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(amount / 100);
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "PENDING":
				return <Clock className="h-5 w-5 text-warning" />;
			case "COMPLETED":
				return <CheckCircle className="h-5 w-5 text-success" />;
			case "FAILED":
				return <XCircle className="h-5 w-5 text-error" />;
			default:
				return <AlertTriangle className="h-5 w-5 text-gray-400" />;
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "PENDING":
				return "text-warning bg-warning/10";
			case "COMPLETED":
				return "text-success bg-success/10";
			case "FAILED":
				return "text-error bg-error/10";
			default:
				return "text-gray-500 bg-gray-100 dark:bg-gray-800";
		}
	};

	const handleApprove = async (withdrawalId: string) => {
		if (confirm("Are you sure you want to approve this withdrawal?")) {
			await approveWithdrawal(withdrawalId);
		}
	};

	const handleReject = async () => {
		if (selectedWithdrawal && rejectReason.trim()) {
			await rejectWithdrawal(
				selectedWithdrawal.id.toString(),
				rejectReason
			);
			setShowRejectModal(false);
			setSelectedWithdrawal(null);
			setRejectReason("");
		}
	};

	const filteredWithdrawals = mockWithdrawals.filter((withdrawal) => {
		const matchesFilter =
			filter === "all" || withdrawal.status.toLowerCase() === filter;
		const matchesSearch =
			searchTerm === "" ||
			withdrawal.quid.toLowerCase().includes(searchTerm.toLowerCase()) ||
			withdrawal.accountName
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			withdrawal.transaction.email
				.toLowerCase()
				.includes(searchTerm.toLowerCase());

		return matchesFilter && matchesSearch;
	});

	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold text-text-primary dark:text-text-primary-dark">
						Withdrawal Management
					</h1>
					<p className="text-text-secondary dark:text-text-secondary-dark mt-1">
						Review and process withdrawal requests
					</p>
				</div>

				<div className="flex items-center gap-3">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
						<input
							type="text"
							placeholder="Search by QUID, name, or email..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="input-field pl-10 pr-4 py-2 text-sm w-64"
						/>
					</div>
					<select
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
						className="input-field py-2 px-3 text-sm"
					>
						<option value="all">All Status</option>
						<option value="pending">Pending</option>
						<option value="completed">Completed</option>
						<option value="failed">Failed</option>
					</select>
				</div>
			</div>

			{error.hasError && (
				<ErrorMessage
					message={error.message || "Failed to load withdrawals"}
					onDismiss={clearError}
				/>
			)}

			{/* Summary Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Card className="p-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-text-secondary dark:text-text-secondary-dark">
								Pending Requests
							</p>
							<p className="text-2xl font-bold text-text-primary dark:text-text-primary-dark mt-2">
								{
									mockWithdrawals.filter(
										(w) => w.status === "PENDING"
									).length
								}
							</p>
						</div>
						<div className="p-3 rounded-xl bg-gradient-to-r from-warning to-orange-500">
							<Clock className="h-6 w-6 text-white" />
						</div>
					</div>
				</Card>

				<Card className="p-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-text-secondary dark:text-text-secondary-dark">
								Total Amount Pending
							</p>
							<p className="text-2xl font-bold text-text-primary dark:text-text-primary-dark mt-2">
								{formatCurrency(
									mockWithdrawals
										.filter((w) => w.status === "PENDING")
										.reduce((sum, w) => sum + w.amount, 0)
								)}
							</p>
						</div>
						<div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600">
							<Banknote className="h-6 w-6 text-white" />
						</div>
					</div>
				</Card>

				<Card className="p-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-text-secondary dark:text-text-secondary-dark">
								Processed Today
							</p>
							<p className="text-2xl font-bold text-text-primary dark:text-text-primary-dark mt-2">
								0
							</p>
						</div>
						<div className="p-3 rounded-xl bg-gradient-to-r from-success to-green-500">
							<CheckCircle className="h-6 w-6 text-white" />
						</div>
					</div>
				</Card>
			</div>

			{/* Withdrawals List */}
			<Card className="overflow-hidden">
				<div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
					<h3 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark">
						Withdrawal Requests
					</h3>
				</div>

				{loading.isLoading ? (
					<div className="flex items-center justify-center py-12">
						<LoadingSpinner size="lg" text={loading.message} />
					</div>
				) : filteredWithdrawals.length === 0 ? (
					<div className="text-center py-12">
						<Banknote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
						<h3 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-2">
							No Withdrawal Requests
						</h3>
						<p className="text-text-secondary dark:text-text-secondary-dark">
							{searchTerm || filter !== "all"
								? "No withdrawals match your current filters."
								: "All withdrawal requests will appear here."}
						</p>
					</div>
				) : (
					<div className="divide-y divide-gray-200 dark:divide-gray-700">
						{filteredWithdrawals.map((withdrawal) => (
							<div
								key={withdrawal.id}
								className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
							>
								<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
									<div className="flex-1 space-y-3">
										<div className="flex items-center justify-between">
											<div>
												<h4 className="font-semibold text-text-primary dark:text-text-primary-dark">
													{withdrawal.accountName}
												</h4>
												<p className="text-sm text-text-secondary dark:text-text-secondary-dark">
													{
														withdrawal.transaction
															.email
													}
												</p>
											</div>
											<div
												className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
													withdrawal.status
												)}`}
											>
												{getStatusIcon(
													withdrawal.status
												)}
												<span className="ml-1">
													{withdrawal.status}
												</span>
											</div>
										</div>

										<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
											<div>
												<span className="text-text-secondary dark:text-text-secondary-dark">
													QUID:
												</span>
												<p className="font-mono font-medium">
													{withdrawal.quid}
												</p>
											</div>
											<div>
												<span className="text-text-secondary dark:text-text-secondary-dark">
													Amount:
												</span>
												<p className="font-semibold text-success">
													{formatCurrency(
														withdrawal.amount
													)}
												</p>
											</div>
											<div>
												<span className="text-text-secondary dark:text-text-secondary-dark">
													Bank:
												</span>
												<p className="font-medium">
													{withdrawal.bank}
												</p>
											</div>
											<div>
												<span className="text-text-secondary dark:text-text-secondary-dark">
													Account:
												</span>
												<p className="font-mono">
													{withdrawal.accountNumber}
												</p>
											</div>
										</div>

										<div className="text-xs text-text-secondary dark:text-text-secondary-dark">
											Requested:{" "}
											{new Date(
												withdrawal.createdAt
											).toLocaleString()}
										</div>
									</div>

									{withdrawal.status === "PENDING" && (
										<div className="flex flex-col sm:flex-row gap-2">
											<Button
												variant="outline"
												size="sm"
												onClick={() =>
													setSelectedWithdrawal(
														withdrawal
													)
												}
											>
												<Eye className="h-4 w-4 mr-1" />
												View
											</Button>
											<Button
												variant="primary"
												size="sm"
												onClick={() =>
													handleApprove(
														withdrawal.id.toString()
													)
												}
												loading={loading.isLoading}
											>
												<CheckCircle className="h-4 w-4 mr-1" />
												Approve
											</Button>
											<Button
												variant="outline"
												size="sm"
												onClick={() => {
													setSelectedWithdrawal(
														withdrawal
													);
													setShowRejectModal(true);
												}}
												className="text-error border-error hover:bg-error/10"
											>
												<XCircle className="h-4 w-4 mr-1" />
												Reject
											</Button>
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				)}
			</Card>

			{/* Reject Modal */}
			<Modal
				isOpen={showRejectModal}
				onClose={() => {
					setShowRejectModal(false);
					setSelectedWithdrawal(null);
					setRejectReason("");
				}}
				title="Reject Withdrawal Request"
				size="md"
			>
				<div className="space-y-6">
					<div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
						<div className="flex items-center">
							<AlertTriangle className="h-5 w-5 text-error mr-2" />
							<span className="text-sm font-medium text-error">
								This action cannot be undone
							</span>
						</div>
					</div>

					{selectedWithdrawal && (
						<div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
							<h4 className="font-medium text-text-primary dark:text-text-primary-dark mb-2">
								Withdrawal Details
							</h4>
							<div className="space-y-1 text-sm">
								<p>
									<span className="text-text-secondary dark:text-text-secondary-dark">
										Account:
									</span>{" "}
									{selectedWithdrawal.accountName}
								</p>
								<p>
									<span className="text-text-secondary dark:text-text-secondary-dark">
										Amount:
									</span>{" "}
									{formatCurrency(selectedWithdrawal.amount)}
								</p>
								<p>
									<span className="text-text-secondary dark:text-text-secondary-dark">
										QUID:
									</span>{" "}
									{selectedWithdrawal.quid}
								</p>
							</div>
						</div>
					)}

					<div>
						<label
							htmlFor="rejectReason"
							className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2"
						>
							Reason for Rejection *
						</label>
						<textarea
							id="rejectReason"
							value={rejectReason}
							onChange={(e) => setRejectReason(e.target.value)}
							className="input-field min-h-[100px] resize-none"
							placeholder="Please provide a clear reason for rejecting this withdrawal request..."
							required
						/>
					</div>

					<div className="flex gap-3 pt-4">
						<Button
							type="button"
							variant="outline"
							onClick={() => {
								setShowRejectModal(false);
								setSelectedWithdrawal(null);
								setRejectReason("");
							}}
							className="flex-1"
						>
							Cancel
						</Button>
						<Button
							type="button"
							onClick={handleReject}
							loading={loading.isLoading}
							disabled={!rejectReason.trim()}
							className="flex-1 bg-error hover:bg-error/90"
						>
							Reject Request
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
};
