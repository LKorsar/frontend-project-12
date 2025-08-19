import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.jsx';
import messagesReducer from './messagesSlice.jsx';
import channelsReducer from './channelsSlice.jsx';
import { channelsApi } from '../services/channelsApi.js';
import { messagesApi } from '../services/messagesApi.js';

export default configureStore({
  reducer: {
    authReducer,
    messagesReducer,
    channelsReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(channelsApi.middleware).concat(messagesApi.middleware),
});

/* setupListeners(store.dispatch) */