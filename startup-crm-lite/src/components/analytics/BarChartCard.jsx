import { memo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import { CHART_COLORS } from '../../constants/analyticsColors';
import { BarChart2 } from 'lucide-react';

/**
 * Custom Tooltip.
 */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-gray-950/95 border border-gray-700 px-3.5 py-2.5 rounded-xl shadow-2xl text-xs backdrop-blur-sm">
        <p className="text-gray-450 font-bold uppercase tracking-wider text-[10px] mb-1.5">{d.month}</p>
        <p className="text-white font-extrabold text-base">
          {d.count}
          <span className="text-gray-400 font-medium text-xs ml-1">
            {d.count === 1 ? 'lead' : 'leads'}
          </span>
        </p>
      </div>
    );
  }
  return null;
};
 
/**
 * BarChartCard — Monthly leads trend with gradient bars.
 */
export default memo(function BarChartCard({ data = [] }) {
  const maxCount = Math.max(...data.map((d) => d.count), 1);
 
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-[380px]">
      {/* Header */}
      <div className="flex items-start justify-between mb-1">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Monthly Leads Trend</h3>
          <p className="text-xs text-gray-450 mt-0.5">New lead volume over the last 6 months</p>
        </div>
        <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded-xl">
          <BarChart2 size={16} className="text-blue-500" />
        </div>
      </div>
 
      {data.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm font-medium">
          No lead data available
        </div>
      ) : (
        <div className="flex-1 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 8, left: -28, bottom: 0 }}>
              <defs>
                <linearGradient id="barGradientBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_COLORS.primary} stopOpacity={1} />
                  <stop offset="100%" stopColor={CHART_COLORS.primary} stopOpacity={0.4} />
                </linearGradient>
                <linearGradient id="barGradientBlueHover" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1D4ED8" stopOpacity={1} />
                  <stop offset="100%" stopColor="#1D4ED8" stopOpacity={0.6} />
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
                tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 500 }}
                allowDecimals={false}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: 'rgba(37, 99, 235, 0.06)', radius: 8 }}
              />
              <Bar
                dataKey="count"
                fill="url(#barGradientBlue)"
                radius={[7, 7, 0, 0]}
                maxBarSize={36}
                animationDuration={900}
                animationEasing="ease-out"
              >
                <LabelList
                  dataKey="count"
                  position="top"
                  style={{ fill: '#64748B', fontSize: '10px', fontWeight: 700 }}
                  formatter={(value) => (value > 0 ? value : '')}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
});
