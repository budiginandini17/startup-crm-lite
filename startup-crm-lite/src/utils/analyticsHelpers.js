/**
 * Analytics Helper Functions — Startup CRM Lite
 * Pure, memoization-friendly utility functions for analytics computations.
 * All functions handle null/undefined defensively.
 */

import { STATUS_COLORS } from '../constants/analyticsColors';

// ─── Date Utilities ────────────────────────────────────────────────

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Returns the start date for a given filter period.
 * @param {'7d'|'30d'|'90d'|'1y'|'custom'} period
 * @param {Date|null} customStart
 */
export function getStartDate(period, customStart = null) {
  const now = new Date();
  switch (period) {
    case '7d': {
      const d = new Date(now);
      d.setDate(d.getDate() - 7);
      return d;
    }
    case '30d': {
      const d = new Date(now);
      d.setDate(d.getDate() - 30);
      return d;
    }
    case '90d': {
      const d = new Date(now);
      d.setDate(d.getDate() - 90);
      return d;
    }
    case '1y': {
      const d = new Date(now);
      d.setFullYear(d.getFullYear() - 1);
      return d;
    }
    case 'custom':
      return customStart ? new Date(customStart) : null;
    default:
      return null;
  }
}

/**
 * Filters leads by the selected date period.
 * @param {Array} leads
 * @param {string} period
 * @param {Date|null} customStart
 * @param {Date|null} customEnd
 */
export function filterLeadsByPeriod(leads, period, customStart = null, customEnd = null) {
  if (!Array.isArray(leads)) return [];
  if (!period || period === 'all') return leads;

  const start = getStartDate(period, customStart);
  const end = customEnd ? new Date(customEnd) : new Date();

  return leads.filter((lead) => {
    if (!lead?.createdAt) return false;
    const date = new Date(lead.createdAt);
    if (start && date < start) return false;
    if (date > end) return false;
    return true;
  });
}

// ─── KPI Helpers ───────────────────────────────────────────────────

/**
 * Returns status distribution with counts and percentages.
 * @param {Array} leads
 */
export function getStatusDistribution(leads) {
  if (!Array.isArray(leads) || leads.length === 0) return [];
  const counts = {};
  leads.forEach((lead) => {
    const status = lead?.status || 'Unknown';
    counts[status] = (counts[status] || 0) + 1;
  });
  const total = leads.length;
  return Object.entries(counts).map(([status, count]) => ({
    name: status,
    value: count,
    percentage: Math.round((count / total) * 100),
    fill: STATUS_COLORS[status] || '#94A3B8',
  }));
}

/**
 * Returns total pipeline value (active leads only — not Won/Lost).
 * @param {Array} leads
 */
export function getPipelineValue(leads) {
  if (!Array.isArray(leads)) return 0;
  return leads
    .filter((l) => l?.status && !['Won', 'Lost'].includes(l.status))
    .reduce((sum, l) => sum + (Number(l.value) || 0), 0);
}

/**
 * Returns total revenue from Won leads.
 * @param {Array} leads
 */
export function getWonRevenue(leads) {
  if (!Array.isArray(leads)) return 0;
  return leads
    .filter((l) => l?.status === 'Won')
    .reduce((sum, l) => sum + (Number(l.value) || 0), 0);
}

/**
 * Returns conversion rate: Won / Total (as a percentage).
 * @param {Array} leads
 */
export function getConversionRate(leads) {
  if (!Array.isArray(leads) || leads.length === 0) return 0;
  const won = leads.filter((l) => l?.status === 'Won').length;
  return Math.round((won / leads.length) * 100);
}

/**
 * Returns lost rate: Lost / Total (as a percentage).
 * @param {Array} leads
 */
export function getLostRate(leads) {
  if (!Array.isArray(leads) || leads.length === 0) return 0;
  const lost = leads.filter((l) => l?.status === 'Lost').length;
  return Math.round((lost / leads.length) * 100);
}

/**
 * Returns average sales cycle in days (createdAt → wonAt).
 * @param {Array} leads
 */
export function getAverageSalesCycle(leads) {
  if (!Array.isArray(leads)) return 0;
  const wonLeads = leads.filter(
    (l) => l?.status === 'Won' && l.wonAt && l.createdAt
  );
  if (wonLeads.length === 0) return 0;
  const totalDays = wonLeads.reduce((sum, l) => {
    const diff = new Date(l.wonAt) - new Date(l.createdAt);
    return sum + Math.max(0, diff / (1000 * 60 * 60 * 24));
  }, 0);
  return Math.round(totalDays / wonLeads.length);
}

// ─── Chart Data Helpers ────────────────────────────────────────────

/**
 * Returns monthly lead counts for the last N months.
 * @param {Array} leads
 * @param {number} months
 */
export function getMonthlyLeads(leads, months = 6) {
  if (!Array.isArray(leads)) return [];
  const now = new Date();
  const result = [];
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    const count = leads.filter((l) => {
      if (!l?.createdAt) return false;
      const ld = new Date(l.createdAt);
      return ld.getFullYear() === d.getFullYear() && ld.getMonth() === d.getMonth();
    }).length;
    result.push({ month: MONTH_NAMES[d.getMonth()], count, key });
  }
  return result;
}

/**
 * Returns monthly conversion rate (Won/Total) per month.
 * @param {Array} leads
 * @param {number} months
 */
export function getConversionByMonth(leads, months = 6) {
  if (!Array.isArray(leads)) return [];
  const now = new Date();
  const result = [];
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthLeads = leads.filter((l) => {
      if (!l?.createdAt) return false;
      const ld = new Date(l.createdAt);
      return ld.getFullYear() === d.getFullYear() && ld.getMonth() === d.getMonth();
    });
    const won = monthLeads.filter((l) => l?.status === 'Won').length;
    const rate = monthLeads.length > 0 ? Math.round((won / monthLeads.length) * 100) : 0;
    result.push({ month: MONTH_NAMES[d.getMonth()], rate });
  }
  return result;
}

/**
 * Returns monthly Won revenue.
 * @param {Array} leads
 * @param {number} months
 */
export function getRevenueByMonth(leads, months = 6) {
  if (!Array.isArray(leads)) return [];
  const now = new Date();
  const result = [];
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const revenue = leads
      .filter((l) => {
        if (l?.status !== 'Won' || !l.wonAt) return false;
        const ld = new Date(l.wonAt);
        return ld.getFullYear() === d.getFullYear() && ld.getMonth() === d.getMonth();
      })
      .reduce((sum, l) => sum + (Number(l.value) || 0), 0);
    result.push({ month: MONTH_NAMES[d.getMonth()], revenue });
  }
  return result;
}

/**
 * Returns lead source statistics, sorted descending.
 * @param {Array} leads
 */
export function getLeadSourceStats(leads) {
  if (!Array.isArray(leads) || leads.length === 0) return [];
  const counts = {};
  leads.forEach((l) => {
    const src = l?.source || 'Unknown';
    counts[src] = (counts[src] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Returns funnel stage data with conversion and drop-off metrics.
 * Maps LeadContext status values ('Meeting Scheduled', 'Proposal Sent') to funnel stages.
 * @param {Array} leads
 */
export function getFunnelData(leads) {
  if (!Array.isArray(leads) || leads.length === 0) return [];

  // Pipeline order (higher index = further in pipeline)
  const pipelineOrder = {
    'New': 0,
    'Contacted': 1,
    'Meeting Scheduled': 2,
    'Proposal Sent': 3,
    'Won': 4,
    'Lost': 5,  // Lost is treated as out-of-pipeline
  };

  const stages = [
    { key: 'New', label: 'New', minOrder: 0 },
    { key: 'Contacted', label: 'Contacted', minOrder: 1 },
    { key: 'Meeting Scheduled', label: 'Meeting', minOrder: 2 },
    { key: 'Proposal Sent', label: 'Proposal', minOrder: 3 },
    { key: 'Won', label: 'Won', minOrder: 4 },
  ];

  // Count leads that reached each stage or beyond (excluding Lost from cumulative counts below New)
  const funnel = stages.map((stage) => {
    const count = leads.filter((l) => {
      const pos = pipelineOrder[l?.status];
      if (pos === undefined) return false;
      // Lost leads still count for stages up to Contacted (they entered pipeline)
      if (l.status === 'Lost') return stage.minOrder <= 1;
      return pos >= stage.minOrder;
    }).length;
    return { stage: stage.label, count };
  });

  return funnel.map((item, idx) => {
    const prev = idx === 0 ? item.count : funnel[idx - 1].count;
    const conversionRate = prev > 0 ? Math.round((item.count / prev) * 100) : 0;
    const dropOff = prev > 0 ? Math.round(((prev - item.count) / prev) * 100) : 0;
    return { ...item, conversionRate, dropOff };
  });
}

/**
 * Returns sales velocity = (opportunities × winRate × avgDealSize) / salesCycle.
 * @param {Array} leads
 */
export function getSalesVelocity(leads) {
  if (!Array.isArray(leads) || leads.length === 0) return 0;
  const activeLeads = leads.filter((l) => !['Lost'].includes(l?.status));
  const opportunities = activeLeads.length;
  const winRate = getConversionRate(leads) / 100;
  const wonLeads = leads.filter((l) => l?.status === 'Won');
  const avgDealSize = wonLeads.length > 0
    ? wonLeads.reduce((s, l) => s + (Number(l.value) || 0), 0) / wonLeads.length
    : 0;
  const salesCycle = getAverageSalesCycle(leads) || 30;
  return salesCycle > 0
    ? Math.round((opportunities * winRate * avgDealSize) / salesCycle)
    : 0;
}

/**
 * Returns forecasted revenue for next month based on last 6 months average.
 * @param {Array} leads
 */
export function getForecastRevenue(leads) {
  if (!Array.isArray(leads)) return { forecast: 0, confidence: 0, trend: 0 };
  const monthly = getRevenueByMonth(leads, 6);
  const nonZero = monthly.filter((m) => m.revenue > 0);
  if (nonZero.length === 0) return { forecast: 0, confidence: 0, trend: 0 };

  const avg = nonZero.reduce((s, m) => s + m.revenue, 0) / nonZero.length;
  const last = monthly[monthly.length - 1]?.revenue || 0;
  const secondLast = monthly[monthly.length - 2]?.revenue || avg;
  const trend = secondLast > 0 ? Math.round(((last - secondLast) / secondLast) * 100) : 0;
  const confidence = Math.min(95, Math.round(50 + nonZero.length * 8));

  return { forecast: Math.round(avg * 1.05), confidence, trend };
}

/**
 * Returns top performers sorted by Won revenue.
 * @param {Array} leads
 */
export function getTopPerformers(leads) {
  if (!Array.isArray(leads)) return [];
  const performerMap = {};
  leads
    .filter((l) => l?.status === 'Won' && l.owner)
    .forEach((l) => {
      const owner = l.owner;
      if (!performerMap[owner]) {
        performerMap[owner] = { name: owner, revenue: 0, deals: 0 };
      }
      performerMap[owner].revenue += Number(l.value) || 0;
      performerMap[owner].deals += 1;
    });
  return Object.values(performerMap)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);
}

/**
 * Returns activity heatmap data — lead creation by day for last 12 weeks.
 * @param {Array} leads
 */
export function getActivityHeatmapData(leads) {
  if (!Array.isArray(leads)) return [];
  const now = new Date();
  const days = [];
  for (let i = 83; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];

    const leadsCreated = leads.filter((l) => l?.createdAt && l.createdAt.split('T')[0] === dateStr).length;
    const meetingsScheduled = leads.filter((l) => l?.meetingAt && l.meetingAt.split('T')[0] === dateStr).length;
    const callsLogged = leads.filter((l) => l?.contactedAt && l.contactedAt.split('T')[0] === dateStr).length;
    const totalCount = leadsCreated + meetingsScheduled + callsLogged;

    days.push({
      date: dateStr,
      count: totalCount,
      details: { leadsCreated, meetingsScheduled, callsLogged },
      day: d.getDay(),
      week: Math.floor(i / 7),
      label: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    });
  }
  return days;
}

// ─── Formatting Utilities ──────────────────────────────────────────

/**
 * Formats a number as Indian Rupee currency.
 * @param {number} value
 */
export function formatINR(value) {
  if (!value && value !== 0) return '₹0';
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
  return `₹${value.toLocaleString('en-IN')}`;
}

/**
 * Formats a number with K/L/Cr suffix.
 * @param {number} value
 */
export function formatCompact(value) {
  if (!value && value !== 0) return '0';
  if (value >= 10000000) return `${(value / 10000000).toFixed(1)}Cr`;
  if (value >= 100000) return `${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  return `${value}`;
}

/**
 * Calculates percent change between two values.
 * @param {number} current
 * @param {number} previous
 */
export function getPercentChange(current, previous) {
  if (!previous) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / Math.abs(previous)) * 100);
}
