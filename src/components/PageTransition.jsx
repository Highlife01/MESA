import React from 'react';

export function PageTransition({ children }) {
  return (
    <div className="page-enter">
      {children}
    </div>
  );
}
