import React from 'react';

/**
 * PipelineOverview component renders a horizontal stacked progress bar and legend
 * showing the distribution of leads across different pipeline stages.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.leads - The array of lead objects.
 * @param {string} [props.leads[].stage] - The current stage of the lead.
 * @param {string} [props.leads[].status] - Fallback field for lead status.
 * @returns {React.ReactElement} The rendered PipelineOverview component.
 */
export default function PipelineOverview({ leads = [] }) {
  // Gracefully handle empty array
  if (!leads || leads.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
          Pipeline Status
        </h2>
        <div className="flex flex-col items-center justify-center py-8 text-slate-400 dark:text-slate-500">
          <p className="text-sm">No lead pipeline data available.</p>
        </div>
      </div>
    );
  }

  // Extract stage/status from each lead
  const stagesMap = {};
  leads.forEach((lead) => {
    // Support both 'stage' and 'status' fields
    const rawStage = lead.stage || lead.status || 'New';
    // Standardize title case (e.g. "proposal sent" -> "Proposal Sent")
    const stage = rawStage
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

    stagesMap[stage] = (stagesMap[stage] || 0) + 1;
  });

  const totalLeads = leads.length;

  // Predefined color palette map for specific stages
  const colorMap = {
    'New': {
      bg: 'bg-emerald-500',
      text: 'text-emerald-500',
      border: 'border-emerald-500',
      dotBg: 'bg-emerald-500',
      pill: 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400'
    },
    'Contacted': {
      bg: 'bg-indigo-500',
      text: 'text-indigo-500',
      border: 'border-indigo-500',
      dotBg: 'bg-indigo-500',
      pill: 'bg-indigo-50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-400'
    },
    'Qualified': {
      bg: 'bg-blue-600',
      text: 'text-primary',
      border: 'border-blue-600',
      dotBg: 'bg-blue-600',
      pill: 'bg-blue-50 dark:bg-blue-950/20 text-primary dark:text-blue-400'
    },
    'Proposal Sent': {
      bg: 'bg-amber-500',
      text: 'text-warning',
      border: 'border-amber-500',
      dotBg: 'bg-amber-500',
      pill: 'bg-amber-50 dark:bg-amber-950/20 text-warning dark:text-amber-400'
    },
    'Negotiating': {
      bg: 'bg-purple-500',
      text: 'text-purple-500',
      border: 'border-purple-500',
      dotBg: 'bg-purple-500',
      pill: 'bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-400'
    },
    'Won': {
      bg: 'bg-emerald-600',
      text: 'text-emerald-600',
      border: 'border-emerald-600',
      dotBg: 'bg-emerald-600',
      pill: 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400'
    },
    'Closed Won': {
      bg: 'bg-emerald-600',
      text: 'text-emerald-600',
      border: 'border-emerald-600',
      dotBg: 'bg-emerald-600',
      pill: 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400'
    },
    'Lost': {
      bg: 'bg-rose-500',
      text: 'text-danger',
      border: 'border-rose-500',
      dotBg: 'bg-rose-500',
      pill: 'bg-rose-50 dark:bg-rose-950/20 text-danger dark:text-rose-400'
    },
    'Closed Lost': {
      bg: 'bg-rose-500',
      text: 'text-danger',
      border: 'border-rose-500',
      dotBg: 'bg-rose-500',
      pill: 'bg-rose-50 dark:bg-rose-950/20 text-danger dark:text-rose-400'
    }
  };

  // Fallback palettes for any other dynamic stages (cyan, pink, teal, etc.)
  const dynamicPalettes = [
    { bg: 'bg-cyan-500', text: 'text-cyan-500', dotBg: 'bg-cyan-500', pill: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/20 dark:text-cyan-400' },
    { bg: 'bg-pink-500', text: 'text-pink-500', dotBg: 'bg-pink-500', pill: 'bg-pink-50 text-pink-700 dark:bg-pink-950/20 dark:text-pink-400' },
    { bg: 'bg-teal-500', text: 'text-teal-500', dotBg: 'bg-teal-500', pill: 'bg-teal-50 text-teal-700 dark:bg-teal-950/20 dark:text-teal-400' },
    { bg: 'bg-violet-500', text: 'text-violet-500', dotBg: 'bg-violet-500', pill: 'bg-violet-50 text-violet-700 dark:bg-violet-950/20 dark:text-violet-400' }
  ];

  // Generate segment metadata
  const segments = Object.keys(stagesMap).map((stage, idx) => {
    const count = stagesMap[stage];
    const percentage = Math.round((count / totalLeads) * 100);
    const colorClasses = colorMap[stage] || dynamicPalettes[idx % dynamicPalettes.length];

    return {
      stage,
      count,
      percentage,
      ...colorClasses
    };
  });

  // Sort segments by sales pipeline flow logic if possible, or count desc
  const predefinedOrder = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Negotiating', 'Won', 'Closed Won', 'Lost', 'Closed Lost'];
  segments.sort((a, b) => {
    const indexA = predefinedOrder.indexOf(a.stage);
    const indexB = predefinedOrder.indexOf(b.stage);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return b.count - a.count;
  });

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Pipeline Distribution
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            Active distribution across {totalLeads} total leads
          </p>
        </div>
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
          Sales Funnel
        </span>
      </div>

      {/* Stacked Segment Progress Bar */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 h-4 rounded-full overflow-hidden flex shadow-inner mb-6">
        {segments.map((segment) => (
          <div
            key={segment.stage}
            style={{ width: `${segment.percentage}%` }}
            className={`${segment.bg} h-full transition-all duration-500 relative group cursor-pointer`}
            title={`${segment.stage}: ${segment.count} (${segment.percentage}%)`}
          >
            {/* Visual shine overlay on segments */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Legend Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {segments.map((segment) => (
          <div
            key={segment.stage}
            className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-850 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className={`w-3 h-3 rounded-full shrink-0 ${segment.dotBg}`} />
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 truncate">
                {segment.stage}
              </span>
            </div>
            <div className="flex items-center gap-1.5 ml-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                {segment.count}
              </span>
              <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                ({segment.percentage}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
