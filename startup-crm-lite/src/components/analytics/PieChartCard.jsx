import { useState, memo } from 'react';
import {
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';

/**
 * Custom active shape — expands + adds inner glow on hover.
 */
const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 2}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.95}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={outerRadius + 12}
        outerRadius={outerRadius + 16}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.3}
      />
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
      <div className="bg-gray-950/95 dark:bg-gray-900 border border-gray-700 px-4 py-3 rounded-2xl shadow-2xl text-xs backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: d.fill }} />
          <p className="font-bold text-white tracking-wide">{d.name}</p>
        </div>
        <p className="text-gray-300 font-semibold">
          {d.value} <span className="text-gray-400">leads</span>
        </p>
        <p className="font-extrabold mt-0.5" style={{ color: d.fill }}>
          {d.percentage}%
        </p>
      </div>
    );
  }
  return null;
};

/**
 * PieChartCard — animated doughnut chart with interactive legend.
 */
export default memo(function PieChartCard({ data = [] }) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const totalLeads = data.reduce((sum, item) => sum + item.value, 0);

  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-sm flex flex-col items-center justify-center h-[400px] gap-3">
        <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <PieChartIcon size={24} className="text-gray-400" />
        </div>
        <p className="text-sm font-medium text-gray-400">No distribution data</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-[400px]">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Lead Distribution</h3>
          <p className="text-xs text-gray-400 mt-0.5">Leads by current pipeline stage</p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-950/30 text-blue-500 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg">
          {totalLeads} Total
        </div>
      </div>

      {/* Chart + Legend */}
      <div className="flex-1 flex flex-col sm:flex-row items-center gap-6 min-h-0">
        {/* Doughnut */}
        <div className="relative flex-shrink-0 w-52 h-52 flex items-center justify-center">
          <ResponsiveContainer width={208} height={208}>
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={62}
                outerRadius={82}
                dataKey="value"
                onMouseEnter={(_, idx) => setActiveIndex(idx)}
                onMouseLeave={() => setActiveIndex(-1)}
                paddingAngle={3}
                animationBegin={0}
                animationDuration={900}
                animationEasing="ease-out"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.fill}
                    opacity={activeIndex === -1 || activeIndex === index ? 1 : 0.45}
                    style={{ transition: 'opacity 0.2s' }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
            <span className="text-3xl font-black text-gray-900 dark:text-white leading-none">
              {activeIndex >= 0 ? data[activeIndex]?.value : totalLeads}
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">
              {activeIndex >= 0 ? data[activeIndex]?.name : 'Total'}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 w-full space-y-2.5 overflow-y-auto pr-1">
          {data.map((item, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all duration-200 ${
                activeIndex === index
                  ? 'bg-gray-50 dark:bg-gray-700/60 shadow-sm'
                  : 'hover:bg-gray-50/60 dark:hover:bg-gray-700/30'
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(-1)}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="w-3 h-3 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 truncate max-w-[110px]">
                  {item.name}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs font-extrabold text-gray-900 dark:text-white">
                  {item.value}
                </span>
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                  style={{ backgroundColor: `${item.fill}20`, color: item.fill }}
                >
                  {item.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
