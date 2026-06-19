import { BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * EmptyAnalyticsState Component
 * Displays a friendly screen when no leads exist in the system to calculate metrics.
 * 
 * @param {Object} props
 * @param {function} [props.onAddLead] - Optional callback to trigger the lead creation modal
 */
export default function EmptyAnalyticsState({ onAddLead }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-12 text-center shadow-sm animate-fade-in flex flex-col items-center justify-center min-h-[400px]">
      <div className="max-w-md mx-auto flex flex-col items-center gap-4 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-955/20 text-primary flex items-center justify-center shadow-sm">
          <BarChart3 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">No analytics available yet</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          Add your first lead to start tracking business performance, pipelines, conversions, and revenue forecasts.
        </p>
        
        {onAddLead ? (
          <button
            onClick={onAddLead}
            className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-semibold shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 hover:bg-blue-600 cursor-pointer"
          >
            Add Lead
          </button>
        ) : (
          <Link
            to="/leads"
            className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-semibold shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 hover:bg-blue-600 cursor-pointer"
          >
            Add Lead
          </Link>
        )}
      </div>
    </div>
  );
}
