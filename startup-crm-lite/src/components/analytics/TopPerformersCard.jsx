import { Trophy, Award, Medal, CheckSquare } from 'lucide-react';
import { formatINR } from '../../utils/analyticsHelpers';

/**
 * Gets initials of a name for avatars.
 */
function getInitials(name) {
  if (!name) return 'SR';
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

/**
 * Gets a rank badge icon.
 */
function RankBadge({ rank }) {
  if (rank === 0) {
    return (
      <div className="w-5.5 h-5.5 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center">
        <Trophy size={12} />
      </div>
    );
  }
  if (rank === 1) {
    return (
      <div className="w-5.5 h-5.5 rounded-full bg-gray-300/20 dark:bg-gray-700/30 text-gray-400 dark:text-gray-300 flex items-center justify-center">
        <Award size={12} />
      </div>
    );
  }
  if (rank === 2) {
    return (
      <div className="w-5.5 h-5.5 rounded-full bg-orange-400/10 text-orange-500/80 flex items-center justify-center">
        <Medal size={12} />
      </div>
    );
  }
  return (
    <div className="w-5.5 h-5.5 rounded-full bg-gray-100 dark:bg-gray-900 text-gray-400 flex items-center justify-center text-[10px] font-bold">
      {rank + 1}
    </div>
  );
}
 
/**
 * TopPerformersCard Component
 * Displays a leaderboard ranking team members by Won Revenue.
 *
 * @param {Object} props
 * @param {Array} props.data - Array of top performer statistics
 */
export default function TopPerformersCard({ data = [] }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-[300px]">
      <div>
        <h3 className="text-base font-bold text-gray-900 dark:text-white">
          Top Sales Performers
        </h3>
        <p className="text-xs text-gray-450 mt-1">
          Ranking of sales representatives by total won revenue
        </p>
      </div>
 
      {data.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm font-medium">
          No deal completions recorded
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto mt-4 pr-1 space-y-3">
          {data.map((performer, index) => (
            <div
              key={performer.name}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50/50 dark:hover:bg-gray-700/20 transition-colors"
            >
              {/* Left Profile Detail */}
              <div className="flex items-center gap-3 min-w-0">
                <RankBadge rank={index} />
                <div className="w-8.5 h-8.5 rounded-full bg-blue-50 dark:bg-gray-700 border border-blue-100/50 dark:border-gray-700 text-xs font-bold text-primary dark:text-blue-400 flex items-center justify-center flex-shrink-0 select-none">
                  {getInitials(performer.name)}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
                    {performer.name}
                  </p>
                  <span className="text-[10px] text-gray-450 dark:text-gray-550 flex items-center gap-1 mt-0.5 font-medium">
                    <CheckSquare size={10} className="text-emerald-500" />
                    {performer.deals} {performer.deals === 1 ? 'deal' : 'deals'} won
                  </span>
                </div>
              </div>
 
              {/* Right Performance Metrics */}
              <div className="text-right flex-shrink-0">
                <span className="text-xs font-extrabold text-gray-900 dark:text-white block">
                  {formatINR(performer.revenue)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
