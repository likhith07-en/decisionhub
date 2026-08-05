import React from 'react';

export function PageContainer({ children, className = '' }) {
  return (
    <div className={`min-h-screen bg-background text-primary ${className}`}>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
