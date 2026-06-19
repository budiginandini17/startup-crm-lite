import { useState, useEffect } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';
import AnalyticsFilters from '../components/analytics/AnalyticsFilters';
import StatsCards from '../components/analytics/StatsCards';
import PieChartCard from '../components/analytics/PieChartCard';
import FunnelChartCard from '../components/analytics/FunnelChartCard';
import BarChartCard from '../components/analytics/BarChartCard';
import LineChartCard from '../components/analytics/LineChartCard';
import RevenueChartCard from '../components/analytics/RevenueChartCard';
import LeadSourceChart from '../components/analytics/LeadSourceChart';
import SalesVelocityCard from '../components/analytics/SalesVelocityCard';
import ForecastCard from '../components/analytics/ForecastCard';
import ActivityHeatmap from '../components/analytics/ActivityHeatmap';
import TopPerformersCard from '../components/analytics/TopPerformersCard';
import EmptyAnalyticsState from '../components/analytics/EmptyAnalyticsState';
import LoadingSkeleton from '../components/analytics/LoadingSkeleton';

/**
 * Analytics Page
 * The main container for the Advanced Analytics Dashboard module.
 * Incorporates simulated loading transitions and structural responsive grids.
 */
export default function Analytics() {
  const {
    leads,
    period,
    customStart,
    customEnd,
    handlePeriodChange,
    handleCustomRange,
    kpis,
    statusDistribution,
    monthlyLeads,
    conversionByMonth,
    revenueByMonth,
    leadSourceStats,
    funnelData,
    salesVelocity,
    prevSalesVelocity,
    forecast,
    topPerformers,
    heatmapData,
    isEmpty,
  } = useAnalytics();

  const [isLoading, setIsLoading] = useState(true);

  // Simulate a loading transition on mount to avoid visual pop-in
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isEmpty) {
    return <EmptyAnalyticsState />;
  }

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Analytics Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Analytics Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1.5 text-sm md:text-base">
            Track sales performance and growth trends.
          </p>
        </div>

        {/* Filters Selectors */}
        <AnalyticsFilters
          period={period}
          customStart={customStart}
          customEnd={customEnd}
          onPeriodChange={handlePeriodChange}
          onCustomRangeChange={handleCustomRange}
        />
      </div>

      {/* KPI Stats Cards Section — 2 cols on tablet, 4 on desktop */}
      <StatsCards kpis={kpis} />

      {/* Section 1: Lead Distribution & Funnel — 1→2→2 cols */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PieChartCard data={statusDistribution} />
        <FunnelChartCard data={funnelData} />
      </div>

      {/* Section 2: Monthly Leads & Conversion — 1→2→2 cols */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BarChartCard data={monthlyLeads} />
        <LineChartCard data={conversionByMonth} />
      </div>

      {/* Section 3: Revenue & Lead Sources — 1→2→2 cols */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RevenueChartCard data={revenueByMonth} />
        <LeadSourceChart data={leadSourceStats} />
      </div>

      {/* Section 4: Heatmap full-width, then Top Performers alongside Forecast & Velocity */}
      {/* On XL: Heatmap takes 2/3, Top Performers takes 1/3 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <ActivityHeatmap data={heatmapData} />
        </div>
        <TopPerformersCard data={topPerformers} />
      </div>

      {/* Section 5: Forecast & Sales Velocity — side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ForecastCard forecast={forecast} />
        <SalesVelocityCard velocity={salesVelocity} prevVelocity={prevSalesVelocity} />
      </div>
    </div>
  );
}
