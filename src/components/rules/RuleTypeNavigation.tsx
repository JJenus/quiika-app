// components/rules/RuleTypeNavigation.tsx
import React from 'react';
import type { RuleType } from '../../types/api';

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
  onRuleTypeChange
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {rulesNav.map(({ name, rule, icon: Icon }) => (
        <button
          key={rule}
          onClick={() => onRuleTypeChange(rule)}
          className={`flex items-center justify-center p-3 rounded-lg border transition-colors ${
            currentRuleType === rule
              ? 'border-primary bg-primary/10 text-primary dark:bg-primary/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
          }`}
        >
          <Icon className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">{name}</span>
        </button>
      ))}
    </div>
  );
};