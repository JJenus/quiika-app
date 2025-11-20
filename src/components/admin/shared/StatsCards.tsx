// src/components/admin/shared/StatsCards.tsx
import { Card } from "@/components/ui/Card";
import { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { getColorClasses } from "@/utils/statusHelpers";

export type StatCardProps = {
	title: string;
	value: ReactNode;
	icon: ReactNode;
	gradient: string;
	description?: string;
	growth?: number;
};

const StatCard = ({
	title,
	value,
	icon,
	gradient,
	description,
	growth,
}: StatCardProps) => {
	const formatGrowth = (growth: number) => {
		const sign = growth > 0 ? "+" : "";
		return `${sign}${growth.toFixed(1)}%`;
	};

	const getGrowthColor = (growth: number) => {
		if (growth > 0) return "text-green-600 dark:text-green-400";
		if (growth < 0) return "text-red-600 dark:text-red-400";
		return "text-text-secondary dark:text-text-secondary-dark";
	};

	const getGrowthIcon = (growth: number) => {
		if (growth > 0) return <TrendingUp className="h-4 w-4" />;
		if (growth < 0) return <TrendingDown className="h-4 w-4" />;
		return null;
	};

	return (
		<Card className="p-6">
			<div className="flex items-center justify-between">
				<div className="flex-1">
					<p className="text-sm font-medium text-text-secondary dark:text-text-secondary-dark mb-1">
						{title}
					</p>
					<p className="text-xl font-bold text-text-primary dark:text-text-primary-dark">
						{value}
					</p>
					<div className="flex flex-col items-start gap-1 mt-1">
						{growth !== undefined && growth !== 0 && (
							<div className="flex items-center gap-1">
								<span className={getGrowthColor(growth)}>
									{getGrowthIcon(growth)}
								</span>
								<span
									className={`text-xs font-medium ${getGrowthColor(
										growth
									)}`}
								>
									{formatGrowth(growth)}
								</span>
							</div>
						)}
						{description && (
							<p className="text-xs text-text-secondary dark:text-text-secondary-dark">
								{description}
							</p>
						)}
					</div>
				</div>
				<div className={`p-3 rounded-xl ${getColorClasses(gradient)}`}>
					{icon}
				</div>
			</div>
		</Card>
	);
};

type StatsCardsProps = {
	cards: StatCardProps[];
	columns?: 1 | 2 | 3 | 4;
	loading?: boolean;
};

export const StatsCards = ({
	cards,
	columns = 3,
	loading = false,
}: StatsCardsProps) => {
	const gridClasses = {
		1: "grid-cols-1",
		2: "grid-cols-1 md:grid-cols-2",
		3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
		4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
	};

	if (loading) {
		return (
			<div className={`grid ${gridClasses[columns]} gap-6 mb-8`}>
				{Array.from({ length: columns }, (_, index) => (
					<Card key={index} className="p-6 animate-pulse">
						<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
						<div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
						<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
					</Card>
				))}
			</div>
		);
	}

	return (
		<div className={`grid ${gridClasses[columns]} gap-6`}>
			{cards.map((card, index) => (
				<StatCard key={index} {...card} />
			))}
		</div>
	);
};
