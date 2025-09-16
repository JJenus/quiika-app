import React, { useState } from 'react';
import { Users, Clock, Percent, Hash, Calendar, Plus } from 'lucide-react';
import { rulesAPI } from '../../lib/api';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import type { RuleDTO, SplitDTO } from '../../types/api';

interface RuleManagerProps {
  quid: string;
  onRuleCreated?: () => void;
}

export const RuleManager: React.FC<RuleManagerProps> = ({ quid, onRuleCreated }) => {
  const [activeTab, setActiveTab] = useState<'nth-person' | 'timed' | 'split'>('nth-person');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [nthPersonRule, setNthPersonRule] = useState({ nthPerson: 1 });
  const [timedRule, setTimedRule] = useState({
    startTime: '',
    endTime: '',
  });
  const [splitRule, setSplitRule] = useState({
    splits: [{ percentage: 100 }] as SplitDTO[],
  });

  const tabs = [
    { key: 'nth-person' as const, label: 'Nth Person Wins', icon: Hash },
    { key: 'timed' as const, label: 'Timed Release', icon: Clock },
    { key: 'split' as const, label: 'Split Gift', icon: Percent },
  ];

  const handleCreateRule = async () => {
    setIsLoading(true);
    setError('');

    try {
      let ruleData: RuleDTO = { quid };

      switch (activeTab) {
        case 'nth-person':
          ruleData.nthPerson = nthPersonRule.nthPerson;
          break;
        case 'timed':
          ruleData.startTime = timedRule.startTime;
          ruleData.endTime = timedRule.endTime;
          break;
        case 'split':
          ruleData.splits = splitRule.splits;
          ruleData.totalSplits = splitRule.splits.length;
          break;
      }

      await rulesAPI.createRule(ruleData);
      onRuleCreated?.();
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to create rule');
    } finally {
      setIsLoading(false);
    }
  };

  const addSplit = () => {
    setSplitRule(prev => ({
      splits: [...prev.splits, { percentage: 0 }]
    }));
  };

  const updateSplit = (index: number, percentage: number) => {
    setSplitRule(prev => ({
      splits: prev.splits.map((split, i) => 
        i === index ? { ...split, percentage } : split
      )
    }));
  };

  const removeSplit = (index: number) => {
    setSplitRule(prev => ({
      splits: prev.splits.filter((_, i) => i !== index)
    }));
  };

  const getTotalSplitPercentage = () => {
    return splitRule.splits.reduce((sum, split) => sum + split.percentage, 0);
  };

  return (
    <div className="card p-6">
      <div className="text-center mb-6">
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-3 rounded-xl mx-auto w-fit mb-3">
          <Users className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-text-primary dark:text-text-primary-dark mb-2">
          Configure Gift Rules
        </h3>
        <p className="text-text-secondary dark:text-text-secondary-dark">
          Set custom rules for how your gift can be claimed
        </p>
      </div>

      {error && (
        <ErrorMessage 
          message={error} 
          onDismiss={() => setError('')}
          className="mb-6"
        />
      )}

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`
              flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
              ${activeTab === key 
                ? 'bg-white dark:bg-gray-700 text-primary shadow-sm' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }
            `}
          >
            <Icon className="h-4 w-4 mr-2" />
            {label}
          </button>
        ))}
      </div>

      {/* Rule Configuration */}
      <div className="space-y-6">
        {activeTab === 'nth-person' && (
          <div>
            <label className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2">
              Winner Position
            </label>
            <input
              type="number"
              min="1"
              value={nthPersonRule.nthPerson}
              onChange={(e) => setNthPersonRule({ nthPerson: parseInt(e.target.value) || 1 })}
              className="input-field"
              placeholder="Enter position (e.g., 3 for 3rd person)"
            />
            <p className="mt-1 text-xs text-text-secondary dark:text-text-secondary-dark">
              The Nth person to claim will receive the entire gift
            </p>
          </div>
        )}

        {activeTab === 'timed' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2">
                Start Time
              </label>
              <input
                type="datetime-local"
                value={timedRule.startTime}
                onChange={(e) => setTimedRule(prev => ({ ...prev, startTime: e.target.value }))}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2">
                End Time
              </label>
              <input
                type="datetime-local"
                value={timedRule.endTime}
                onChange={(e) => setTimedRule(prev => ({ ...prev, endTime: e.target.value }))}
                className="input-field"
              />
            </div>
            <p className="text-xs text-text-secondary dark:text-text-secondary-dark">
              The gift can only be claimed between these times
            </p>
          </div>
        )}

        {activeTab === 'split' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-text-primary dark:text-text-primary-dark">
                Split Percentages
              </label>
              <button
                type="button"
                onClick={addSplit}
                className="btn-ghost px-3 py-1 text-sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Split
              </button>
            </div>

            <div className="space-y-3">
              {splitRule.splits.map((split, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={split.percentage}
                    onChange={(e) => updateSplit(index, parseInt(e.target.value) || 0)}
                    className="input-field flex-1"
                    placeholder="Percentage"
                  />
                  <span className="text-text-secondary dark:text-text-secondary-dark">%</span>
                  {splitRule.splits.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSplit(index)}
                      className="text-error hover:text-error/80 p-1"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className={`p-3 rounded-lg border ${
              getTotalSplitPercentage() === 100 
                ? 'bg-success/10 border-success/20 text-success'
                : 'bg-warning/10 border-warning/20 text-warning'
            }`}>
              <p className="text-sm font-medium">
                Total: {getTotalSplitPercentage()}%
                {getTotalSplitPercentage() !== 100 && ' (Must equal 100%)'}
              </p>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleCreateRule}
        disabled={isLoading || (activeTab === 'split' && getTotalSplitPercentage() !== 100)}
        className="w-full btn-primary py-3 mt-6"
      >
        {isLoading ? (
          <LoadingSpinner size="sm" text="Creating Rule..." />
        ) : (
          'Create Rule'
        )}
      </button>
    </div>
  );
};