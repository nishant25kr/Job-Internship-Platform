import { createSlice } from "@reduxjs/toolkit";

const savedTheme = localStorage.getItem("theme");
const initialState = savedTheme ? ({ theme: savedTheme }) : ({ theme: "dark" })

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        changetheme: (state, action) => {
            state.theme = action.payload;
            localStorage.setItem("theme", action.payload)
        },
    },
});

export const { changetheme } = themeSlice.actions;
export default themeSlice.reducer;
