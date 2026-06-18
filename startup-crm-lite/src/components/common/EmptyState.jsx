import { Search, Sparkles, RefreshCw } from 'lucide-react';

/**
 * EmptyState Component
 * Displays a friendly screen when no leads are available, differentiating between
 * an empty database vs. empty search/filter results.
 * 
 * @param {Object} props
 * @param {number} props.totalLeadsCount - The unfiltered total count of leads
 * @param {function} props.onClear - Callback to clear search and status filters
 * @param {function} props.onAddLead - Callback to trigger the add lead modal
 */
export default function EmptyState({ totalLeadsCount, onClear, onAddLead }) {
  const isFilteringActive = totalLeadsCount > 0;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-12 text-center shadow-sm shadow-slate-100/50 dark:shadow-none animate-fade-in flex flex-col items-center justify-center min-h-[350px]">
      <div className="max-w-md mx-auto flex flex-col items-center gap-4">
        {isFilteringActive ? (
          <>
            <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/20 text-amber-500 flex items-center justify-center shadow-sm">
              <Search className="w-6.5 h-6.5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Leads Found</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              We couldn't find any leads matching your current search query or active filter criteria. Try adjusting your query or resetting the filter.
            </p>
            <button
              onClick={onClear}
              className="mt-2 inline-flex items-center gap-2 px-4.5 py-2 bg-slate-100 hover:bg-slate-205 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 font-semibold rounded-xl text-sm transition-all duration-150 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 animate-spin-once" />
              <span>Clear Search & Filters</span>
            </button>
          </>
        ) : (
          <>
            <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/20 text-primary flex items-center justify-center shadow-sm">
              <Sparkles className="w-6.5 h-6.5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Start Your Pipeline</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Your leads list is currently empty. Get started by registering your first lead!
            </p>
            <button
              onClick={onAddLead}
              className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-semibold shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 hover:bg-blue-600 cursor-pointer"
            >
              <span>Add Your First Lead</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
