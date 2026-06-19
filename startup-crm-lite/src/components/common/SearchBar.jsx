import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

/**
 * SearchBar Component
 * Controlled and debounced input with clear option and search icon.
 * 
 * @param {Object} props
 * @param {string} props.value - Search query value
 * @param {function} props.onChange - Search query change callback
 */
export default function SearchBar({ value, onChange }) {
  const [localValue, setLocalValue] = useState(value);
  const [prevValue, setPrevValue] = useState(value);
  const timeoutRef = useRef(null);

  // Synchronize local input state with props value if changed from parent
  if (value !== prevValue) {
    setLocalValue(value);
    setPrevValue(value);
  }

  // Cleanup pending timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleChange = (e) => {
    const newVal = e.target.value;
    setLocalValue(newVal);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onChange(newVal);
    }, 300);
  };

  const handleClear = () => {
    setLocalValue('');
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    onChange('');
  };

  return (
    <div className="relative flex-1 w-full">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
        <Search className="w-4.5 h-4.5" />
      </div>
      <input
        type="text"
        aria-label="Search by name, company, or email"
        placeholder="Search by name, company, or email..."
        value={localValue}
        onChange={handleChange}
        className="w-full pl-10 pr-10 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-gray-900 focus:border-primary text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200"
      />
      {localValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer"
          aria-label="Clear search"
        >
          <X className="w-4.5 h-4.5" />
        </button>
      )}
    </div>
  );
}
