import React, { useState, useEffect } from 'react';
import { Save, X, User, Building, Mail, Phone, BarChart2, Radio } from 'lucide-react';

const STATUS_OPTIONS = ['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'];
const SOURCE_OPTIONS = ['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Email Campaign', 'Other'];

/**
 * LeadForm Component
 * Renders a form to create or edit lead details.
 * Contains accessibility features, validation feedback, and custom styling.
 * 
 * @param {Object} props
 * @param {Object} [props.initialData] - Existing lead data for edit mode
 * @param {function} props.onSubmit - Submission handler
 * @param {function} props.onCancel - Cancel/close handler
 */
export default function LeadForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    status: 'New',
    source: 'Website',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync initialData when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        company: initialData.company || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        status: initialData.status || 'New',
        source: initialData.source || 'Website',
      });
    } else {
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        status: 'New',
        source: 'Website',
      });
    }
    setErrors({});
    setIsSubmitted(false);
  }, [initialData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error inline when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Validate fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address';
      }
    }
    
    return newErrors;
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      // Focus first error element
      const firstErrorKey = Object.keys(formErrors)[0];
      const errorEl = document.getElementById(firstErrorKey);
      if (errorEl) errorEl.focus();
      return;
    }
    
    // Process form data
    onSubmit({
      ...formData,
      name: formData.name.trim(),
      company: formData.company.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
    });
  };

  const isEditMode = !!initialData;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <User size={16} />
            </div>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Alice Freeman"
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`block w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/60 border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:bg-white dark:focus:bg-gray-900 ${
                errors.name
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                  : 'border-gray-200 dark:border-gray-700/60 focus:border-primary focus:ring-primary/20'
              }`}
            />
          </div>
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs font-semibold text-red-500" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* Company Field */}
        <div>
          <label htmlFor="company" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
            Company Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Building size={16} />
            </div>
            <input
              type="text"
              name="company"
              id="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. CloudScale Inc."
              aria-required="true"
              aria-invalid={!!errors.company}
              aria-describedby={errors.company ? "company-error" : undefined}
              className={`block w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/60 border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:bg-white dark:focus:bg-gray-900 ${
                errors.company
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                  : 'border-gray-200 dark:border-gray-700/60 focus:border-primary focus:ring-primary/20'
              }`}
            />
          </div>
          {errors.company && (
            <p id="company-error" className="mt-1.5 text-xs font-semibold text-red-500" role="alert">
              {errors.company}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Mail size={16} />
            </div>
            <input
              type="text"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. alice@cloudscale.io"
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`block w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/60 border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:bg-white dark:focus:bg-gray-900 ${
                errors.email
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-505/20'
                  : 'border-gray-200 dark:border-gray-700/60 focus:border-primary focus:ring-primary/20'
              }`}
            />
          </div>
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs font-semibold text-red-500" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Phone size={16} />
            </div>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +1 (555) 234-5678"
              className="block w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/60 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:bg-white dark:focus:bg-gray-900 focus:border-primary focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Status & Source Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Status Dropdown */}
          <div>
            <label htmlFor="status" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Status
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <BarChart2 size={16} />
              </div>
              <select
                name="status"
                id="status"
                value={formData.status}
                onChange={handleChange}
                className="block w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/60 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:bg-white dark:focus:bg-gray-905 focus:border-primary focus:ring-primary/20 appearance-none cursor-pointer text-gray-900 dark:text-white"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="dark:bg-gray-900 text-gray-900 dark:text-white">
                    {opt}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Source Dropdown */}
          <div>
            <label htmlFor="source" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Source
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Radio size={16} />
              </div>
              <select
                name="source"
                id="source"
                value={formData.source}
                onChange={handleChange}
                className="block w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/60 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:bg-white dark:focus:bg-gray-905 focus:border-primary focus:ring-primary/20 appearance-none cursor-pointer text-gray-900 dark:text-white"
              >
                {SOURCE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="dark:bg-gray-900 text-gray-900 dark:text-white">
                    {opt}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl text-sm font-medium transition-all hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <X size={16} />
          <span>Cancel</span>
        </button>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-medium shadow-md shadow-blue-500/10 transition-all hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20"
        >
          <Save size={16} />
          <span>{isEditMode ? 'Save Changes' : 'Create Lead'}</span>
        </button>
      </div>
    </form>
  );
}
