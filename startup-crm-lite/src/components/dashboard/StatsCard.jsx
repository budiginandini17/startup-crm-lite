import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

/**
 * StatsCard component displays a specific metric with an icon, key value, and trend percentage.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the metric.
 * @param {string|number} props.value - The big number value of the metric.
 * @param {React.ComponentType<{ className?: string, size?: number }>} props.icon - The Lucide React icon component to render.
 * @param {string} props.change - The percentage change text (e.g., "+12.5%").
 * @param {'primary'|'success'|'warning'|'danger'} [props.color='primary'] - The theme color variation for the card elements.
 * @returns {React.ReactElement} The rendered StatsCard component.
 */
export default function StatsCard({ title, value, icon: Icon, change, color = 'primary' }) {
  // Parse trend direction (positive, negative, or neutral)
  const isNegative = typeof change === 'string' && change.trim().startsWith('-');
  const isZero = typeof change === 'string' && change.trim().startsWith('0');

  // Theme color mappings for icon container
  const colorMap = {
    primary: 'bg-blue-50 dark:bg-blue-950/35 text-primary border-blue-100 dark:border-blue-900/30',
    success: 'bg-emerald-50 dark:bg-emerald-950/35 text-success border-emerald-100 dark:border-emerald-900/30',
    warning: 'bg-amber-50 dark:bg-amber-950/35 text-warning border-amber-100 dark:border-amber-900/30',
    danger: 'bg-rose-50 dark:bg-rose-950/35 text-danger border-rose-100 dark:border-rose-900/30',
  };

  const selectedColorClass = colorMap[color] || colorMap.primary;

  return (
    <div className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-gray-200/20 dark:hover:shadow-none hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
          {title}
        </span>
        <div className={`p-3 rounded-xl border ${selectedColorClass} transition-colors duration-300`}>
          {Icon && <Icon size={20} className="stroke-[2.25]" />}
        </div>
      </div>
 
      <div className="mt-4 flex items-baseline justify-between">
        <div>
          <span className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            {value}
          </span>
          <span className="block text-xs text-gray-400 dark:text-gray-500 mt-1 font-medium">
            vs last month
          </span>
        </div>
 
        <div
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-colors duration-300 ${isNegative
              ? 'bg-rose-50 text-danger dark:bg-rose-950/30 dark:text-rose-400'
              : isZero
                ? 'bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-400'
                : 'bg-emerald-50 text-success dark:bg-emerald-950/30 dark:text-emerald-400'
            }`}
        >
          {isNegative ? (
            <ArrowDownRight size={14} className="stroke-[2.5]" />
          ) : isZero ? null : (
            <ArrowUpRight size={14} className="stroke-[2.5]" />
          )}
          <span>{change}</span>
        </div>
      </div>
    </div>
  );
}
