import { useMemo } from 'react';
import { Calendar } from 'lucide-react';

/**
 * Gets the Tailwind background color class based on the activity count.
 */
function getHeatmapBgClass(count) {
  if (count === 0) return 'bg-gray-100 dark:bg-gray-800';
  if (count === 1) return 'bg-blue-100 dark:bg-blue-900/40';
  if (count === 2 || count === 3) return 'bg-blue-300 dark:bg-blue-700/65';
  if (count === 4 || count === 5) return 'bg-blue-500 dark:bg-blue-500/85';
  return 'bg-blue-700 dark:bg-blue-400';
}

/**
 * ActivityHeatmap Component
 * Renders a GitHub-style activity contribution calendar for lead creations over the last 12 weeks.
 *
 * @param {Object} props
 * @param {Array}  props.data - Flat array of 84 days activity statistics
 */
export default function ActivityHeatmap({ data = [] }) {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Map 84 flat days → 7 × 12 grid (rows = day-of-week, cols = weeks)
  const grid = useMemo(() => {
    if (!data || data.length === 0) return [];
    return Array.from({ length: 7 }, (_, dayIdx) =>
      Array.from({ length: 12 }, (_, weekIdx) => {
        const targetWeek = 11 - weekIdx;
        const dayData = data.find(
          (item) => item.day === dayIdx && item.week === targetWeek
        );
        return (
          dayData || {
            date: '',
            count: 0,
            day: dayIdx,
            week: targetWeek,
            label: '',
          }
        );
      })
    );
  }, [data]);

  // Month labels above the columns
  const monthLabels = useMemo(() => {
    if (!data || data.length === 0) return [];
    const labels = [];
    let lastMonth = '';
    for (let col = 0; col < 12; col++) {
      const targetWeek = 11 - col;
      const sundayData = data.find(
        (item) => item.day === 0 && item.week === targetWeek
      );
      if (sundayData?.date) {
        const monthName = new Date(sundayData.date).toLocaleString('en-IN', {
          month: 'short',
        });
        if (monthName !== lastMonth) {
          labels.push({ colIndex: col, text: monthName });
          lastMonth = monthName;
        }
      }
    }
    return labels;
  }, [data]);

  const totalActivities = useMemo(
    () => data.reduce((sum, item) => sum + item.count, 0),
    [data]
  );

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col gap-5">

      {/* ── Header ────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            Lead Activity Heatmap
          </h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            Creation volume of leads over the last 12 weeks
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 font-semibold bg-gray-50 dark:bg-gray-700/50 px-2.5 py-1 rounded-lg shrink-0">
          <Calendar size={13} />
          <span>{totalActivities} Leads Total</span>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────────────── */}
      {data.length === 0 ? (
        <div className="flex items-center justify-center py-16 text-gray-400 dark:text-gray-500 text-sm font-medium">
          No activity data available
        </div>
      ) : (
        <div className="flex flex-col gap-4">

          {/* Heatmap grid — horizontally scrollable if needed */}
          <div className="w-full" style={{ overflowX: 'auto', overflowY: 'visible' }}>
            <div className="min-w-[480px] pb-1">

              {/* Month labels */}
              <div className="relative h-5 mb-2 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                {monthLabels.map((lbl, idx) => (
                  <span
                    key={idx}
                    className="absolute"
                    style={{ left: `${32 + lbl.colIndex * 34}px` }}
                  >
                    {lbl.text}
                  </span>
                ))}
              </div>

              {/* Grid rows (7 days of the week) */}
              <div className="flex flex-col gap-2">
                {grid.map((row, rowIdx) => (
                  <div key={rowIdx} className="flex items-center gap-2">

                    {/* Row label — only Mon / Wed / Fri for clean display */}
                    <span className="w-6 shrink-0 text-[10px] font-semibold text-gray-400 dark:text-gray-500 text-left select-none leading-none">
                      {[1, 3, 5].includes(rowIdx) ? weekdays[rowIdx] : ''}
                    </span>

                    {/* Week cells */}
                    <div className="flex items-center gap-2">
                      {row.map((day, colIdx) => (
                        <div key={colIdx} className="group relative">
                          {/* Cell square */}
                          <div
                            className={`w-6 h-6 rounded-md cursor-pointer transition-colors duration-150 ${getHeatmapBgClass(day.count)}`}
                          />

                          {/* Tooltip — renders above the cell */}
                          <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-gray-950/95 dark:bg-gray-900/95 border border-gray-700 px-3 py-2 rounded-xl shadow-2xl text-[10px] text-white font-semibold whitespace-nowrap backdrop-blur-sm">
                            <span className="block font-bold text-gray-400 mb-1.5 border-b border-gray-700/80 pb-1">
                              {day.label}
                            </span>
                            <div className="flex flex-col gap-1 font-medium">
                              <p className="flex justify-between gap-4">
                                <span className="text-gray-400">Leads Created:</span>
                                <span className="text-blue-400 font-bold">{day.details?.leadsCreated || 0}</span>
                              </p>
                              <p className="flex justify-between gap-4">
                                <span className="text-gray-400">Meetings:</span>
                                <span className="text-amber-400 font-bold">{day.details?.meetingsScheduled || 0}</span>
                              </p>
                              <p className="flex justify-between gap-4">
                                <span className="text-gray-400">Calls Logged:</span>
                                <span className="text-purple-400 font-bold">{day.details?.callsLogged || 0}</span>
                              </p>
                              <p className="flex justify-between gap-4 border-t border-gray-700/80 pt-1 font-bold">
                                <span className="text-gray-200">Total:</span>
                                <span className="text-emerald-400">{day.count}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-1.5 text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            <span>Less</span>
            <div className="w-3.5 h-3.5 rounded bg-gray-100 dark:bg-gray-800" />
            <div className="w-3.5 h-3.5 rounded bg-blue-100 dark:bg-blue-900/40" />
            <div className="w-3.5 h-3.5 rounded bg-blue-300 dark:bg-blue-700/65" />
            <div className="w-3.5 h-3.5 rounded bg-blue-500 dark:bg-blue-500/85" />
            <div className="w-3.5 h-3.5 rounded bg-blue-700 dark:bg-blue-400" />
            <span>More</span>
          </div>

        </div>
      )}
    </div>
  );
}
