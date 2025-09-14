import React, { useState } from 'react';
import { Plus, Minus, RotateCcw, Trash2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { increment, decrement, reset, incrementByAmount, clearHistory } from '../store/counterSlice';
import { selectCounterValue, selectLastChange } from '../store/selectors';

const Counter: React.FC = () => {
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectCounterValue);
  const lastChange = useAppSelector(selectLastChange);
  const [customStep, setCustomStep] = useState<number>(5);

  const handleIncrementByAmount = () => {
    dispatch(incrementByAmount(customStep));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto transition-all duration-300">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Counter
        </h2>
        <div className="relative">
          <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 transition-all duration-300 transform hover:scale-105">
            {value}
          </div>
          {lastChange !== 0 && (
            <div className={`text-sm font-medium mt-1 ${
              lastChange > 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {lastChange > 0 ? '+' : ''}{lastChange}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {/* Basic Controls */}
        <div className="flex gap-3">
          <button
            onClick={() => dispatch(decrement())}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95"
          >
            <Minus size={20} />
            Decrease
          </button>
          <button
            onClick={() => dispatch(increment())}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95"
          >
            <Plus size={20} />
            Increase
          </button>
        </div>

        {/* Custom Step Control */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label htmlFor="customStep" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Custom Step:
            </label>
            <input
              id="customStep"
              type="number"
              value={customStep}
              onChange={(e) => setCustomStep(Number(e.target.value))}
              className="w-20 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="1"
            />
          </div>
          <button
            onClick={handleIncrementByAmount}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            +{customStep}
          </button>
        </div>

        {/* Reset and Clear History */}
        <div className="flex gap-3">
          <button
            onClick={() => dispatch(reset())}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95"
          >
            <RotateCcw size={18} />
            Reset
          </button>
          <button
            onClick={() => dispatch(clearHistory())}
            className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95"
          >
            <Trash2 size={18} />
            Clear History
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;