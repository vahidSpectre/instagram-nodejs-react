import { createSlice } from '@reduxjs/toolkit';

const initialState = { messages: [] };

const infoSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    removeMessage(state, action) {
      state.messages = state.messages.filter(
        (_, index) => index !== action.payload,
      );
    },
  },
});

export const { addMessage, removeMessage } = infoSlice.actions;

export const addMessageWithTimeout = message => dispatch => {
  dispatch(addMessage(message));
  setTimeout(() => {
    dispatch(removeMessage(0));
  }, 6000);
};

export default infoSlice;
