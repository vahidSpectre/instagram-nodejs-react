import { configureStore } from '@reduxjs/toolkit';

import userSlice from './userSlice';
import tokenSlice from './tokenSlice';
import modalSlice from './modalSlice';

const store = configureStore({
  reducer: {
    userStore: userSlice.reducer,
    tokenStore: tokenSlice.reducer,
    modalStore: modalSlice.reducer,
  },
});

export const userActions = userSlice.actions;
export const tokenAction = tokenSlice.actions;
export const modalActions = modalSlice.actions;

export default store;
