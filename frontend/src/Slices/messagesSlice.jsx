import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: {},
  },
});

export const { setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;