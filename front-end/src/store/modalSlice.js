import { createSlice } from '@reduxjs/toolkit';

const initialState = { modal: false };

const modalSlice = createSlice({
  name: 'modalState',
  initialState,
  reducers: {
    openModal(state) {
      state.modal = true;
    },
    closeModal(state) {
      state.modal = false;
    },
  },
});

export default modalSlice;
