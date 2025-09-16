import React from 'react';
import { AlertTriangle, X, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  onDismiss,
  className = '',
}) => {
  return (
    <div className={`bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm text-red-800 dark:text-red-200">
            {message}
          </p>
          {onRetry && (
            <div className="mt-3">
              <button
                onClick={onRetry}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-800 dark:text-red-200 bg-red-100 dark:bg-red-800/30 rounded-md hover:bg-red-200 dark:hover:bg-red-800/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Try Again
              </button>
            </div>
          )}
        </div>
        {onDismiss && (
          <div className="flex-shrink-0 ml-3">
            <button
              onClick={onDismiss}
              className="inline-flex rounded-md p-1.5 text-red-500 hover:bg-red-100 dark:hover:bg-red-800/30 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
            >
              <span className="sr-only">Dismiss</span>
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};