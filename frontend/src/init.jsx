import store from './Slices/index';
import React from 'react';
import { Provider } from 'react-redux';
import { messagesApi } from './services/messagesApi';
import App from './App.jsx';

const init = async (socket) => {
  const handleNewMessage = (payload) => {
    store.dispatch(
      messagesApi.util.updateQueryData(
        'getMessages',
        undefined,
        (draftMessage) => {
          draftMessage.push(payload);
        },
      ),
    );
  };
  socket.on('newMessage', handleNewMessage);
  socket.off('newMessage', handleNewMessage);

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default init;