// languageSlice.js
import { createSlice } from '@reduxjs/toolkit';

const configSlice = createSlice({
  name: 'config',
  initialState: {
    configUrls: null, // Default language
  },
  reducers: {
    setConfigUrls: (state, action) => {
      state.configUrls = action.payload;
    },
  },
});

export const { setConfigUrls } = configSlice.actions;

export default configSlice.reducer;