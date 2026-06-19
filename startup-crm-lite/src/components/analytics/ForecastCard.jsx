import { TrendingUp, ArrowUpRight, ArrowDownRight, Compass } from 'lucide-react';

/**
 * ForecastCard Component
 * Displays predicted sales revenue for the next month with a confidence index and growth trend.
 *
 * @param {Object} props
 * @param {Object} props.forecast - Forecast metrics containing prediction value, confidence, and trend
 */
export default function ForecastCard({ forecast }) {
  const { forecast: predictedVal = 0, confidence = 0, trend = 0 } = forecast || {};
  const isPositive = trend > 0;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-[200px]">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            Revenue Forecast
          </span>
          <p className="text-xs text-gray-450 mt-1">Predicted revenue next month</p>
        </div>
        <div className="p-2 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 rounded-lg">
          <TrendingUp size={18} />
        </div>
      </div>
 
      <div className="my-2.5">
        <p className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-none">
          ₹{predictedVal.toLocaleString('en-IN')}
        </p>
      </div>
 
      {/* Confidence & Trend Meters */}
      <div className="border-t border-gray-100 dark:border-gray-700 pt-3 flex flex-col gap-2">
        {/* Confidence Meter */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-450 flex items-center gap-1">
            <Compass size={12} className="text-gray-400" />
            Confidence Index
          </span>
          <span className="font-bold text-gray-700 dark:text-gray-300">{confidence}%</span>
        </div>
        <div className="w-full bg-gray-100 dark:bg-gray-900 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${confidence}%` }}
          />
        </div>
 
        {/* Growth Trend */}
        <div className="flex items-center justify-between text-[11px] font-semibold text-gray-400 mt-1">
          <span>Projected growth rate</span>
          {trend === 0 ? (
            <span className="font-bold text-gray-500">0%</span>
          ) : (
            <span
              className={`flex items-center gap-0.5 font-bold ${
                isPositive
                  ? 'text-emerald-500 dark:text-emerald-400'
                  : 'text-rose-500 dark:text-rose-400'
              }`}
            >
              {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              {Math.abs(trend)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
