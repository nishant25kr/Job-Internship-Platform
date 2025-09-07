import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  jobLoading: false,
  jobError: null,
  aggredToApply: false
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
    setAgreeTrue: (state) => {
      state.aggredToApply = true
    },
    setAgreeFalse: (state) => {
      state.aggredToApply = false
    }

  },
});

export const { fetchingStart, fetchingSuccess, fetchingFailed, setAgreeTrue, setAgreeFalse } = jobsSlice.actions;
export default jobsSlice.reducer;