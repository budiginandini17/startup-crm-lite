
const FILTER_OPTIONS = ['All', 'New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'];

/**
 * FilterBar Component
 * Renders a row of clickable filter buttons with count badges.
 * 
 * @param {Object} props
 * @param {string} props.activeFilter - Current active status filter
 * @param {function} props.onFilterChange - Callback when filter changes
 * @param {Array} props.leads - Array of unfiltered leads to calculate counts
 */
export default function FilterBar({ activeFilter, onFilterChange, leads = [] }) {
  // Calculate counts for each filter option
  const getFilterCount = (filter) => {
    if (filter === 'All') {
      return leads.length;
    }
    return leads.filter((lead) => lead.status === filter).length;
  };

  return (
    <div className="w-full overflow-x-auto pb-1.5 -mb-1.5 scrollbar-thin flex gap-2.5 items-center">
      {FILTER_OPTIONS.map((filter) => {
        const isActive = activeFilter === filter;
        const count = getFilterCount(filter);

        return (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-1.5 border ${
              isActive
                ? 'bg-primary border-primary text-white shadow-md shadow-blue-500/10 hover:bg-blue-600'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <span>{filter}</span>
            <span
              className={`text-xs px-1.5 py-0.5 rounded-md ${
                isActive
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
