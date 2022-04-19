import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  loading: boolean;
}

const initialState: AuthState = {
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export const authReducer = authSlice.reducer;

export const authActions = authSlice.actions;

export const { caseReducers } = authSlice;
