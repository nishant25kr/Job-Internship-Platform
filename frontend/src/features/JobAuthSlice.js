import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  jobLoading: false,
  jobError: null,
};

export const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    fetchingStart: (state) => {
      state.jobLoading = true;
      state.jobError = null;
    },
    fetchingSuccess: (state, action) => {
      state.jobLoading = false;
      state.jobs = action.payload;  
    },
    fetchingFailed: (state, action) => {
      state.jobLoading = false;
      state.jobError = action.payload;
    },
  },
});

export const { fetchingStart, fetchingSuccess, fetchingFailed } = jobsSlice.actions;
export default jobsSlice.reducer;
