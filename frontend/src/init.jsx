import store from './Slices/index';
import React from 'react';
import { Provider } from 'react-redux';
import { messagesApi } from './services/messagesApi';
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import resources from './locales/index.js';
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

  const i18n = i18next.createInstance();
  await i18n
   .use(initReactI18next)
   .init({
     resources,
     fallbackLng: 'ru',
     debug: true,
     interpolation: {
       escapeValue: false,
     },
   });

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Provider>
  );
};

export default init;