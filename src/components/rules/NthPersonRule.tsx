// components/rules/NthPersonRule.tsx
import React from 'react';

interface NthPersonRuleProps {
  nthPerson: number;
  onNthPersonChange: (value: number) => void;
}

export const NthPersonRule: React.FC<NthPersonRuleProps> = ({
  nthPerson,
  onNthPersonChange
}) => {
  return (
    <div className="space-y-4">
      <label htmlFor="nthPerson" className="block text-sm font-medium text-text-primary dark:text-text-primary-dark">
        Which person can access this gift?
      </label>
      <div className="relative">
        <input
          type="number"
          id="nthPerson"
          value={nthPerson}
          onChange={(e) => onNthPersonChange(Number(e.target.value))}
          min="1"
          className="input-field pr-16"
          placeholder="e.g. 1 for first person"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <span className="text-gray-500 dark:text-gray-400">th person</span>
        </div>
      </div>
    </div>
  );
};