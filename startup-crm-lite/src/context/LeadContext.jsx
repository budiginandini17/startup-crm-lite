/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext, useCallback } from 'react';

/**
 * @typedef {Object} Lead
 * @property {string} id - Unique identifier (UUID or timestamp string)
 * @property {string} name - Full name of the lead contact
 * @property {string} company - Company or organization name
 * @property {string} email - Email address
 * @property {string} phone - Phone number
 * @property {'New'|'Contacted'|'Meeting Scheduled'|'Proposal Sent'|'Won'|'Lost'} status - Pipeline status
 * @property {'Website'|'Referral'|'LinkedIn'|'Cold Call'|'Email Campaign'|'Other'} source - Acquisition source
 * @property {string} createdAt - ISO 8601 date string of when the lead was created
 */

/**
 * @typedef {Object} LeadContextValue
 * @property {Lead[]} leads - Array of all leads
 * @property {(formData: Omit<Lead, 'id'|'createdAt'>) => Lead} addLead - Create a new lead
 * @property {(id: string, updates: Partial<Lead>) => void} updateLead - Update an existing lead
 * @property {(id: string) => void} deleteLead - Delete a lead by ID
 * @property {(id: string) => Lead|undefined} getLeadById - Find a lead by ID
 */

/** Default seed data for first-time users with no localStorage data */
const DEFAULT_LEADS = [
  { id: 'seed-001', name: 'Alice Freeman', company: 'CloudScale Inc.', email: 'alice@cloudscale.io', phone: '+1 (555) 234-5678', status: 'Meeting Scheduled', source: 'LinkedIn', createdAt: '2026-06-10T10:00:00.000Z' },
  { id: 'seed-002', name: 'Brad Cooper', company: 'Apex Global', email: 'brad@apex.co', phone: '+1 (555) 987-6543', status: 'Contacted', source: 'Website', createdAt: '2026-06-12T14:30:00.000Z' },
  { id: 'seed-003', name: 'Claire Danes', company: 'Nova Labs', email: 'claire@novalabs.tech', phone: '+1 (555) 345-6789', status: 'Proposal Sent', source: 'Referral', createdAt: '2026-06-13T09:15:00.000Z' },
  { id: 'seed-004', name: 'David Miller', company: 'Starlight Corp', email: 'david@starlight.com', phone: '+1 (555) 876-5432', status: 'New', source: 'Cold Call', createdAt: '2026-06-15T16:00:00.000Z' },
  { id: 'seed-005', name: 'Eva Longoria', company: 'Zenith Studio', email: 'eva@zenith.design', phone: '+1 (555) 456-7890', status: 'Won', source: 'Email Campaign', createdAt: '2026-06-16T11:00:00.000Z' },
];

const STORAGE_KEY = 'crm_leads';

/**
 * React Context for lead management state.
 * @type {import('react').Context<LeadContextValue|null>}
 */
export const LeadContext = createContext(null);

/**
 * Provides lead state and CRUD operations to the component tree.
 *
 * Initializes from localStorage if data exists, otherwise seeds with
 * default demo leads. All mutations are automatically persisted.
 *
 * @param {Object} props
 * @param {import('react').ReactNode} props.children - Child components
 * @returns {import('react').ReactElement} Provider wrapping children
 */
export function LeadProvider({ children }) {
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('LeadContext: Failed to parse saved leads:', e);
      }
    }
    return DEFAULT_LEADS;
  });

  /**
   * Persist leads to localStorage whenever they change.
   */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  }, [leads]);

  /**
   * Creates a new lead with an auto-generated ID and createdAt timestamp.
   *
   * @param {Omit<Lead, 'id'|'createdAt'>} formData - Lead fields from the form
   * @returns {Lead} The newly created lead object
   */
  const addLead = useCallback((formData) => {
    const newLead = {
      ...formData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setLeads((prev) => [newLead, ...prev]);
    return newLead;
  }, []);

  /**
   * Updates an existing lead by merging partial updates into its current data.
   *
   * @param {string} id - The ID of the lead to update
   * @param {Partial<Lead>} updates - Fields to merge into the existing lead
   */
  const updateLead = useCallback((id, updates) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, ...updates } : lead))
    );
  }, []);

  /**
   * Permanently removes a lead from the list by ID.
   *
   * @param {string} id - The ID of the lead to delete
   */
  const deleteLead = useCallback((id) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
  }, []);

  /**
   * Retrieves a single lead by its unique ID.
   *
   * @param {string} id - The ID to search for
   * @returns {Lead|undefined} The matching lead, or undefined if not found
   */
  const getLeadById = useCallback(
    (id) => leads.find((lead) => lead.id === id),
    [leads]
  );

  /** @type {LeadContextValue} */
  const value = { leads, addLead, updateLead, deleteLead, getLeadById };

  return (
    <LeadContext.Provider value={value}>
      {children}
    </LeadContext.Provider>
  );
}

/**
 * Custom hook to consume the LeadContext.
 * Throws a descriptive error if used outside of a `<LeadProvider>`.
 *
 * @returns {LeadContextValue} The lead context value
 * @throws {Error} If called outside of LeadProvider
 */
export function useLeads() {
  const context = useContext(LeadContext);
  if (context === null) {
    throw new Error(
      'useLeads() must be used within a <LeadProvider>. ' +
      'Wrap your component tree with <LeadProvider> in main.jsx or App.jsx.'
    );
  }
  return context;
}
