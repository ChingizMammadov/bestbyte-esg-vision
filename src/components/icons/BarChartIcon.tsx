
import React from 'react';

export function BarChartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 3v18h18" />
      <rect x="9" y="13" width="2" height="6" rx="1" />
      <rect x="5" y="17" width="2" height="2" rx="1" />
      <rect x="13" y="9" width="2" height="10" rx="1" />
      <rect x="17" y="6" width="2" height="13" rx="1" />
    </svg>
  );
}
