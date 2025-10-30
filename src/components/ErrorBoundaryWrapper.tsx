// components/ErrorBoundaryWrapper.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

const ErrorFallback = ({ error, resetErrorBoundary }: any) => (
  <div className="flex flex-col items-center justify-center p-4">
    <p className="text-red-500">Something went wrong:</p>
    <pre className="text-sm text-gray-600">{error.message}</pre>
    <button
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      onClick={resetErrorBoundary}
    >
      Try Again
    </button>
  </div>
);

const ErrorBoundaryWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      resetKeys={[location.pathname]} // <== resets when route changes
    >
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryWrapper;