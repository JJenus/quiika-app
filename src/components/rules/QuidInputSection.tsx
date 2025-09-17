// components/rules/QuidInputSection.tsx
import React from 'react';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface QuidInputSectionProps {
  quidInput: string;
  isLoading: boolean;
  onQuidChange: (value: string) => void;
  onFetchQuidDetails: () => void;
}

export const QuidInputSection: React.FC<QuidInputSectionProps> = ({
  quidInput,
  isLoading,
  onQuidChange,
  onFetchQuidDetails
}) => {
  return (
    <div className="mb-5 flex-grow-1">
      <h1 className="display-6 mb-8">
        <span className="text-success">Quid</span> Rules Management
      </h1>

      <div className="mb-5">
        <div className="mb-5">
          <input
            value={quidInput}
            onChange={(e) => onQuidChange(e.target.value)}
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter Quid ID"
            disabled={isLoading}
            onKeyUp={(e) => e.key === 'Enter' && onFetchQuidDetails()}
            name="quid"
            autoComplete="quid"
          />
        </div>

        <div>
          <button
            className="btn btn-primary w-100"
            type="button"
            onClick={onFetchQuidDetails}
            disabled={!quidInput || isLoading}
          >
            {isLoading ? (
              <LoadingSpinner size="sm" />
            ) : 'Load'}
          </button>
        </div>
      </div>
    </div>
  );
};