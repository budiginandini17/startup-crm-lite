import { useState, useCallback } from 'react';

/**
 * @template T
 * @typedef {[T, (value: T | ((prev: T) => T)) => void]} UseLocalStorageReturn
 * Tuple identical in shape to React's useState return value.
 */

/**
 * Safely checks whether localStorage is available in the current environment.
 * In some browsers (e.g. Safari private browsing) or server-side rendering
 * contexts, accessing localStorage throws a SecurityError. This utility
 * returns false in those cases rather than crashing.
 *
 * @returns {boolean} True if localStorage is readable and writable.
 */
function isLocalStorageAvailable() {
  try {
    const testKey = '__crm_storage_test__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * A drop-in replacement for `useState` that also persists state to
 * `localStorage` under the given `key`.
 *
 * Behaviour:
 * - On first render, reads and JSON-parses the stored value for `key`.
 *   If the key is absent or the stored value is corrupt, `initialValue` is used.
 * - Every call to `setValue` atomically updates both React state and localStorage.
 * - `setValue` accepts a raw value **or** an updater function `(prev) => next`,
 *   exactly like `useState`'s setter, so functional updates work as expected.
 * - If localStorage is unavailable (e.g. Safari private mode), the hook
 *   silently degrades to plain in-memory state — no errors are thrown.
 * - Works with any JSON-serialisable type: arrays, objects, strings,
 *   numbers, and booleans.
 *
 * @template T
 * @param {string} key - The localStorage key to read from and write to.
 * @param {T} initialValue - Fallback value when the key is absent or corrupt.
 * @returns {UseLocalStorageReturn<T>} A `[storedValue, setValue]` tuple.
 *
 * @example
 * // Persist a leads array
 * const [leads, setLeads] = useLocalStorage('startup-crm-leads', []);
 *
 * @example
 * // Persist a boolean flag
 * const [isDark, setIsDark] = useLocalStorage('startup-crm-theme', false);
 *
 * @example
 * // Functional update (same as useState)
 * setValue(prev => [...prev, newItem]);
 */
export function useLocalStorage(key, initialValue) {
  const storageAvailable = isLocalStorageAvailable();

  /**
   * Lazy initialiser — runs only once on mount.
   * Reads the stored value, JSON-parses it, and falls back to `initialValue`
   * on any error (missing key, malformed JSON, SecurityError).
   *
   * @returns {T} The resolved initial state.
   */
  const [storedValue, setStoredValue] = useState(() => {
    if (!storageAvailable) {
      // localStorage is blocked (private browsing / iframe sandbox)
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      // getItem returns null when the key does not exist
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Covers JSON.parse failures and unexpected SecurityErrors
      console.warn(
        `useLocalStorage: Failed to read key "${key}" from localStorage.`,
        error
      );
      return initialValue;
    }
  });

  /**
   * Sets a new value in both React state and localStorage.
   *
   * Mirrors the `useState` setter API exactly — accepts either:
   *  - A direct value:        `setValue(newValue)`
   *  - An updater function:   `setValue(prev => derive(prev))`
   *
   * @param {T | ((prev: T) => T)} valueOrUpdater - New value or updater fn.
   */
  const setValue = useCallback(
    (valueOrUpdater) => {
      setStoredValue((prev) => {
        // Resolve the next value, supporting functional-update syntax
        const nextValue =
          typeof valueOrUpdater === 'function'
            ? valueOrUpdater(prev)
            : valueOrUpdater;

        // Persist to localStorage (best-effort — never crashes the app)
        if (storageAvailable) {
          try {
            window.localStorage.setItem(key, JSON.stringify(nextValue));
          } catch (error) {
            // QuotaExceededError or other write failures
            console.warn(
              `useLocalStorage: Failed to write key "${key}" to localStorage.`,
              error
            );
          }
        }

        return nextValue;
      });
    },
    [key, storageAvailable]
  );

  return [storedValue, setValue];
}
