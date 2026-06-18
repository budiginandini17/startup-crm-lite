import { BarChart3, TrendingUp, Calendar, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function Analytics() {
  const chartData = [
    { month: 'Jan', value: 45, color: 'bg-primary' },
    { month: 'Feb', value: 65, color: 'bg-primary' },
    { month: 'Mar', value: 55, color: 'bg-primary' },
    { month: 'Apr', value: 85, color: 'bg-gradient-to-t from-primary to-blue-400' },
    { month: 'May', value: 70, color: 'bg-primary' },
    { month: 'Jun', value: 95, color: 'bg-gradient-to-t from-primary to-blue-400' },
  ];

  const details = [
    { label: 'Avg Deal Cycle', value: '14 Days', desc: 'Fast-paced growth metric' },
    { label: 'Win Rate', value: '38.4%', desc: 'Deals closed versus pipeline' },
    { label: 'Active Campaigns', value: '12 Live', desc: 'Inbound + outbound efforts' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Performance Analytics
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1.5 text-sm md:text-base">
            Detailed performance logs and key startup metrics.
          </p>
        </div>

        {/* Time Selector Dropdown */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200/80 dark:bg-slate-900 dark:border-slate-800/80 text-sm font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
            <Calendar size={16} className="text-slate-400" />
            <span>Last 30 Days</span>
            <ChevronDown size={14} className="text-slate-400" />
          </button>
        </div>
      </div>

      {/* Stats Detail Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {details.map((detail, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-6 rounded-2xl flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                {detail.label}
              </span>
              <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2 mb-1 tracking-tight">
                {detail.value}
              </p>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-2">
              <CheckCircle2 size={13} className="text-emerald-500" />
              {detail.desc}
            </span>
          </div>
        ))}
      </div>

      {/* Main Performance Chart */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 dark:bg-slate-800 text-primary rounded-lg">
              <BarChart3 size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Monthly Lead Growth
              </h2>
              <span className="text-[11px] text-slate-400">Total volume of qualified opportunities</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full">
            <TrendingUp size={14} />
            <span>+24% Year Over Year</span>
          </div>
        </div>

        {/* Custom CSS Bar Chart */}
        <div className="h-64 flex items-end justify-between gap-4 pt-4 px-2 border-b border-slate-100 dark:border-slate-800">
          {chartData.map((data, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-3 h-full justify-end group">
              {/* Tooltip on Hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded mb-1.5 pointer-events-none">
                {data.value}k
              </div>
              {/* Bar */}
              <div
                className={`w-full rounded-t-xl transition-all duration-500 group-hover:brightness-105 shadow-lg shadow-blue-500/5 ${data.color}`}
                style={{ height: `${data.value}%` }}
              />
              {/* Label */}
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-2">
                {data.month}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
