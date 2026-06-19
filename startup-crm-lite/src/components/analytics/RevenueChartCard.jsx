import { memo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { formatCompact, formatINR } from '../../utils/analyticsHelpers';
import { DollarSign } from 'lucide-react';

/**
 * Custom Tooltip.
 */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-gray-950/95 border border-gray-700 px-3.5 py-2.5 rounded-xl shadow-2xl text-xs backdrop-blur-sm">
        <p className="text-gray-450 font-bold uppercase tracking-wider text-[10px] mb-1.5">
          {d.month} Revenue
        </p>
        <p className="text-emerald-400 font-extrabold text-base">{formatINR(d.revenue)}</p>
      </div>
    );
  }
  return null;
};
 
/**
 * RevenueChartCard — Area chart for monthly won revenue.
 */
export default memo(function RevenueChartCard({ data = [] }) {
  const totalRevenue = data.reduce((s, d) => s + d.revenue, 0);
  const hasData = data.some((d) => d.revenue > 0);
 
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-[380px]">
      {/* Header */}
      <div className="flex items-start justify-between mb-1">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Revenue Analytics</h3>
          <p className="text-xs text-gray-450 mt-0.5">Monthly closed-won revenue breakdown</p>
        </div>
        <div className="flex items-center gap-2">
          {hasData && (
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-lg">
              {formatINR(totalRevenue)} Total
            </span>
          )}
          <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl">
            <DollarSign size={16} className="text-emerald-500" />
          </div>
        </div>
      </div>
 
      {!hasData ? (
        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm font-medium">
          No won revenue data yet
        </div>
      ) : (
        <div className="flex-1 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22C55E" stopOpacity={0.35} />
                  <stop offset="60%" stopColor="#22C55E" stopOpacity={0.08} />
                  <stop offset="100%" stopColor="#22C55E" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="rgba(148, 163, 184, 0.12)"
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 600 }}
                dy={6}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `₹${formatCompact(v)}`}
                tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 500 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#22C55E"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#revenueAreaGradient)"
                dot={{ r: 4, fill: '#22C55E', stroke: '#fff', strokeWidth: 2 }}
                activeDot={{ r: 7, fill: '#22C55E', stroke: '#fff', strokeWidth: 2 }}
                animationDuration={900}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
});
