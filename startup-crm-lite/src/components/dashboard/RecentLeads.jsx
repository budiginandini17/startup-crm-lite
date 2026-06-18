

/**
 * RecentLeads component displays the latest 5 leads in a clean, responsive table.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.leads - The list of all leads.
 * @param {string} props.leads[].name - The name of the lead.
 * @param {string} props.leads[].company - The company the lead belongs to.
 * @param {string} [props.leads[].stage] - The pipeline stage of the lead.
 * @param {string} [props.leads[].status] - Fallback field for lead stage.
 * @param {string} [props.leads[].dateAdded] - The date when the lead was added.
 * @returns {React.ReactElement} The rendered RecentLeads table.
 */
export default function RecentLeads({ leads = [] }) {
  // Gracefully handle empty array
  if (!leads || leads.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
          Recent Leads
        </h2>
        <div className="flex flex-col items-center justify-center py-10 text-slate-400 dark:text-slate-500">
          <p className="text-sm">No leads in the system yet.</p>
        </div>
      </div>
    );
  }

  // Sort by date added (descending) if date exists, otherwise fallback to existing order and slice last 5
  // Supports both 'createdAt' (new schema) and 'dateAdded' (legacy) field names
  const processedLeads = [...leads]
    .sort((a, b) => {
      const dateA = new Date(a.createdAt || a.dateAdded || 0);
      const dateB = new Date(b.createdAt || b.dateAdded || 0);
      return dateB - dateA;
    })
    .slice(0, 5);

  /**
   * Generates initials for the avatar icon.
   * @param {string} name - Full name of the lead.
   * @returns {string} Initials (up to 2 characters).
   */
  const getInitials = (name) => {
    if (!name) return '??';
    return name
      .trim()
      .split(/\s+/)
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  /**
   * Formats the date string into a localized readable format.
   * @param {string} dateString - Date representation.
   * @returns {string} Formatted date.
   */
  const formatDate = (dateString) => {
    if (!dateString) return 'Just now';
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch {
      return dateString;
    }
  };

  // Status/stage color styling mapping matching leads page & custom CSS theme
  const getBadgeStyle = (stage) => {
    const raw = (stage || 'New').toLowerCase().replace(/\s+/g, '');
    switch (raw) {
      case 'new':
        return 'bg-emerald-50 text-success border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30';
      case 'contacted':
        return 'bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-950/20 dark:text-indigo-400 dark:border-indigo-900/30';
      case 'qualified':
        return 'bg-blue-50 text-primary border-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30';
      case 'proposalsent':
        return 'bg-amber-50 text-warning border-amber-100 dark:bg-amber-950/20 dark:text-warning dark:border-amber-900/30';
      case 'negotiating':
        return 'bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-900/30';
      case 'won':
      case 'closedwon':
        return 'bg-emerald-50 text-success border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30';
      case 'lost':
      case 'closedlost':
        return 'bg-rose-50 text-danger border-rose-100 dark:bg-rose-950/20 dark:text-danger dark:border-rose-900/30';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700/50';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-slate-100 dark:border-slate-850 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Recent Leads
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            Latest 5 leads added to your CRM
          </p>
        </div>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/40 border-b border-slate-150 dark:border-slate-850 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date Added</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
            {processedLeads.map((lead) => {
              const stage = lead.stage || lead.status || 'New';
              return (
                <tr
                  key={lead.id}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors duration-250 group"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-slate-800 text-primary dark:text-blue-400 font-bold text-xs flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-250 border border-blue-100/30 dark:border-slate-700/50">
                        {getInitials(lead.name)}
                      </div>
                      <span className="font-semibold text-slate-950 dark:text-white text-sm">
                        {lead.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                    {lead.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border tracking-wide uppercase ${getBadgeStyle(
                        stage
                      )}`}
                    >
                      {stage}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-slate-400 dark:text-slate-500">
                    {formatDate(lead.createdAt || lead.dateAdded)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
