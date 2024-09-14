import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: JSON.parse(localStorage.getItem('token')) || null,
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    loadToken(state, action) {
      state.token = action.payload;
      localStorage.setItem(
        'token',
        JSON.stringify(action.payload),
      );
    },
    removeToken(state) {
      state.token = null;
      localStorage.setItem('token', null);
    },
  },
});

export default tokenSlice;
