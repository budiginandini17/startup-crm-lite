import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { SOURCE_COLORS } from '../../constants/analyticsColors';

/**
 * Custom Tooltip for the Lead Source Chart.
 */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-950 dark:bg-gray-900 border border-gray-700 px-3.5 py-2.5 rounded-xl shadow-lg text-xs font-semibold text-white">
        <p className="text-gray-400 font-bold uppercase tracking-wider text-[10px] mb-1">
          Source
        </p>
        <p className="text-white font-semibold">
          {data.source}:{' '}
          <span className="text-blue-400 font-extrabold">{data.count} Leads</span>
        </p>
      </div>
    );
  }
  return null;
};
 
/**
 * LeadSourceChart Component
 * Renders a horizontal bar chart displaying lead volumes per acquisition source.
 *
 * @param {Object} props
 * @param {Array} props.data - Lead source statistics
 */
export default function LeadSourceChart({ data = [] }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-[360px]">
      <div>
        <h3 className="text-base font-bold text-gray-900 dark:text-white">
          Lead Sources
        </h3>
        <p className="text-xs text-gray-450 mt-1">
          Distribution of opportunities by marketing and outreach channels
        </p>
      </div>
 
      {data.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm font-medium">
          No lead source data
        </div>
      ) : (
        <div className="flex-1 w-full mt-4">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 10, right: 15, left: -15, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke="rgba(148, 163, 184, 0.15)"
              />
              <XAxis
                type="number"
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#94A3B8', fontSize: 11, fontSemiBold: true }}
                allowDecimals={false}
              />
              <YAxis
                dataKey="source"
                type="category"
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 500 }}
                width={75}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148, 163, 184, 0.05)', radius: 4 }} />
              <Bar
                dataKey="count"
                radius={[0, 6, 6, 0]}
                maxBarSize={18}
                animationDuration={1000}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={SOURCE_COLORS[index % SOURCE_COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
