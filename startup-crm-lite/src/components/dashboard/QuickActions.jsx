import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Users, Download } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * QuickActions component displays a panel of primary CRM action items
 * to facilitate fast navigation and database exports.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} [props.onAddLead] - Custom callback function triggered when "Add New Lead" is clicked.
 * @param {Function} [props.onExportData] - Custom callback function triggered when "Export Data" is clicked.
 * @returns {React.ReactElement} The rendered QuickActions panel.
 */
export default function QuickActions({ onAddLead, onExportData }) {
  const navigate = useNavigate();

  const handleAddLeadClick = () => {
    if (onAddLead) {
      onAddLead();
    } else {
      // Navigate to Leads page and append query param to trigger creation form/modal
      navigate('/leads?add=true');
    }
  };

  const handleViewLeadsClick = () => {
    navigate('/leads');
  };

  const handleExportClick = () => {
    if (onExportData) {
      onExportData();
    } else {
      // Simulate file export with a premium loading and success toast notification
      const exportToast = toast.loading('Compiling lead data and generating CSV...', {
        style: {
          borderRadius: '12px',
          background: '#0F172A',
          color: '#FFF',
          fontSize: '14px',
        },
      });

      setTimeout(() => {
        toast.success('Database exported successfully as CRM_Leads_Export.csv', {
          id: exportToast,
          duration: 4000,
          style: {
            borderRadius: '12px',
            background: '#0F172A',
            color: '#FFF',
            fontSize: '14px',
          },
          iconTheme: {
            primary: '#22C55E',
            secondary: '#FFF',
          },
        });
      }, 1500);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm flex flex-col h-full">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Quick Actions
        </h2>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          Execute common sales CRM workflows
        </p>
      </div>
 
      <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-col gap-3.5 justify-center flex-1">
        {/* Add New Lead Action */}
        <button
          onClick={handleAddLeadClick}
          className="flex-1 inline-flex items-center justify-center gap-2.5 px-5 py-3.5 bg-primary hover:bg-blue-600 text-white rounded-xl font-bold transition-all duration-200 shadow-md shadow-blue-500/15 hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98]"
        >
          <Plus size={18} className="stroke-[2.5]" />
          <span>Add New Lead</span>
        </button>
 
        {/* View All Leads Action */}
        <button
          onClick={handleViewLeadsClick}
          className="flex-1 inline-flex items-center justify-center gap-2.5 px-5 py-3.5 border border-gray-200 dark:border-gray-700 dark:bg-gray-900/20 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/60 rounded-xl font-bold transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 active:scale-[0.98]"
        >
          <Users size={18} className="stroke-[2.25] text-gray-400" />
          <span>View All Leads</span>
        </button>
 
        {/* Export Data Action */}
        <button
          onClick={handleExportClick}
          className="flex-1 inline-flex items-center justify-center gap-2.5 px-5 py-3.5 border border-gray-200 dark:border-gray-700 dark:bg-gray-900/20 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/60 rounded-xl font-bold transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 active:scale-[0.98]"
        >
          <Download size={18} className="stroke-[2.25] text-gray-400" />
          <span>Export Data</span>
        </button>
      </div>
    </div>
  );
}
