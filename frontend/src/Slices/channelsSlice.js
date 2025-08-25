import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channels: [],
  activeChannel: { name: 'general', id: 1 },
};
const channelsSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload;
    },
    setActiveChannel: (state, action) => {
      state.activeChannel = action.payload;
    },
    removeChannel: (state, action) => {
      const channelId = action.payload;
      state.channels = state.channels.filter((ch) => ch.id !== channelId);
    },
  },
});

export const { setChannels, setActiveChannel, removeChannel } = channelsSlice.actions;
export default channelsSlice.reducer;