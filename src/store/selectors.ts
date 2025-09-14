import { RootState } from './index';

export const selectCounterValue = (state: RootState) => state.counter.value;
export const selectCounterHistory = (state: RootState) => state.counter.history;
export const selectThemeMode = (state: RootState) => state.theme.mode;

export const selectHistoryCount = (state: RootState) => 
  state.counter.history.length;

export const selectLastChange = (state: RootState) => {
  const history = state.counter.history;
  return history.length > 1 ? history[history.length - 1] - history[history.length - 2] : 0;
};