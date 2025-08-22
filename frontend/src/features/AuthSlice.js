import { createSlice } from "@reduxjs/toolkit";

let persistedState;
try {
    persistedState = JSON.parse(localStorage.getItem("User"));
} catch {
    persistedState = null;
}


const initialState = persistedState || ({
    user: null,
    isAuthenticated: false,
    loading: false,
    passwordLoading: false,
    editProfileLoading: false,
    error: null,
    rememberMe: false,
    lastLogin: null,
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            const { user, rememberMe } = action.payload
            state.user = user;
            state.rememberMe = rememberMe || false;
            state.isAuthenticated = true;
            state.loading = false;
            state.lastLogin = new Date().toISOString();
            localStorage.setItem("User", JSON.stringify(state));
        },
        loginFailure: (state, action) => {
            state.loading = false,
                state.error = action.payload
        },
        logoutStart: (state, action) => {
            state.loading = true,
                state.error = null;
        },
        logoutSucess: (state) => {
            state.user = null;
            state.rememberMe = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.lastLogin = null;
            localStorage.removeItem("User");
        },
        passwordChangeStart: (state) => {
            state.passwordLoading = true;
            state.error = null;
        },
        passwordChangeSuccess: (state) => {
            state.passwordLoading = false;
        },
        passwordChangeFailure: (state, action) => {
            state.passwordLoading = false;
            state.error = action.payload;
        },

    }
})

export const {
    loginSuccess,
    loginStart,
    loginFailure,
    logoutSucess,
    logoutStart,
    passwordChangeStart,
    passwordChangeSuccess,
    passwordChangeFailure,
} = authSlice.actions

export default authSlice.reducer;