import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./pageSlice";
import authReducer from './authSlice';
export const store = configureStore({
  reducer: {
    page: pageReducer,
    auth: authReducer,
  },
});
