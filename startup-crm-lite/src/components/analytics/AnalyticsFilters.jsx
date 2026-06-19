import { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

/**
 * AnalyticsFilters Component
 * Allows filtering dashboard metrics by various time periods or a custom date range.
 *
 * @param {Object} props
 * @param {string} props.period - Current active period ('7d', '30d', '90d', '1y', 'custom')
 * @param {string|null} props.customStart - Custom start date string
 * @param {string|null} props.customEnd - Custom end date string
 * @param {function} props.onPeriodChange - Callback when period changes
 * @param {function} props.onCustomRangeChange - Callback for custom range selection
 */
export default function AnalyticsFilters({
  period,
  customStart,
  customEnd,
  onPeriodChange,
  onCustomRangeChange,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [startDate, setStartDate] = useState(customStart || '');
  const [endDate, setEndDate] = useState(customEnd || '');

  const periods = [
    { label: 'Last 7 Days', value: '7d' },
    { label: 'Last 30 Days', value: '30d' },
    { label: 'Last 90 Days', value: '90d' },
    { label: 'This Year', value: '1y' },
    { label: 'Custom Range', value: 'custom' },
  ];

  const currentPeriodLabel =
    periods.find((p) => p.value === period)?.label || 'Select Period';

  const handlePeriodSelect = (val) => {
    setShowDropdown(false);
    if (val === 'custom') {
      onPeriodChange('custom');
    } else {
      onPeriodChange(val);
    }
  };

  const handleApplyCustom = (e) => {
    e.preventDefault();
    if (startDate && endDate) {
      onCustomRangeChange(new Date(startDate), new Date(endDate));
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 z-30 relative">
      {/* Dropdown Selector */}
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center justify-between gap-3 min-w-[170px] px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold rounded-xl text-gray-750 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/60 shadow-sm cursor-pointer transition-colors"
        >
          <span className="flex items-center gap-2">
            <Calendar size={16} className="text-gray-400" />
            <span>{currentPeriodLabel}</span>
          </span>
          <ChevronDown size={14} className="text-gray-400" />
        </button>
 
        {showDropdown && (
          <>
            <div
              className="fixed inset-0 z-40 cursor-default"
              onClick={() => setShowDropdown(false)}
            />
            <div className="absolute right-0 left-0 sm:left-auto sm:right-0 mt-2 w-56 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg z-50 overflow-hidden py-1.5 animate-fade-in">
              {periods.map((p) => (
                <button
                  key={p.value}
                  onClick={() => handlePeriodSelect(p.value)}
                  className={`w-full px-4 py-2 text-left text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700/60 transition-colors cursor-pointer ${
                    period === p.value
                      ? 'text-primary dark:text-blue-400 bg-blue-50/40 dark:bg-gray-900/40 font-semibold'
                      : 'text-gray-650 dark:text-gray-300'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
 
      {/* Custom Date Form (Visible when period is 'custom') */}
      {period === 'custom' && (
        <form
          onSubmit={handleApplyCustom}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 animate-fade-in bg-white dark:bg-gray-800 p-2.5 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="px-2.5 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-xs font-medium rounded-lg text-gray-750 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <span className="text-gray-400 text-xs">to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="px-2.5 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-xs font-medium rounded-lg text-gray-750 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="px-3.5 py-1.5 bg-primary hover:bg-blue-600 text-white font-semibold text-xs rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
          >
            Apply
          </button>
        </form>
      )}
    </div>
  );
}
