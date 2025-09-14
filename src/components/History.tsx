import React from 'react';
import { Clock } from 'lucide-react';
import { useAppSelector } from '../hooks/redux';
import { selectCounterHistory, selectHistoryCount } from '../store/selectors';

const History: React.FC = () => {
  const history = useAppSelector(selectCounterHistory);
  const historyCount = useAppSelector(selectHistoryCount);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-md mx-auto transition-all duration-300">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="text-gray-600 dark:text-gray-400" size={20} />
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          History ({historyCount} changes)
        </h3>
      </div>
      
      <div className="max-h-64 overflow-y-auto space-y-2">
        {history.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No history available
          </p>
        ) : (
          history
            .slice()
            .reverse()
            .map((value, index) => {
              const actualIndex = history.length - 1 - index;
              const isLatest = actualIndex === history.length - 1;
              const previousValue = actualIndex > 0 ? history[actualIndex - 1] : null;
              const change = previousValue !== null ? value - previousValue : 0;
              
              return (
                <div
                  key={`${actualIndex}-${value}`}
                  className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                    isLatest
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700'
                      : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-medium px-2 py-1 rounded ${
                      isLatest
                        ? 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                    }`}>
                      #{actualIndex + 1}
                    </span>
                    <span className={`text-2xl font-bold ${
                      isLatest
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-800 dark:text-white'
                    }`}>
                      {value}
                    </span>
                  </div>
                  
                  {change !== 0 && (
                    <span className={`text-sm font-medium px-2 py-1 rounded ${
                      change > 0
                        ? 'text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/30'
                        : 'text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/30'
                    }`}>
                      {change > 0 ? '+' : ''}{change}
                    </span>
                  )}
                </div>
              );
            })
        )}
      </div>
    </div>
  );
};

export default History;