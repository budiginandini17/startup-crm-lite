import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

/**
 * DarkModeToggle Component
 * A premium sliding switch that triggers app-wide theme switching.
 */
export default function DarkModeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleTheme}
        className="relative flex items-center justify-between w-14 h-8 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1 cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
        aria-label={`Toggle theme, current: ${isDarkMode ? 'dark' : 'light'}`}
        title={`Currently in ${isDarkMode ? 'Dark' : 'Light'} Mode`}
        type="button"
      >
        {/* Sliding Toggle Ball */}
        <div
          className={`absolute w-6 h-6 rounded-full bg-white dark:bg-gray-900 shadow-sm flex items-center justify-center transition-all duration-300 ease-out transform ${
            isDarkMode ? 'translate-x-6' : 'translate-x-0'
          }`}
        >
          {isDarkMode ? (
            <Moon size={11} className="text-yellow-400 fill-yellow-300 animate-scale-in" />
          ) : (
            <Sun size={11} className="text-amber-500 fill-amber-100 animate-scale-in" />
          )}
        </div>

        {/* Background Icons */}
        <Sun size={11} className={`text-amber-500/60 ml-1.5 transition-opacity duration-200 ${isDarkMode ? 'opacity-0' : 'opacity-100'}`} />
        <Moon size={11} className={`text-gray-400/60 mr-1.5 transition-opacity duration-200 ${isDarkMode ? 'opacity-100' : 'opacity-0'}`} />
      </button>
      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 min-w-[32px]">
        {isDarkMode ? 'Dark' : 'Light'}
      </span>
    </div>
  );
}
