// src/redux/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // This will hold user info like name, email
  token: null, // The authentication token from the server
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // This action is called when a user successfully logs in
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    // This action is called when a user logs out
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

// Export the functions that components will use to change the state
export const { loginSuccess, logout } = authSlice.actions;

// Export the reducer to be added to the main store
export default authSlice.reducer;