import { Middleware } from '@reduxjs/toolkit';
import { loadFromStorage } from '../counterSlice';
import { loadThemeFromStorage } from '../themeSlice';

const COUNTER_KEY = 'redux-counter-state';
const THEME_KEY = 'redux-theme-state';

export const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  
  // Save to localStorage after each action
  const state = store.getState();
  
  try {
    localStorage.setItem(COUNTER_KEY, JSON.stringify(state.counter));
    localStorage.setItem(THEME_KEY, JSON.stringify(state.theme.mode));
  } catch (error) {
    console.warn('Could not save state to localStorage:', error);
  }
  
  return result;
};

// Load initial state from localStorage
export const loadStateFromStorage = () => {
  try {
    const counterState = localStorage.getItem(COUNTER_KEY);
    const themeState = localStorage.getItem(THEME_KEY);
    
    return {
      counter: counterState ? JSON.parse(counterState) : undefined,
      theme: themeState ? JSON.parse(themeState) : undefined,
    };
  } catch (error) {
    console.warn('Could not load state from localStorage:', error);
    return {};
  }
};

export const initializeFromStorage = (dispatch: any) => {
  const savedState = loadStateFromStorage();
  
  if (savedState.counter) {
    dispatch(loadFromStorage(savedState.counter));
  }
  
  if (savedState.theme) {
    dispatch(loadThemeFromStorage(savedState.theme));
  }
};