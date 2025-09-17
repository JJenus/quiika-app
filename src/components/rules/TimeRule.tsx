// components/rules/TimeRule.tsx
import React from 'react';

interface TimeRuleProps {
  timeRule: { start: string; end: string };
  onTimeRuleChange: (timeRule: { start: string; end: string }) => void;
}

export const TimeRuleComponent: React.FC<TimeRuleProps> = ({
  timeRule,
  onTimeRuleChange
}) => {
  const updateTimeRule = (field: 'start' | 'end', value: string) => {
    onTimeRuleChange({
      ...timeRule,
      [field]: value
    });
  };

  const now = new Date();
  const minDate = now.toISOString().slice(0, 16);
  const minEndDate = timeRule.start || minDate;

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-text-primary dark:text-text-primary-dark">
        Time Range
      </label>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="startTime" className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2">
            Start Time
          </label>
          <input
            type="datetime-local"
            id="startTime"
            value={timeRule.start}
            onChange={(e) => updateTimeRule('start', e.target.value)}
            className="input-field"
            min={minDate}
          />
        </div>
        
        <div>
          <label htmlFor="endTime" className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2">
            End Time
          </label>
          <input
            type="datetime-local"
            id="endTime"
            value={timeRule.end}
            onChange={(e) => updateTimeRule('end', e.target.value)}
            className="input-field"
            min={minEndDate}
          />
        </div>
      </div>
    </div>
  );
};