import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.jsx';
import channelsReducer from './channelsSlice.jsx';

const store = configureStore({
  reducer: {
    authReducer,
    channelsReducer,
  },
});

export default store;