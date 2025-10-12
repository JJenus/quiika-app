// components/rules/SplitRule.tsx
import React from "react";
import { Plus, X } from "lucide-react";
import { Button } from "../ui/Button";
import { SplitMode, SplitConfig } from "../../types/api";

interface SplitRuleProps {
	splitConfig: SplitConfig;
	currency: string;
	totalAmount: number;
	onSplitConfigChange: (config: SplitConfig) => void;
}

const MAX_PERCENTAGE_SPLITS = 5;
const MIN_AMOUNT = 1000;

export const SplitRuleComponent: React.FC<SplitRuleProps> = ({
	splitConfig,
	currency,
	totalAmount,
	onSplitConfigChange,
}) => {
	const toggleSplitMode = () => {
		const newMode =
			splitConfig.mode === "FIXED_AMOUNT"
				? SplitMode.PERCENTAGE
				: SplitMode.FIXED_AMOUNT;

		const newSplits =
			newMode === "PERCENTAGE" && splitConfig.splits.length === 0
				? [{ percentage: 0, amount: 0, fixedAmount: false }]
				: splitConfig.splits;

		onSplitConfigChange({
			...splitConfig,
			mode: newMode,
			splits: newSplits,
		});
	};

	const addPercentageSplit = () => {
		if (splitConfig.splits.length < MAX_PERCENTAGE_SPLITS) {
			onSplitConfigChange({
				...splitConfig,
				splits: [
					...splitConfig.splits,
					{ percentage: 0, amount: 0, fixedAmount: false },
				],
			});
		}
	};

	const removePercentageSplit = (index: number) => {
		if (splitConfig.splits.length > 1) {
			const newSplits = [...splitConfig.splits];
			newSplits.splice(index, 1);
			onSplitConfigChange({
				...splitConfig,
				splits: newSplits,
			});
		}
	};

	const updateSplitPercentage = (index: number, percentage: number) => {
		const newSplits = [...splitConfig.splits];
		newSplits[index] = {
			...newSplits[index],
			percentage: Math.min(100, Math.max(0, percentage)),
		};
		onSplitConfigChange({
			...splitConfig,
			splits: newSplits,
		});
	};

	const updateTotalSplits = (totalSplits: number) => {
		onSplitConfigChange({
			...splitConfig,
			totalSplits: Math.max(1, totalSplits),
		});
	};

	const fixedSplitAmount = Math.floor(totalAmount / splitConfig.totalSplits);
	const totalPercentage = splitConfig.splits.reduce(
		(sum, rule) => sum + (rule.percentage || 0),
		0
	);

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<label className="text-sm font-medium text-text-primary dark:text-text-primary-dark">
					Split Configuration
				</label>
				<div className="flex items-center">
					<span className="text-sm text-text-secondary dark:text-text-secondary-dark mr-2">
						{splitConfig.mode === "FIXED_AMOUNT"
							? "Fixed Amount"
							: "Percentage"}
					</span>
					<button
						type="button"
						onClick={toggleSplitMode}
						className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-gray-200 dark:bg-gray-700"
					>
						<span
							aria-hidden="true"
							className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
								splitConfig.mode === "PERCENTAGE"
									? "translate-x-5"
									: "translate-x-0"
							}`}
						/>
					</button>
				</div>
			</div>

			{splitConfig.mode === "FIXED_AMOUNT" ? (
				<div className="space-y-4">
					<div>
						<label
							htmlFor="totalSplits"
							className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2"
						>
							Number of Equal Splits
						</label>
						<input
							type="number"
							id="totalSplits"
							value={splitConfig.totalSplits}
							onChange={(e) =>
								updateTotalSplits(Number(e.target.value))
							}
							min="1"
							className="input-field"
						/>
					</div>

					{splitConfig.totalSplits > 0 && (
						<div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
							<p className="text-sm text-text-primary dark:text-text-primary-dark">
								Each of {splitConfig.totalSplits} recipient(s)
								will receive:{" "}
								<strong className="text-primary dark:text-primary-light">
									{currency}{" "}
									{fixedSplitAmount.toLocaleString()}
								</strong>
							</p>
						</div>
					)}
				</div>
			) : (
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<label className="text-sm font-medium text-text-primary dark:text-text-primary-dark">
							Percentage Splits
						</label>
						<div className="flex items-center gap-2">
							<Button
								type="button"
								onClick={addPercentageSplit}
								disabled={
									splitConfig.splits.length >=
									MAX_PERCENTAGE_SPLITS
								}
								size="sm"
								className="font-semibold shadow-sm"
							>
								<Plus className="h-4 w-4 mr-1" />
								Add Split
							</Button>
							<span className="text-xs text-text-secondary dark:text-text-secondary-dark">
								{splitConfig.splits.length}/
								{MAX_PERCENTAGE_SPLITS}
							</span>
						</div>
					</div>

					<div className="space-y-4">
						{splitConfig.splits.map((split, index) => (
							<div
								key={index}
								className="border rounded-lg p-4 dark:border-gray-700"
							>
								<div className="flex items-center justify-between mb-3">
									<h4 className="font-medium text-text-primary dark:text-text-primary-dark">
										Split #{index + 1}
									</h4>
									<button
										type="button"
										onClick={() =>
											removePercentageSplit(index)
										}
										disabled={
											splitConfig.splits.length <= 1
										}
										className="rounded-md p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 disabled:opacity-50"
									>
										<X className="h-4 w-4" />
									</button>
								</div>

								<div>
									<label
										htmlFor={`percentage-${index}`}
										className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2"
									>
										Percentage
									</label>
									<div className="relative">
										<input
											type="number"
											id={`percentage-${index}`}
											value={split.percentage || 0}
											onChange={(e) =>
												updateSplitPercentage(
													index,
													Number(e.target.value)
												)
											}
											min="1"
											max="100"
											className="input-field pr-12"
											placeholder="0-100"
										/>
										<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
											<span className="text-gray-500 dark:text-gray-400">
												%
											</span>
										</div>
									</div>
									<p className="mt-2 text-sm text-text-secondary dark:text-text-secondary-dark">
										Amount: {currency}{" "}
										{Math.floor(
											totalAmount *
												((split.percentage || 0) / 100)
										).toLocaleString()}
									</p>
								</div>
							</div>
						))}
					</div>

					<div
						className={`p-4 rounded-lg ${
							totalPercentage === 100
								? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200"
								: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200"
						}`}
					>
						<p className="text-sm">
							Total Percentage: {totalPercentage}%
							{totalPercentage !== 100 && (
								<span className="font-medium">
									{" "}
									- Must total exactly 100%
								</span>
							)}
						</p>
					</div>
				</div>
			)}
		</div>
	);
};
