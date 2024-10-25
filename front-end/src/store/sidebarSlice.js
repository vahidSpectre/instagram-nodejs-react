import { createSlice } from '@reduxjs/toolkit';

const initialState = { fullWidth: true };

const sidebarSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open(state) {
      state.fullWidth = true;
    },
    close(state) {
      state.fullWidth = false;
    },
  },
});

export default sidebarSlice;
