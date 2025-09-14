import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { toggleTheme } from '../store/themeSlice';
import { selectThemeMode } from '../store/selectors';

const ThemeToggle: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectThemeMode);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="fixed top-4 right-4 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 border border-gray-200 dark:border-gray-700"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="text-gray-800 dark:text-yellow-400" size={24} />
      ) : (
        <Sun className="text-yellow-500" size={24} />
      )}
    </button>
  );
};

export default ThemeToggle;