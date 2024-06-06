
import { createSlice } from '@reduxjs/toolkit';

const refreshSlice = createSlice({
  name: 'refresh',
  initialState: {
    isRefresh: false, // Default language
  },
  reducers: {
    setRefresh: (state, action) => {
      state.isRefresh = action.payload;
    },
  },
});

export const { setRefresh } = refreshSlice.actions;

export default refreshSlice.reducer;

