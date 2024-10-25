import { configureStore } from '@reduxjs/toolkit';

import userSlice from './userSlice';
import tokenSlice from './tokenSlice';
import modalSlice from './modalSlice';
import infoSlice from './infoSlice';
import sidebarSlice from './sidebarSlice';

const store = configureStore({
  reducer: {
    userStore: userSlice.reducer,
    tokenStore: tokenSlice.reducer,
    modalStore: modalSlice.reducer,
    infoStore: infoSlice.reducer,
    sidebarStore: sidebarSlice.reducer,
  },
});

export const userActions = userSlice.actions;
export const tokenAction = tokenSlice.actions;
export const modalActions = modalSlice.actions;
export const infoActions = infoSlice.actions;
export const sidebarAction = sidebarSlice.actions;

export default store;
