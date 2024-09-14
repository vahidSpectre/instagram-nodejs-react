import { configureStore } from '@reduxjs/toolkit';

import userSlice from './userSlice';
import tokenSlice from './tokenSlice';

const store = configureStore({
  reducer: {
    userStore: userSlice.reducer,
    tokenStore: tokenSlice.reducer,
  },
});

export const userActions = userSlice.actions;
export const tokenAction = tokenSlice.actions;

export default store;
