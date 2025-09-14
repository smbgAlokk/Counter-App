import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { initializeFromStorage } from './store/middleware/localStorageMiddleware';
import Counter from './components/Counter';
import History from './components/History';
import ThemeToggle from './components/ThemeToggle';
import { useAppSelector } from './hooks/redux';
import { selectThemeMode } from './store/selectors';

const AppContent: React.FC = () => {
  const theme = useAppSelector(selectThemeMode);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      theme === 'light'
        ? 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
        : 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'
    }`}>
      <ThemeToggle />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-2">
            Redux Counter App
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            A beautiful counter with complete history tracking
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center max-w-6xl mx-auto">
          <div className="w-full lg:w-auto">
            <Counter />
          </div>
          <div className="w-full lg:w-auto">
            <History />
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Built with React, Redux Toolkit & Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    initializeFromStorage(store.dispatch);
  }, []);

  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;