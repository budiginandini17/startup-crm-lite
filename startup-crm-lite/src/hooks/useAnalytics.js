import { useState, useMemo, useCallback } from 'react';
import { useLeads } from '../context/LeadContext';
import {
  filterLeadsByPeriod,
  getStatusDistribution,
  getMonthlyLeads,
  getConversionByMonth,
  getRevenueByMonth,
  getPipelineValue,
  getWonRevenue,
  getConversionRate,
  getAverageSalesCycle,
  getLostRate,
  getLeadSourceStats,
  getFunnelData,
  getSalesVelocity,
  getForecastRevenue,
  getTopPerformers,
  getActivityHeatmapData,
} from '../utils/analyticsHelpers';

/**
 * useAnalytics — central analytics hook.
 * Computes all dashboard metrics reactively from lead data + filter state.
 * All computations are memoized to avoid unnecessary re-renders.
 */
export function useAnalytics() {
  const { leads } = useLeads();

  // ── Filter State ───────────────────────────────────────────────
  const [period, setPeriod] = useState('30d');
  const [customStart, setCustomStart] = useState(null);
  const [customEnd, setCustomEnd] = useState(null);

  // ── Filtered Leads ─────────────────────────────────────────────
  const filteredLeads = useMemo(
    () => filterLeadsByPeriod(leads, period, customStart, customEnd),
    [leads, period, customStart, customEnd]
  );

  // Previous period leads (same length, one period back) for comparisons
  const previousLeads = useMemo(() => {
    const periodMap = { '7d': 14, '30d': 60, '90d': 180, '1y': 730 };
    const days = periodMap[period];
    if (!days) return [];
    const endDate = new Date();
    endDate.setDate(endDate.getDate() - (days / 2));
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - (days / 2));
    return leads.filter((l) => {
      if (!l?.createdAt) return false;
      const d = new Date(l.createdAt);
      return d >= startDate && d <= endDate;
    });
  }, [leads, period]);

  // ── KPI Metrics ────────────────────────────────────────────────
  const kpis = useMemo(() => ({
    totalLeads: filteredLeads.length,
    prevTotalLeads: previousLeads.length,
    conversionRate: getConversionRate(filteredLeads),
    prevConversionRate: getConversionRate(previousLeads),
    pipelineValue: getPipelineValue(filteredLeads),
    prevPipelineValue: getPipelineValue(previousLeads),
    wonRevenue: getWonRevenue(filteredLeads),
    prevWonRevenue: getWonRevenue(previousLeads),
    avgSalesCycle: getAverageSalesCycle(filteredLeads),
    prevAvgSalesCycle: getAverageSalesCycle(previousLeads),
    lostRate: getLostRate(filteredLeads),
    prevLostRate: getLostRate(previousLeads),
  }), [filteredLeads, previousLeads]);

  // ── Chart Data ─────────────────────────────────────────────────
  const statusDistribution = useMemo(
    () => getStatusDistribution(filteredLeads),
    [filteredLeads]
  );

  const monthlyLeads = useMemo(
    () => getMonthlyLeads(leads, 6),
    [leads]
  );

  const conversionByMonth = useMemo(
    () => getConversionByMonth(leads, 6),
    [leads]
  );

  const revenueByMonth = useMemo(
    () => getRevenueByMonth(leads, 6),
    [leads]
  );

  const leadSourceStats = useMemo(
    () => getLeadSourceStats(filteredLeads),
    [filteredLeads]
  );

  const funnelData = useMemo(
    () => getFunnelData(filteredLeads),
    [filteredLeads]
  );

  const salesVelocity = useMemo(
    () => getSalesVelocity(filteredLeads),
    [filteredLeads]
  );

  const prevSalesVelocity = useMemo(
    () => getSalesVelocity(previousLeads),
    [previousLeads]
  );

  const forecast = useMemo(
    () => getForecastRevenue(leads),
    [leads]
  );

  const topPerformers = useMemo(
    () => getTopPerformers(filteredLeads),
    [filteredLeads]
  );

  const heatmapData = useMemo(
    () => getActivityHeatmapData(leads),
    [leads]
  );

  // ── Actions ────────────────────────────────────────────────────
  const handlePeriodChange = useCallback((newPeriod) => {
    setPeriod(newPeriod);
  }, []);

  const handleCustomRange = useCallback((start, end) => {
    setCustomStart(start);
    setCustomEnd(end);
    setPeriod('custom');
  }, []);

  return {
    // Raw
    leads,
    filteredLeads,
    // Filter state
    period,
    customStart,
    customEnd,
    handlePeriodChange,
    handleCustomRange,
    // KPIs
    kpis,
    // Chart data
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
    // State flags
    isEmpty: leads.length === 0,
    isFilteredEmpty: filteredLeads.length === 0,
  };
}
