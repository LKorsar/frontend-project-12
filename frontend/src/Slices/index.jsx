import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.jsx';
import channelsReducer from './channelsSlice.jsx';

export default configureStore({
  reducer: {
    authReducer,
    channelsReducer,
  },
});