import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/AuthSlice"
import themeReducer from "../features/ThemeSlice"
import jobReducer from '../features/JobAuthSlice'

export const store = configureStore({
    reducer: {
    auth: authReducer,
    theme: themeReducer,
    job: jobReducer
  }
})

export default store