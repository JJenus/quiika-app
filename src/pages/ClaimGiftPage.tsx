import React from "react";
import { ClaimGiftForm } from "../components/forms/ClaimGiftForm";
import { useSearchParams } from "react-router-dom";
import { isBot } from "../utils/isBot";

export const ClaimGiftPage: React.FC = () => {
	const [params] = useSearchParams();
	const quidParam = params.get("quid")?.trim().toUpperCase() || "";

	const shouldAutoSubmit = !isBot() && quidParam.length === 13;

	return (
		<div className="min-h-screen py-8">
			<div className="max-w-2xl mx-auto">
				<div className="text-center mb-8">
					<h1 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-text-primary-dark mb-4">
						Claim Your Gift
					</h1>
					<p className="text-text-secondary dark:text-text-secondary-dark">
						Enter your gift code (QUID) to claim your money
					</p>
				</div>

				<ClaimGiftForm
					initialQuid={quidParam}
					autoSubmit={shouldAutoSubmit}
				/>
			</div>
		</div>
	);
};
