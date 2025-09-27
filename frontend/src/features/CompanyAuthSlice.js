import { createSlice } from "@reduxjs/toolkit";

let persistedState;

try {
    persistedState = JSON.parse(localStorage.getItem("Company"));
} catch {
    persistedState = null;
}

const initialState = persistedState || {
    company: null,
    loading: false,
    error: null,
};

export const CompanyAuthSlice = createSlice({
    name: 'companyauth',
    initialState,
    reducers: {
        companyloginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        companyloginSuccess: (state, action) => {
            const { company } = action.payload;
            state.company = company;
            state.loading = false;
            localStorage.setItem("Company", JSON.stringify(state));
        },
        companyloginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        companylogoutStart: (state) => {
            state.loading = true,
                state.error = null;
        },
        companylogoutSuccess: (state) => {
            state.company = null;
            state.loading = false;
            localStorage.removeItem("Company");
        },
    }
});

export const {
    companyloginStart,
    companyloginSuccess,
    companyloginFailure,
    companylogoutStart,
    companylogoutSuccess
} = CompanyAuthSlice.actions;

export default CompanyAuthSlice.reducer;
