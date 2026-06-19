import { memo } from 'react';
import {
  Users,
  CheckCircle2,
  TrendingUp,
  Coins,
  Clock,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from 'lucide-react';
import { formatINR, getPercentChange } from '../../utils/analyticsHelpers';

/**
 * TrendIndicator — compact badge showing change vs previous period.
 */
const TrendIndicator = memo(function TrendIndicator({ change, isNegativeGood = false }) {
  if (change === 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-900 text-gray-400">
        <Minus size={10} />
        <span>0% vs prev</span>
      </span>
    );
  }
  const isPositive = change > 0;
  const isGood = isNegativeGood ? !isPositive : isPositive;
  const colorClass = isGood
    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
    : 'bg-rose-500/10 text-rose-600 dark:text-rose-400';
  const Icon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <span className={`inline-flex items-center gap-0.5 text-[11px] font-semibold px-2 py-0.5 rounded-full ${colorClass}`}>
      <Icon size={11} />
      <span>{Math.abs(change)}% vs prev</span>
    </span>
  );
});

/**
 * StatCard — individual KPI card with gradient accent and animation.
 */
const StatCard = memo(function StatCard({ card, index }) {
  const Icon = card.icon;
  const staggerDelays = ['0ms', '60ms', '120ms', '180ms', '240ms', '300ms'];
  const delay = staggerDelays[index] || '0ms';

  return (
    <div
      className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 flex flex-col justify-between overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 animate-fade-in-up"
      style={{ animationDelay: delay, animationFillMode: 'both' }}
    >
      {/* Subtle gradient accent background */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl ${card.hoverBg}`}
      />
 
      {/* Card content */}
      <div className="relative z-10 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 dark:text-gray-500">
            {card.title}
          </span>
          <div className={`p-2 rounded-xl ${card.iconBg} transition-transform duration-200 group-hover:scale-110`}>
            <Icon size={15} className={card.iconColor} />
          </div>
        </div>
 
        <div>
          <p className={`text-2xl font-extrabold tracking-tight leading-none ${card.valueColor || 'text-gray-900 dark:text-white'}`}>
            {card.value}
          </p>
          <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1.5 font-medium">
            {card.desc}
          </p>
        </div>
      </div>
 
      {/* Bottom trend bar */}
      <div className="relative z-10 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between">
        <TrendIndicator change={card.change} isNegativeGood={card.isNegativeGood} />
      </div>

      {/* Bottom color stripe */}
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${card.stripe} opacity-60 group-hover:opacity-100 transition-opacity`} />
    </div>
  );
});

/**
 * StatsCards — renders the grid of 6 KPI summary cards.
 */
export default memo(function StatsCards({ kpis }) {
  const {
    totalLeads = 0,
    prevTotalLeads = 0,
    conversionRate = 0,
    prevConversionRate = 0,
    pipelineValue = 0,
    prevPipelineValue = 0,
    wonRevenue = 0,
    prevWonRevenue = 0,
    avgSalesCycle = 0,
    prevAvgSalesCycle = 0,
    lostRate = 0,
    prevLostRate = 0,
  } = kpis || {};

  const cards = [
    {
      title: 'Total Leads',
      value: totalLeads.toLocaleString('en-IN'),
      icon: Users,
      iconBg: 'bg-blue-50 dark:bg-blue-950/30',
      iconColor: 'text-blue-500',
      hoverBg: 'bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-950/20 dark:to-transparent',
      stripe: 'bg-blue-400',
      change: getPercentChange(totalLeads, prevTotalLeads),
      isNegativeGood: false,
      desc: 'leads in current period',
    },
    {
      title: 'Conversion Rate',
      value: `${conversionRate}%`,
      icon: TrendingUp,
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/30',
      iconColor: 'text-emerald-500',
      hoverBg: 'bg-gradient-to-br from-emerald-50/50 to-transparent dark:from-emerald-950/20 dark:to-transparent',
      stripe: 'bg-emerald-400',
      change: getPercentChange(conversionRate, prevConversionRate),
      isNegativeGood: false,
      desc: 'won ÷ total leads',
    },
    {
      title: 'Pipeline Value',
      value: formatINR(pipelineValue),
      icon: Coins,
      iconBg: 'bg-amber-50 dark:bg-amber-950/30',
      iconColor: 'text-amber-500',
      hoverBg: 'bg-gradient-to-br from-amber-50/50 to-transparent dark:from-amber-950/20 dark:to-transparent',
      stripe: 'bg-amber-400',
      change: getPercentChange(pipelineValue, prevPipelineValue),
      isNegativeGood: false,
      desc: 'active deals value',
    },
    {
      title: 'Won Revenue',
      value: formatINR(wonRevenue),
      icon: CheckCircle2,
      iconBg: 'bg-violet-50 dark:bg-violet-950/30',
      iconColor: 'text-violet-500',
      hoverBg: 'bg-gradient-to-br from-violet-50/50 to-transparent dark:from-violet-950/20 dark:to-transparent',
      stripe: 'bg-violet-400',
      change: getPercentChange(wonRevenue, prevWonRevenue),
      isNegativeGood: false,
      desc: 'total closed-won revenue',
    },
    {
      title: 'Avg Sales Cycle',
      value: `${avgSalesCycle}d`,
      icon: Clock,
      iconBg: 'bg-purple-50 dark:bg-purple-950/30',
      iconColor: 'text-purple-500',
      hoverBg: 'bg-gradient-to-br from-purple-50/50 to-transparent dark:from-purple-950/20 dark:to-transparent',
      stripe: 'bg-purple-400',
      change: getPercentChange(avgSalesCycle, prevAvgSalesCycle),
      isNegativeGood: true,
      desc: 'avg days to close',
    },
    {
      title: 'Lost Rate',
      value: `${lostRate}%`,
      icon: AlertCircle,
      iconBg: 'bg-rose-50 dark:bg-rose-950/30',
      iconColor: 'text-rose-500',
      hoverBg: 'bg-gradient-to-br from-rose-50/50 to-transparent dark:from-rose-950/20 dark:to-transparent',
      stripe: 'bg-rose-400',
      change: getPercentChange(lostRate, prevLostRate),
      isNegativeGood: true,
      desc: 'lost ÷ total leads',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-5">
      {cards.map((card, index) => (
        <StatCard key={card.title} card={card} index={index} />
      ))}
    </div>
  );
});
