import { useState, useEffect } from 'react';
import { Plus, X, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import LeadTable from '../components/leads/LeadTable';
import LeadForm from '../components/leads/LeadForm';
import SearchBar from '../components/common/SearchBar';
import FilterBar from '../components/common/FilterBar';
import EmptyState from '../components/common/EmptyState';
import { useLeads } from '../context/LeadContext';

export default function Leads() {
  // --- Context-powered lead state ---
  const { leads, addLead, updateLead, deleteLead } = useLeads();

  // --- Local UI states ---
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  
  // Custom delete confirmation modal state
  const [leadToDelete, setLeadToDelete] = useState(null);

  // --- Modal Controllers ---
  const handleOpenAddModal = () => {
    setSelectedLead(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLead(null);
  };

  // Handle modal escape key event listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isModalOpen) handleCloseModal();
        if (leadToDelete) setLeadToDelete(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, leadToDelete]);

  // --- CRUD Functions (delegating to context) ---
  const handleFormSubmit = (formData) => {
    if (selectedLead) {
      // Edit mode — delegate to context updateLead
      updateLead(selectedLead.id, formData);
      toast.success(`Lead "${formData.name}" updated successfully!`);
    } else {
      // Create mode — delegate to context addLead
      const newLead = addLead(formData);
      toast.success(`Lead "${newLead.name}" added successfully!`);
    }
    handleCloseModal();
  };

  const handleDeleteTrigger = (id) => {
    const targetLead = leads.find((l) => l.id === id);
    if (targetLead) {
      setLeadToDelete(targetLead);
    }
  };

  const handleDeleteConfirm = () => {
    if (!leadToDelete) return;
    // Delegate to context deleteLead
    deleteLead(leadToDelete.id);
    toast.error(`Lead "${leadToDelete.name}" deleted successfully!`, {
      style: {
        background: '#FFF5F5',
        color: '#C53030',
        border: '1px solid #FED7D7',
      }
    });
    setLeadToDelete(null);
  };

  // --- Filter and Search logic ---
  const filteredLeads = leads
    .filter(lead => activeFilter === 'All' || lead.status === activeFilter)
    .filter(lead =>
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="space-y-8 animate-fade-in relative">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white flex items-center gap-2.5">
            Leads Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1.5 text-sm md:text-base">
            Track and nurture leads from prospect through closed deal.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white rounded-xl font-medium shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 hover:bg-blue-600 cursor-pointer"
        >
          <Plus size={18} />
          <span>Add Lead</span>
        </button>
      </div>

      {/* Control Bar (Search, Status Filter) */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-2xl shadow-sm flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between animate-fade-in">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          leads={leads}
        />
      </div>

      {/* Main Leads List / Table Panel / Empty State */}
      {filteredLeads.length === 0 ? (
        <EmptyState
          totalLeadsCount={leads.length}
          onClear={() => {
            setSearchQuery('');
            setActiveFilter('All');
          }}
          onAddLead={handleOpenAddModal}
        />
      ) : (
        <LeadTable
          leads={filteredLeads}
          onEdit={handleOpenEditModal}
          onDelete={handleDeleteTrigger}
        />
      )}

      {/* CREATE & EDIT LEAD MODAL DIALOG */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div 
            onClick={handleCloseModal}
            className="fixed inset-0 bg-gray-900/40 dark:bg-gray-950/60 backdrop-blur-xs transition-opacity" 
          />
          
          {/* Modal Content container */}
          <div className="relative w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transform transition-all p-6 z-10">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedLead ? 'Edit Lead Details' : 'Add New CRM Lead'}
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Fill in the details below to {selectedLead ? 'update the existing' : 'register a new'} lead profile.
                </p>
              </div>
              <button 
                onClick={handleCloseModal}
                className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-205 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
                aria-label="Close form"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <LeadForm
              initialData={selectedLead}
              onSubmit={handleFormSubmit}
              onCancel={handleCloseModal}
            />
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {leadToDelete && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div 
            onClick={() => setLeadToDelete(null)}
            className="fixed inset-0 bg-gray-900/40 dark:bg-gray-950/60 backdrop-blur-xs transition-opacity" 
          />
          
          {/* Confirmation Box */}
          <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 transform transition-all p-6 z-10">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/20 text-red-600 flex items-center justify-center shrink-0">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Confirm Lead Deletion
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">
                  Are you sure you want to permanently delete lead <strong className="text-gray-900 dark:text-gray-200 font-semibold">"{leadToDelete.name}"</strong>? This action will remove their profile and cannot be undone.
                </p>
              </div>
            </div>
 
            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={() => setLeadToDelete(null)}
                className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl text-sm font-medium transition-all hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-4.5 py-2 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 shadow-md shadow-red-500/10 hover:shadow-lg transition-all cursor-pointer"
              >
                Delete Lead
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
