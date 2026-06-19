import { memo } from 'react';
import {
  FunnelChart,
  Funnel,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import { CheckCircle, BarChart3 } from 'lucide-react';
import { STATUS_COLORS_FUNNEL } from '../../constants/analyticsColors';

/**
 * Custom Tooltip for the Funnel.
 */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-gray-950/95 border border-gray-700 px-3.5 py-2.5 rounded-xl shadow-2xl text-xs backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: d.fill }} />
          <p className="font-bold text-white tracking-wide">{d.name}</p>
        </div>
        <div className="space-y-0.5">
          <p className="text-gray-300 font-semibold">
            Count: <span className="text-white font-extrabold">{d.value} Leads</span>
          </p>
          <p className="text-gray-300 font-semibold">
            Conversion: <span className="text-emerald-400 font-extrabold">{d.conversionRate}%</span>
          </p>
          {d.dropOff > 0 && (
            <p className="text-gray-300 font-semibold">
              Drop-off: <span className="text-rose-450 font-bold">-{d.dropOff}%</span>
            </p>
          )}
        </div>
      </div>
    );
  }
  return null;
};
 
/**
 * FunnelChartCard — animated Recharts funnel with integrated stage details list.
 */
export default memo(function FunnelChartCard({ data = [] }) {
  const initialCount = data[0]?.count || 0;
  const finalCount = data[data.length - 1]?.count || 0;
  const overallConversion =
    initialCount > 0 ? Math.round((finalCount / initialCount) * 100) : 0;
 
  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-sm flex flex-col items-center justify-center h-[400px] gap-3">
        <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
          <BarChart3 size={24} className="text-gray-400" />
        </div>
        <p className="text-sm font-medium text-gray-400">No funnel data available</p>
      </div>
    );
  }
 
  // Format data for Recharts Funnel
  const chartData = data.map((item) => ({
    value: item.count,
    name: item.stage,
    conversionRate: item.conversionRate,
    dropOff: item.dropOff,
    fill: STATUS_COLORS_FUNNEL[item.stage] || '#2563EB',
  }));
 
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-[400px]">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Sales Pipeline Funnel</h3>
          <p className="text-xs text-gray-450 mt-0.5">Conversion efficiency at each stage</p>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-xl text-xs font-bold">
          <CheckCircle size={12} />
          <span>{overallConversion}% Overall</span>
        </div>
      </div>
 
      {/* Chart + Stage Details List */}
      <div className="flex-1 flex flex-col sm:flex-row items-center gap-6 min-h-0">
        {/* Recharts Funnel Chart */}
        <div className="w-full sm:w-1/2 h-full min-h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <FunnelChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <Tooltip content={<CustomTooltip />} />
              <Funnel
                dataKey="value"
                data={chartData}
                isAnimationActive
                animationDuration={900}
                animationEasing="ease-out"
              >
                <LabelList
                  position="inside"
                  fill="#ffffff"
                  stroke="none"
                  dataKey="value"
                  style={{ fontSize: '11px', fontWeight: 800 }}
                />
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.fill}
                  />
                ))}
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </div>
 
        {/* Legend & Details List */}
        <div className="w-full sm:w-1/2 space-y-2.5 overflow-y-auto max-h-[220px] pr-1">
          {data.map((item, idx) => {
            const color = STATUS_COLORS_FUNNEL[item.stage] || '#94A3B8';
            return (
              <div
                key={item.stage}
                className="flex items-center justify-between p-2.5 bg-gray-50/50 dark:bg-gray-700/20 border border-gray-100/50 dark:border-gray-700/30 rounded-xl"
              >
                {/* Stage Info */}
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-gray-705 dark:text-gray-300 block truncate">
                      {item.stage}
                    </span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
                      {item.count} Leads
                    </span>
                  </div>
                </div>
 
                {/* Conversion metrics */}
                <div className="text-right flex-shrink-0">
                  {idx === 0 ? (
                    <span className="text-[10px] font-bold text-gray-400 uppercase">
                      Baseline
                    </span>
                  ) : (
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-extrabold text-emerald-500 flex items-center">
                        {item.conversionRate}%
                      </span>
                      {item.dropOff > 0 && (
                        <span className="text-[9px] font-semibold text-rose-400">
                          -{item.dropOff}% drop-off
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
 
      {/* Footer info summary */}
      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[10px] font-semibold text-gray-450 uppercase tracking-wider">
        <span>New → Won Flow</span>
        <span>{initialCount} entered • {finalCount} converted</span>
      </div>
    </div>
  );
});
