'use client';

import React from 'react';
import Link from 'next/link';

export default function ErrorBoundary({ children }) {
  const [hasError, setHasError] = React.useState(false);
  
  // This will be used with window.onerror to catch errors in client components
  React.useEffect(() => {
    const handleError = () => {
      setHasError(true);
    };
    
    window.addEventListener('error', handleError);
    
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
        <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-700 mb-4">
            We&apos;re sorry, but there was an error loading this page. Please try again later.
          </p>
          <Link 
            href="/"
            className="block text-center w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setHasError(false)}
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return children;
}
