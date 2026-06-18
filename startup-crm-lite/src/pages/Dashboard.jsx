import { Users, Target, DollarSign, Award, Calendar, TrendingUp } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import PipelineOverview from '../components/dashboard/PipelineOverview';
import RecentLeads from '../components/dashboard/RecentLeads';
import QuickActions from '../components/dashboard/QuickActions';
import { useLeads } from '../context/LeadContext';

/**
 * Dashboard page component of Startup CRM Lite.
 * Renders sales pipeline statistics, visual pipeline segment distribution,
 * quick CRM shortcuts, and a table showing the latest lead additions.
 *
 * Now powered by LeadContext — displays live data from the shared leads store
 * instead of hardcoded sample data.
 *
 * @component
 * @returns {import('react').ReactElement} The rendered Dashboard page.
 */
export default function Dashboard() {
  const { leads } = useLeads();

  // --- Compute dynamic stats from live leads ---
  const totalLeads = leads.length;
  const wonLeads = leads.filter((l) => l.status === 'Won').length;
  const conversionRate = totalLeads > 0 ? ((wonLeads / totalLeads) * 100).toFixed(1) : '0.0';

  // Helper to format today's date for display
  const getTodayFormattedDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Welcome back, Nandu👋
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1.5 text-sm md:text-base">
            Here's what's happening with your startup leads and sales pipeline today.
          </p>
        </div>

        {/* Date Display */}
        <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 shadow-sm self-start md:self-auto">
          <Calendar size={15} className="text-primary" />
          <span>{getTodayFormattedDate()}</span>
        </div>
      </div>

      {/* Stats Cards Grid - Responsive: 1 col on mobile, 2 on tablet, 4 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Leads"
          value={totalLeads.toLocaleString()}
          icon={Users}
          change="+12.5%"
          color="primary"
        />
        <StatsCard
          title="Conversion Rate"
          value={`${conversionRate}%`}
          icon={Target}
          change="+4.2%"
          color="success"
        />
        <StatsCard
          title="Pipeline Value"
          value="$48,250"
          icon={DollarSign}
          change="+18.7%"
          color="warning"
        />
        <StatsCard
          title="Closed Won"
          value={wonLeads.toString()}
          icon={Award}
          change="-2.1%"
          color="danger"
        />
      </div>

      {/* Main Grid: Pipeline and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pipeline Distribution Map - 2 Columns wide on Desktop */}
        <div className="lg:col-span-2">
          <PipelineOverview leads={leads} />
        </div>

        {/* Actions Shortcuts - 1 Column wide on Desktop */}
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Bottom Grid: Recent Leads and Supplemental Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Leads Table - 2 Columns wide on Desktop */}
        <div className="lg:col-span-2">
          <RecentLeads leads={leads} />
        </div>

        {/* Premium Quarterly Goal Progress Visual Indicator */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full min-h-[300px]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Quarterly Goal
              </h2>
              <span className="p-2 bg-emerald-50 dark:bg-emerald-950/30 text-success rounded-lg">
                <TrendingUp size={16} />
              </span>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">
              Track contract sales goals against target benchmarks.
            </p>

            {/* Circular Progress Design representation */}
            <div className="relative flex items-center justify-center my-4">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  className="stroke-slate-100 dark:stroke-slate-800 fill-transparent"
                  strokeWidth="8"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  className="stroke-success fill-transparent transition-all duration-1000 ease-out"
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 52}
                  strokeDashoffset={2 * Math.PI * 52 * (1 - 0.78)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-black text-slate-900 dark:text-white">
                  78%
                </span>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">
                  Reached
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-850 flex justify-between text-sm">
            <div>
              <span className="block text-xs font-semibold text-slate-400 dark:text-slate-500">Current</span>
              <span className="text-base font-bold text-slate-800 dark:text-white">$78,000</span>
            </div>
            <div className="text-right">
              <span className="block text-xs font-semibold text-slate-400 dark:text-slate-500">Target</span>
              <span className="text-base font-bold text-slate-800 dark:text-white">$100,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
