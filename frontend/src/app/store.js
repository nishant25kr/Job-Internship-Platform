import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/AuthSlice"
import themeReducer from "../features/ThemeSlice"

export const store = configureStore({
    reducer: {
    auth: authReducer,
    theme: themeReducer
  }
})

export default store