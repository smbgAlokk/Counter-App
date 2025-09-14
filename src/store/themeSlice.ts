import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  mode: 'light' | 'dark';
}

const initialState: ThemeState = {
  mode: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    loadThemeFromStorage: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { toggleTheme, loadThemeFromStorage } = themeSlice.actions;
export default themeSlice.reducer;