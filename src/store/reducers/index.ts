import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from 'store/slices/auth';
import { commonReducer } from 'store/slices/common';
import { resourceReducer } from 'store/slices/resource';

const rootReducer = combineReducers({
  common: commonReducer,
  auth: authReducer,
  resource: resourceReducer,
});

export default rootReducer;
