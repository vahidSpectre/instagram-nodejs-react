import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loadUser(state, action) {
      state.user = action.payload;
      localStorage.setItem(
        'user',
        JSON.stringify(action.payload),
      );
    },
    removeUser(state) {
      state.user = null;
    },
  },
});

export default userSlice;
