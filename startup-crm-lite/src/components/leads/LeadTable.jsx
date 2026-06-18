import React, { useState } from 'react';
import { LayoutGrid, List, Pencil, Trash2, Mail, Phone, Radio, Calendar, Sparkles } from 'lucide-react';
import StatusBadge from './StatusBadge';
import LeadCard from './LeadCard';

/**
 * LeadTable Component
 * Displays a list of leads in either a rich Table layout or a Grid Card layout.
 * Controls the view toggle and automatically falls back to cards on mobile layouts.
 * 
 * @param {Object} props
 * @param {Array} props.leads - Array of lead data objects
 * @param {function} props.onEdit - Edit lead callback
 * @param {function} props.onDelete - Delete lead callback
 */
export default function LeadTable({ leads, onEdit, onDelete }) {
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'card'

  // Format date added
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      {/* Table Header Controls */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-4 rounded-2xl shadow-sm shadow-slate-100/50 dark:shadow-none">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-semibold text-slate-650 dark:text-slate-300">
            Showing <strong className="text-slate-900 dark:text-white">{leads.length}</strong> {leads.length === 1 ? 'lead' : 'leads'}
          </span>
        </div>
        
        {/* Toggle Button Group */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'table'
                ? 'bg-white dark:bg-slate-900 text-primary dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
            title="Table View"
            aria-label="Switch to Table View"
          >
            <List size={14} />
            <span className="hidden sm:inline">Table</span>
          </button>
          <button
            onClick={() => setViewMode('card')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'card'
                ? 'bg-white dark:bg-slate-900 text-primary dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
            title="Card View"
            aria-label="Switch to Card View"
          >
            <LayoutGrid size={14} />
            <span className="hidden sm:inline">Cards</span>
          </button>
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-12 text-center shadow-sm shadow-slate-100/50 dark:shadow-none">
          <div className="max-w-md mx-auto flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-450 dark:text-slate-500">
              <Sparkles size={24} />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">No Leads Found</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              There are no leads matching your current search criteria or filters. Start by adding a new lead.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Card View Layout */}
          {viewMode === 'card' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {leads.map((lead) => (
                <LeadCard 
                  key={lead.id} 
                  lead={lead} 
                  onEdit={onEdit} 
                  onDelete={onDelete} 
                />
              ))}
            </div>
          )}

          {/* Table View Layout (With Responsive Mobile Cards Fallback) */}
          {viewMode === 'table' && (
            <>
              {/* Responsive Cards Fallback (Visible on mobile/tablet) */}
              <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in">
                {leads.map((lead) => (
                  <LeadCard 
                    key={lead.id} 
                    lead={lead} 
                    onEdit={onEdit} 
                    onDelete={onDelete} 
                  />
                ))}
              </div>

              {/* Desktop Table Layout (Visible on medium screens and up) */}
              <div className="hidden md:block bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm shadow-slate-100/50 dark:shadow-none animate-fade-in">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-slate-50/75 dark:bg-slate-800/20 border-b border-slate-200/80 dark:border-slate-800 text-[11px] font-bold text-slate-450 dark:text-slate-400 uppercase tracking-wider">
                        <th className="px-6 py-4.5">Lead Name</th>
                        <th className="px-6 py-4.5">Company</th>
                        <th className="px-6 py-4.5">Status</th>
                        <th className="px-6 py-4.5">Email</th>
                        <th className="px-6 py-4.5">Source</th>
                        <th className="px-6 py-4.5">Date Added</th>
                        <th className="px-6 py-4.5 text-right pr-10">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150 dark:divide-slate-800/60">
                      {leads.map((lead) => {
                        const initial = lead.name ? lead.name.charAt(0).toUpperCase() : '?';
                        return (
                          <tr key={lead.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors duration-150 group">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-slate-800 text-primary dark:text-blue-400 flex items-center justify-center font-bold text-sm shrink-0">
                                  {initial}
                                </div>
                                <span className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-primary transition-colors">
                                  {lead.name}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-355">
                              {lead.company}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <StatusBadge status={lead.status} />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <div className="flex flex-col">
                                <a 
                                  href={`mailto:${lead.email}`} 
                                  className="text-slate-600 dark:text-slate-355 hover:text-primary hover:underline"
                                >
                                  {lead.email}
                                </a>
                                {lead.phone && (
                                  <span className="text-[11px] text-slate-400 mt-0.5">{lead.phone}</span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {lead.source ? (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/20 dark:border-slate-700/20">
                                  {lead.source}
                                </span>
                              ) : (
                                <span className="text-slate-400 dark:text-slate-500 italic text-xs">N/A</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                              {formatDate(lead.dateAdded)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right pr-6">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => onEdit(lead)}
                                  className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                                  title="Edit Lead"
                                  aria-label={`Edit ${lead.name}`}
                                >
                                  <Pencil size={15} />
                                </button>
                                <button
                                  onClick={() => onDelete(lead.id)}
                                  className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-all cursor-pointer"
                                  title="Delete Lead"
                                  aria-label={`Delete ${lead.name}`}
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
