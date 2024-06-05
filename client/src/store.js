import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './slices/jobsSlice.js';
export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
  },
});
