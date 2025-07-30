import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.jsx';
import { channelsApi } from '../services/channelsApi.js';
import { messagesApi } from '../services/messagesApi.js';

export default configureStore({
  reducer: {
    authReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(channelsApi.middleware).concat(messagesApi.middleware),
});