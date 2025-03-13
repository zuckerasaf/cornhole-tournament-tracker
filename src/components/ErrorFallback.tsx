
import React from 'react';
import { Button } from './ui-custom/Button';

interface ErrorFallbackProps {
  error?: Error;
  resetErrorBoundary?: () => void;
}

export const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-950 p-4">
      <div className="glass rounded-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mb-4 overflow-auto">
            <p className="text-red-800 dark:text-red-200 font-mono text-sm">
              {error.message}
            </p>
          </div>
        )}
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Please try refreshing the page or contact support if the problem persists.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
          
          {resetErrorBoundary && (
            <Button variant="outline" onClick={resetErrorBoundary}>
              Try Again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
