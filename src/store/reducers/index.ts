import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from 'store/slices/auth';
import { commonReducer } from 'store/slices/common';

const rootReducer = combineReducers({
  common: commonReducer,
  auth: authReducer,
});

export default rootReducer;
