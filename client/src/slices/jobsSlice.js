import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobsList: [],
  selectedJob: {},
};

const jobsSlice = createSlice({
  name: 'jobsSlice',
  initialState,
  reducers: {
    addJobToList: (state, action) => {
      const id = Math.random() * 100;
      let job = { ...action.payload, id };
      state.jobsList.push(job);
    },
    removeJobFromList: (state, action) => {
      state.jobsList = state.jobsList.filter(
        (job) => job.id !== action.payload.id
      );
    },
    updateJobInList: (state, action) => {
      state.jobsList = state.jobsList.map((job) =>
        job.id === action.payload.id ? action.payload : job
      );
    },
    setSelectedJob: (state, action) => {
      state.selectedJob = action.payload;
    },
  },
});

export const {
  addJobToList,
  removeJobFromList,
  updateJobInList,
  setSelectedJob,
} = jobsSlice.actions;

export default jobsSlice.reducer;
