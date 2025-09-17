import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
	CheckCircle,
	XCircle,
	Clock,
	ArrowRight,
	Copy,
	Check,
} from "lucide-react";
import { useTransactionStore } from "../stores/useTransactionStore";
import { useSSEStore } from "../stores/useSSEStore";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { ErrorMessage } from "../components/ui/ErrorMessage";

export const PaymentCallbackPage: React.FC = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const [paymentStatus, setPaymentStatus] = useState<
		"loading" | "success" | "failed"
	>("loading");
	const [quid, setQuid] = useState<string>("");
	const [copied, setCopied] = useState(false);

	const { verifyTransactionRef, loading, error } = useTransactionStore();
	const { connect, messages, isConnected } = useSSEStore();

	const reference = searchParams.get("reference");
	const trxref = searchParams.get("trxref");

	useEffect(() => {
		if (!reference && !trxref) {
			setPaymentStatus("failed");
			return;
		}

		const sessionId = reference || trxref || "";

		// Connect to SSE for real-time updates
		connect(sessionId);

		// Verify transaction after a short delay
		const verifyTimer = setTimeout(async () => {
			try {
				const result = await verifyTransactionRef(sessionId);
				if (result && result.quid) {
					setQuid(result.quid);
					setPaymentStatus("success");
				} else {
					setPaymentStatus("failed");
				}
			} catch {
				setPaymentStatus("failed");
			}
		}, 2000);

		return () => clearTimeout(verifyTimer);
	}, [reference, trxref]);

	useEffect(() => {
		// Listen for SSE messages about payment updates
		const latestMessage = messages[messages.length - 1];
		if (latestMessage && latestMessage.type === "TRANSACTION") {
			setPaymentStatus("success");
			if (latestMessage.data.quid) {
				setQuid(latestMessage.data.quid);
			}
		}
	}, [messages]);

	const handleContinue = () => {
		if (paymentStatus === "success") {
			navigate("/transactions");
		} else {
			navigate("/create");
		}
	};

	const copyQuidToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(quid);
			setCopied(true);

			// Reset copied state after 2 seconds
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy QUID:", err);
		}
	};

	if (paymentStatus === "loading") {
		return (
			<div className="min-h-screen py-8 px-4">
				<div className="max-w-2xl mx-auto">
					<div className="card p-6 sm:p-8 text-center">
						<div className="bg-gradient-to-br from-info/10 to-primary/10 p-4 rounded-xl mx-auto w-fit mb-6">
							<Clock className="h-10 w-10 sm:h-12 sm:w-12 text-primary animate-pulse" />
						</div>

						<h1 className="text-xl sm:text-2xl font-bold text-text-primary dark:text-text-primary-dark mb-4">
							Processing Your Payment
						</h1>

						<p className="text-sm sm:text-base text-text-secondary dark:text-text-secondary-dark mb-6">
							Please wait while we verify your payment and create
							your gift...
						</p>

						<LoadingSpinner size="lg" text="Verifying payment..." />

						{isConnected && (
							<div className="mt-6 p-3 bg-success/10 border border-success/20 rounded-lg">
								<p className="text-xs sm:text-sm text-success">
									✓ Connected to real-time updates
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}

	if (paymentStatus === "failed") {
		return (
			<div className="min-h-screen py-8 px-4">
				<div className="max-w-2xl mx-auto">
					<div className="card p-6 sm:p-8 text-center">
						<div className="bg-error/10 p-4 rounded-xl mx-auto w-fit mb-6">
							<XCircle className="h-10 w-10 sm:h-12 sm:w-12 text-error" />
						</div>

						<h1 className="text-xl sm:text-2xl font-bold text-text-primary dark:text-text-primary-dark mb-4">
							Payment Failed
						</h1>

						<p className="text-sm sm:text-base text-text-secondary dark:text-text-secondary-dark mb-6">
							We couldn't process your payment. This might be due
							to insufficient funds, a network error, or a
							cancelled transaction.
						</p>

						{error.hasError && (
							<ErrorMessage
								message={
									error.message ||
									"Payment verification failed"
								}
								className="mb-6"
							/>
						)}

						<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
							<button
								onClick={handleContinue}
								className="btn-primary px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
							>
								Try Again
							</button>
							<button
								onClick={() => navigate("/")}
								className="btn-ghost px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
							>
								Go Home
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	// Success state
	return (
		<div className="min-h-screen py-8 px-4">
			<div className="max-w-2xl mx-auto">
				<div className="card p-6 sm:p-8 text-center">
					<div className="bg-success/10 p-4 rounded-xl mx-auto w-fit mb-6">
						<CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-success" />
					</div>

					<h1 className="text-xl sm:text-2xl font-bold text-text-primary dark:text-text-primary-dark mb-4">
						Payment Successful! 🎉
					</h1>

					<p className="text-sm sm:text-base text-text-secondary dark:text-text-secondary-dark mb-6">
						Your gift has been created successfully. Share the QUID
						code below with your recipient.
					</p>

					{quid && (
						<div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-4 sm:p-6 rounded-xl mb-6 border-2 border-dashed border-primary/20">
							<p className="text-xs sm:text-sm text-text-secondary dark:text-text-secondary-dark mb-2">
								Gift Code (QUID):
							</p>
							<div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-2">
								<code className="text-lg sm:text-xl md:text-2xl font-mono font-bold text-primary bg-white dark:text-secondary dark:bg-gray-800 px-3 sm:px-4 py-2 rounded-lg break-all sm:break-normal">
									{quid}
								</code>
								<button
									onClick={copyQuidToClipboard}
									className={`btn-ghost px-3 py-2 text-sm flex items-center gap-2 min-w-[80px] transition-all duration-200 ${
										copied
											? "text-success"
											: "hover:text-primary"
									}`}
									title="Copy QUID"
									disabled={copied}
								>
									{copied ? (
										<>
											<Check className="h-4 w-4" />
											Copied!
										</>
									) : (
										<>
											<Copy className="h-4 w-4" />
											Copy
										</>
									)}
								</button>
							</div>
						</div>
					)}

					<div className="bg-info/10 p-3 sm:p-4 rounded-lg mb-6">
						<p className="text-xs sm:text-sm text-info">
							💡 Your recipient can use this QUID code to claim
							their gift at any time
						</p>
					</div>

					<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
						<button
							onClick={handleContinue}
							className="btn-primary px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base group flex items-center justify-center"
						>
							View Transactions
							<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
						</button>
						<button
							onClick={() => navigate("/create")}
							className="btn-outline px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
						>
							Create Another Gift
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
