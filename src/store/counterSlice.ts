import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
  history: number[];
}

const initialState: CounterState = {
  value: 0,
  history: [0],
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
      state.history.push(state.value);
    },
    decrement: (state) => {
      state.value -= 1;
      state.history.push(state.value);
    },
    reset: (state) => {
      state.value = 0;
      state.history.push(0);
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
      state.history.push(state.value);
    },
    clearHistory: (state) => {
      state.history = [state.value];
    },
    loadFromStorage: (state, action: PayloadAction<CounterState>) => {
      return action.payload;
    },
  },
});

export const {
  increment,
  decrement,
  reset,
  incrementByAmount,
  clearHistory,
  loadFromStorage,
} = counterSlice.actions;

export default counterSlice.reducer;