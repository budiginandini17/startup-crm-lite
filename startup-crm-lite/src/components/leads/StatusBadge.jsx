import React from 'react';

/**
 * StatusBadge Component
 * Renders a pill-shaped badge with semantic styling according to the lead status.
 * Supports dark mode and provides accessible high-contrast colors.
 * 
 * @param {Object} props
 * @param {string} props.status - The status value ('New', 'Contacted', etc.)
 */
export default function StatusBadge({ status }) {
  const statusStyles = {
    'New': 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200/60 dark:border-slate-700/50',
    'Contacted': 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-100 dark:border-blue-900/30',
    'Meeting Scheduled': 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border-purple-100 dark:border-purple-900/30',
    'Proposal Sent': 'bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border-amber-100 dark:border-amber-900/30',
    'Won': 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-100 dark:border-emerald-900/30',
    'Lost': 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border-rose-100 dark:border-rose-900/30',
  };

  const currentStyle = statusStyles[status] || statusStyles['New'];

  return (
    <span 
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${currentStyle} transition-colors duration-150`}
      role="status"
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-70" aria-hidden="true" />
      {status}
    </span>
  );
}
