import React from 'react';
import { Pencil, Trash2, Mail, Phone, Calendar, Radio, Building2 } from 'lucide-react';
import StatusBadge from './StatusBadge';

/**
 * LeadCard Component
 * Renders lead information in a visually engaging card, ideal for grid layouts.
 * Includes interactive edit/delete controls and accessible tags.
 * 
 * @param {Object} props
 * @param {Object} props.lead - The lead data object
 * @param {function} props.onEdit - Edit action handler
 * @param {function} props.onDelete - Delete action handler
 */
export default function LeadCard({ lead, onEdit, onDelete }) {
  // Generate a random gradient color based on the first letter of the name for a persistent, unique avatar style
  const getAvatarGradient = (char) => {
    const code = char.toUpperCase().charCodeAt(0) || 65;
    const gradients = [
      'from-blue-500 to-indigo-500',
      'from-emerald-500 to-teal-500',
      'from-violet-500 to-purple-500',
      'from-amber-500 to-orange-500',
      'from-rose-500 to-pink-500',
      'from-cyan-500 to-blue-500',
    ];
    return gradients[code % gradients.length];
  };

  const initial = lead.name ? lead.name.charAt(0).toUpperCase() : '?';
  const avatarBg = getAvatarGradient(initial);

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
    <div 
      className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 hover:shadow-lg hover:shadow-slate-100 dark:hover:shadow-none transition-all duration-300 flex flex-col justify-between h-full group"
    >
      <div>
        {/* Header - Avatar, Name/Company and Status */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${avatarBg} text-white flex items-center justify-center font-bold text-base shadow-sm`}>
              {initial}
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-slate-900 dark:text-white text-base truncate group-hover:text-primary transition-colors duration-200">
                {lead.name}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                <Building2 size={13} className="text-slate-400 shrink-0" />
                <span className="truncate">{lead.company}</span>
              </div>
            </div>
          </div>
          
          {/* Action Toolbar */}
          <div className="flex items-center gap-1 shrink-0 opacity-80 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
        </div>

        {/* Status and Source tags */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <StatusBadge status={lead.status} />
          {lead.source && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50">
              <Radio size={9} className="mr-1 opacity-70" />
              {lead.source}
            </span>
          )}
        </div>

        {/* Contact Information Details */}
        <div className="space-y-2.5 text-sm">
          {/* Email */}
          <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-355 text-xs md:text-sm">
            <Mail size={14} className="text-slate-400 shrink-0" />
            <a 
              href={`mailto:${lead.email}`} 
              className="hover:text-primary hover:underline truncate"
              title={`Email ${lead.email}`}
            >
              {lead.email}
            </a>
          </div>

          {/* Phone */}
          {lead.phone ? (
            <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-355 text-xs md:text-sm">
              <Phone size={14} className="text-slate-400 shrink-0" />
              <a 
                href={`tel:${lead.phone}`} 
                className="hover:text-primary hover:underline truncate"
                title={`Call ${lead.phone}`}
              >
                {lead.phone}
              </a>
            </div>
          ) : (
            <div className="flex items-center gap-2.5 text-slate-400 dark:text-slate-500 text-xs md:text-sm italic">
              <Phone size={14} className="shrink-0 opacity-60" />
              <span>No phone number</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Info - Date Added */}
      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
        <div className="flex items-center gap-1">
          <Calendar size={12} className="shrink-0" />
          <span>Added: {formatDate(lead.dateAdded)}</span>
        </div>
      </div>
    </div>
  );
}
