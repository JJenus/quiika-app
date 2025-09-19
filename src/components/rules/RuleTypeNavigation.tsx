// components/rules/RuleTypeNavigation.tsx
import React from "react";
import type { RuleType } from "../../types/api";

interface RuleNavItem {
	name: string;
	rule: RuleType;
	icon: React.ComponentType<any>;
}

interface RuleTypeNavigationProps {
	rulesNav: RuleNavItem[];
	currentRuleType: RuleType;
	onRuleTypeChange: (ruleType: RuleType) => void;
}

export const RuleTypeNavigation: React.FC<RuleTypeNavigationProps> = ({
	rulesNav,
	currentRuleType,
	onRuleTypeChange,
}) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
			{rulesNav.map(({ name, rule, icon: Icon }) => (
				<button
					key={rule}
					onClick={() => onRuleTypeChange(rule)}
					className={`flex items-center justify-center p-3 rounded-lg border dark:text-primary-light btn-outline ${
						currentRuleType === rule
							? "bg-primary text-white dark:text-white"
							: " dark:border-gray-700 "
					}`}
				>
					<Icon className="h-4 w-4 mr-2" />
					<span className="text-sm font-medium">{name}</span>
				</button>
			))}
		</div>
	);
};
