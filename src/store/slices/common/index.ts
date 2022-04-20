import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CommonState {
  loading: boolean;
}

const initialState: CommonState = {
  loading: false,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLoading(state, { payload }: PayloadAction<boolean>) {
      state.loading = payload;
    },
  },
});

export const commonReducer = commonSlice.reducer;

export const commonActions = commonSlice.actions;

export const { caseReducers } = commonSlice;
