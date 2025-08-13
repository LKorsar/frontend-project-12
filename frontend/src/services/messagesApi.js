import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { io } from 'socket.io-client';

const socket = io('https://localhost:3000');
export const messagesApi = createApi({
  reducerPath: 'messagesApi',
      baseQuery: fetchBaseQuery({
        baseUrl: '/api/v1/messages',
        prepareHeaders: (headers) => {
          const userId = JSON.parse(localStorage.getItem('token'));
          if (userId && userId.token) {
            headers.set('authorization', `Bearer ${userId.token}`)
          }
          return headers;
        },
      }),
      endpoints: (builder) => ({
        getMessages: builder.query({
          query: () => '',
          async onCacheEntryAdded(
            arg,
            { updateCachedData, cacheEntryRemoved, dispatch }
          ) {
            try {
             // Подписка на сокет-событие при добавлении entry в кеш
              const handleMessageReceived = (newMessage) => {
                updateCachedData((draft) => {
                  draft.push(newMessage);
                });
              };

              socket.on('newMessage', handleMessageReceived);
              // Обработка ошибок соединения
              socket.on('connect_error', (error) => {
                console.error('Connection error:', error);
              });

              // Удаление подписчика и обработка ошибок
              await cacheEntryRemoved;
            } catch (error) {
              console.error('Error in onCacheEntryAdded:', error);
            } finally {
              socket.off('newMessage', handleMessageReceived);
              socket.off('connect_error'); // Убедитесь в удалении слушателя ошибок, если это необходимо
            }
          },
        }),
        addMessage: builder.mutation({
          query: message => ({
            url: '',
            method: 'POST',
            body: message,
          }),
        }),
        editMessage: builder.mutation({
          query: (id, message) => ({
            url: id,
            method: 'PATCH',
            body: message,
          }),
        }),
        removeMessage: builder.mutation({
          query: id => ({
            url: id,
            method: 'DELETE',
          }),
        }),
      }),
});

const { useGetMessagesQuery, useAddMessageMutation, useEditMessageMutation, useRemoveMessageMutation } = messagesApi;
export {
  useGetMessagesQuery as getMessages,
  useAddMessageMutation as addMessage,
  useEditMessageMutation as editMessage,
  useRemoveMessageMutation as removeMessage,
};
