/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext, useCallback } from 'react';

/**
 * @typedef {Object} ThemeContextValue
 * @property {boolean} isDarkMode - Whether dark mode is currently active
 * @property {() => void} toggleTheme - Toggles between light and dark mode
 */

const STORAGE_KEY = 'crm_theme';

/**
 * React Context for theme management.
 * @type {import('react').Context<ThemeContextValue|null>}
 */
export const ThemeContext = createContext(null);

/**
 * Provides theme state and toggle functionality to the component tree.
 *
 * Reads the initial dark mode preference from localStorage. When toggled,
 * applies or removes the `dark` CSS class on `document.documentElement`
 * and persists the choice to localStorage.
 *
 * @param {Object} props
 * @param {import('react').ReactNode} props.children - Child components
 * @returns {import('react').ReactElement} Provider wrapping children
 */
export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      return saved === 'dark';
    }
    return false;
  });

  /**
   * Synchronize the `dark` class on the root HTML element on initial mount.
   */
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);

  /**
   * Toggles the theme between light and dark mode.
   * Flips isDarkMode, adds/removes 'dark' class on document.documentElement,
   * and saves the preference to localStorage.
   */
  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => {
      const nextValue = !prev;
      const root = document.documentElement;
      if (nextValue) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      localStorage.setItem(STORAGE_KEY, nextValue ? 'dark' : 'light');
      return nextValue;
    });
  }, []);

  /** @type {ThemeContextValue} */
  const value = { isDarkMode, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom hook to consume the ThemeContext.
 * Throws a descriptive error if used outside of a `<ThemeProvider>`.
 *
 * @returns {ThemeContextValue} The theme context value
 * @throws {Error} If called outside of ThemeProvider
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error(
      'useTheme() must be used within a <ThemeProvider>. ' +
      'Wrap your component tree with <ThemeProvider> in main.jsx or App.jsx.'
    );
  }
  return context;
}
