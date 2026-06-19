import { memo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { CHART_COLORS } from '../../constants/analyticsColors';
import { TrendingUp } from 'lucide-react';

/**
 * Custom Dot for the line chart.
 */
const CustomDot = (props) => {
  const { cx, cy, value } = props;
  if (value === 0) return null;
  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill={CHART_COLORS.success} stroke="#fff" strokeWidth={2} />
    </g>
  );
};

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
          {d.rate}%
          <span className="text-gray-400 font-medium text-xs ml-1">conversion</span>
        </p>
      </div>
    );
  }
  return null;
};
 
/**
 * LineChartCard — Monthly conversion rate trend.
 */
export default memo(function LineChartCard({ data = [] }) {
  const avgRate = data.length > 0
    ? Math.round(data.reduce((s, d) => s + d.rate, 0) / data.length)
    : 0;
 
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-[380px]">
      {/* Header */}
      <div className="flex items-start justify-between mb-1">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Conversion Trend</h3>
          <p className="text-xs text-gray-450 mt-0.5">Monthly won ÷ total leads ratio</p>
        </div>
        <div className="flex items-center gap-2">
          {avgRate > 0 && (
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-lg">
              Avg {avgRate}%
            </span>
          )}
          <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl">
            <TrendingUp size={16} className="text-emerald-500" />
          </div>
        </div>
      </div>
 
      {data.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm font-medium">
          No conversion data available
        </div>
      ) : (
        <div className="flex-1 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 20, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="conversionGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_COLORS.success} stopOpacity={0.15} />
                  <stop offset="100%" stopColor={CHART_COLORS.success} stopOpacity={0} />
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
                tickFormatter={(v) => `${v}%`}
                domain={[0, 100]}
                tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 500 }}
              />
              {avgRate > 0 && (
                <ReferenceLine
                  y={avgRate}
                  stroke={CHART_COLORS.success}
                  strokeDasharray="5 5"
                  strokeOpacity={0.4}
                  label={{
                    value: `Avg ${avgRate}%`,
                    fill: CHART_COLORS.success,
                    fontSize: 10,
                    fontWeight: 700,
                    position: 'insideTopRight',
                  }}
                />
              )}
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="rate"
                stroke={CHART_COLORS.success}
                strokeWidth={3}
                dot={<CustomDot />}
                activeDot={{ r: 7, fill: CHART_COLORS.success, strokeWidth: 2, stroke: '#fff' }}
                animationDuration={900}
                animationEasing="ease-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
});
