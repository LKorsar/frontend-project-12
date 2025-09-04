import store from './Slices/index';
import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import * as Yup from 'yup';
import * as leoProfanity from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import PropTypes from 'prop-types';
import { messagesApi } from './services/messagesApi.js';
import { channelsApi } from './services/channelsApi.js';
import resources from './locales/index.js';
import App from './App.jsx';
import FilterContext from './contexts/index.jsx';

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

  const handleNewChannel = (payload) => {
    store.dispatch(
      channelsApi.util.updateQueryData(
        'getChannels',
        undefined,
        (draftChannel) => {
          draftChannel.push(payload);
        },
      ),
    );
  };

  const handleEditChannel = (payload) => {
    store.dispatch(
      channelsApi.util.updateQueryData(
        'getChannels',
        undefined,
        (draftChannel) => {
          draftChannel.push(payload);
        },
      ),
    );
  };

  const handleRemoveChannel = (payload) => {
    store.dispatch(
      channelsApi.util.updateQueryData(
        'getChannels',
        undefined,
        (draftChannel) => {
          draftChannel.push(payload);
        },
      ),
    );
  };
  socket.on('newMessage', handleNewMessage);
  socket.on('newChannel', handleNewChannel);
  socket.on('renameChannel', handleEditChannel);
  socket.on('removeChannel', handleRemoveChannel);
  socket.off('newMessage', handleNewMessage);
  socket.off('newChannel', handleNewChannel);
  socket.off('renameChannel', handleEditChannel);
  socket.off('removeChannel', handleRemoveChannel);

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
   })
     .then(() => {
       Yup.setLocale({
        mixed: {
          required: () => i18n.t('errors.required'),
          notOneOf: () => i18n.t('errors.notOneOf'),
          oneOf: () => i18n.t('errors.oneOf'),
        },
        string: {
          min: ({ min }) => i18n.t('errors.min', { min }),
          max: ({ max }) => i18n.t('errors.max', { max }),
        },
       })
     });

  const FilterProvider = ({ children }) => {
    leoProfanity.add(leoProfanity.getDictionary('ru'));
    leoProfanity.add(leoProfanity.getDictionary('en'));
    return (
      <FilterContext.Provider value={leoProfanity}>
        {children}
      </FilterContext.Provider>
    );
  };
  FilterProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const rollbarConfig = {
    accessToken: 'b338e51dd6474b9da1c78ebec2b3081d',
    environment: 'testenv',
  };

  return (
    <Provider store={store}>
      <RollbarProvider config={rollbarConfig}>
        <I18nextProvider i18n={i18n}>
          <FilterProvider>
            <App />
            <ErrorBoundary />
          </FilterProvider>
        </I18nextProvider>
      </RollbarProvider>
    </Provider>
  );
};

export default init;