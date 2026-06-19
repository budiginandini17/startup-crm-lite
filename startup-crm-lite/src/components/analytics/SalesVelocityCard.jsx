import { Zap, ArrowUpRight, ArrowDownRight, HelpCircle } from 'lucide-react';
import { getPercentChange } from '../../utils/analyticsHelpers';

/**
 * SalesVelocityCard Component
 * Displays the speed of revenue generation per day and tracks performance relative to the previous period.
 *
 * @param {Object} props
 * @param {number} props.velocity - Sales velocity for the current period (₹/day)
 * @param {number} props.prevVelocity - Sales velocity for the previous period (₹/day)
 */
export default function SalesVelocityCard({ velocity = 0, prevVelocity = 0 }) {
  const percentChange = getPercentChange(velocity, prevVelocity);
  const isPositive = percentChange > 0;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-[200px]">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            <span>Sales Velocity</span>
            <div className="group relative cursor-help">
              <HelpCircle size={13} className="text-gray-400 hover:text-gray-500" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2 bg-gray-950 dark:bg-gray-900 text-[10px] font-medium text-white rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity leading-relaxed shadow-lg border border-gray-750">
                Formula: (Leads × Win Rate × Avg Deal Size) ÷ Sales Cycle Length. Indicates how much revenue flows through your pipeline per day.
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-450 mt-1">Speed of pipeline conversion</p>
        </div>
        <div className="p-2 bg-amber-50 dark:bg-amber-950/20 text-amber-500 rounded-lg">
          <Zap size={18} />
        </div>
      </div>
 
      <div className="my-3">
        <p className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-none">
          ₹{velocity.toLocaleString('en-IN')}
          <span className="text-sm font-semibold text-gray-405 dark:text-gray-500 ml-1">/day</span>
        </p>
      </div>
 
      <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-3 text-xs">
        <span className="text-gray-400">vs previous period</span>
        {percentChange === 0 ? (
          <span className="font-bold text-gray-500">0%</span>
        ) : (
          <span
            className={`flex items-center gap-0.5 font-bold ${
              isPositive
                ? 'text-emerald-500 dark:text-emerald-400'
                : 'text-rose-500 dark:text-rose-400'
            }`}
          >
            {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {Math.abs(percentChange)}%
          </span>
        )}
      </div>
    </div>
  );
}
