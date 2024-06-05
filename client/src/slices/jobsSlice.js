import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  jobsList: [],
  selectedJob: {},
  isLoading: false,
  error: '',
};

//GET
export const getJobs = createAsyncThunk(
  'jobs/getJobs',
  async (_, { rejectWithValue }) => {
    const response = await fetch('http://localhost:8000/job');
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      return rejectWithValue({ error: 'No Jobs Found' });
    }
  }
);
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
  extraReducers: (builder) => {
    builder
      .addCase(getJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.jobsList = action.payload;
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
        state.jobsList = [];
      });
  },
});

export const {
  addJobToList,
  removeJobFromList,
  updateJobInList,
  setSelectedJob,
} = jobsSlice.actions;

export default jobsSlice.reducer;
