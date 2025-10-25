import React from "react";
import { useAdminStore } from "../../../stores/useAdminStore";
import { QuidStatus, Currency } from "../../../types/api";
import { FilterPanel, FilterConfig } from "../../ui/FilterPanel";

interface QuidFilterPanelProps {
	onFiltersChange?: () => void;
}

export const QuidFilterPanel: React.FC<QuidFilterPanelProps> = ({
	onFiltersChange,
}) => {
	const { quidListParams, setQuidListParams, fetchQuids, quids } =
		useAdminStore();

	// Calculate counts from current data
	const statusCounts = React.useMemo(() => {
		return {
			ACTIVE:
				quids?.data.filter((q) => q.status === "ACTIVE").length || 0,
			CLAIMED:
				quids?.data.filter((q) => q.status === "CLAIMED").length || 0,
			BLOCKED:
				quids?.data.filter((q) => q.status === "BLOCKED").length || 0,
			EXPIRED:
				quids?.data.filter((q) => q.status === "EXPIRED").length || 0,
			SPLIT: quids?.data.filter((q) => q.status === "SPLIT").length || 0,
			CONFLICTED:
				quids?.data.filter((q) => q.status === "CONFLICTED").length ||
				0,
		};
	}, [quids]);

	const currencyCounts = React.useMemo(() => {
		return {
			NGN: quids?.data.filter((q) => q.currency === "NGN").length || 0,
			GHS: quids?.data.filter((q) => q.currency === "GHS").length || 0,
			KES: quids?.data.filter((q) => q.currency === "KES").length || 0,
			ZAR: quids?.data.filter((q) => q.currency === "ZAR").length || 0,
		};
	}, [quids]);

	// Define filters with component-specific colors and options
	const filters: FilterConfig[] = [
		{
			key: "dateRange",
			label: "Date Range",
			type: "date-range",
		},
		{
			key: "status",
			label: "Status",
			type: "multiselect",
			options: [
				{
					value: "ACTIVE",
					label: "Active",
					count: statusCounts.ACTIVE,
					color: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
				},
				{
					value: "CLAIMED",
					label: "Claimed",
					count: statusCounts.CLAIMED,
					color: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
				},
				{
					value: "BLOCKED",
					label: "Blocked",
					count: statusCounts.BLOCKED,
					color: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
				},
				{
					value: "EXPIRED",
					label: "Expired",
					count: statusCounts.EXPIRED,
					color: "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
				},
				{
					value: "SPLIT",
					label: "Split",
					count: statusCounts.SPLIT,
					color: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800",
				},
				{
					value: "CONFLICTED",
					label: "Conflicted",
					count: statusCounts.CONFLICTED,
					color: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800",
				},
			],
		},
		{
			key: "currency",
			label: "Currency",
			type: "multiselect",
			options: [
				{
					value: "NGN",
					label: "NGN",
					count: currencyCounts.NGN,
          color: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300'
				},
				{
					value: "GHS",
					label: "GHS",
					count: currencyCounts.GHS,
          color: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300'
				},
				{
					value: "KES",
					label: "KES",
					count: currencyCounts.KES,
					color: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300",
				},
				{
					value: "ZAR",
					label: "ZAR",
					count: currencyCounts.ZAR,
					color: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300",
				},
			],
		},
		{
			key: "amount",
			label: "Amount Range",
			type: "number-range",
		},
	];

	const handleFiltersChange = (filters: Record<string, any>) => {
		setQuidListParams({
			...quidListParams,
			filters: { ...quidListParams.filters, ...filters },
			page: 1,
		});

		if (onFiltersChange) {
			onFiltersChange();
		} else {
			fetchQuids();
		}
	};

	const handleClearAll = () => {
		setQuidListParams({
			...quidListParams,
			filters: { search: quidListParams.filters?.search },
		});

		if (onFiltersChange) {
			onFiltersChange();
		} else {
			fetchQuids();
		}
	};

	return (
		<FilterPanel
			filters={filters}
			initialValues={quidListParams.filters || {}}
			onFiltersChange={handleFiltersChange}
			onClearAll={handleClearAll}
			title="QUID Filters"
		/>
	);
};
