import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PersistConfig, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { AuthStatus } from 'constants/enums/auth-status';

export interface AuthState {
  status: AuthStatus;
  cipher?: string;
}

const initialState: AuthState = {
  status: AuthStatus.Unauthorized,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, { payload }: PayloadAction<{ cipher: string }>) {
      state.cipher = payload.cipher;
      state.status = AuthStatus.Authorized;
    },
    logoutRequest(state) {
      delete state.cipher;
      state.status = AuthStatus.Unauthorized;
    },
  },
});

const persistConfig: PersistConfig<AuthState> = {
  key: 'auth',
  version: 1,
  storage,
  whitelist: ['cipher'],
};

export const authReducer = persistReducer(persistConfig, authSlice.reducer);

export const authActions = authSlice.actions;

export const { caseReducers } = authSlice;
