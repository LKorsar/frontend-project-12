import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { io } from 'socket.io-client';

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
            { updateCachedData, cacheEntryRemoved }
          ) {
            const socket = io('http://localhost:5001', { transports: ['websocket'] });
            const handleMessageReceived = (arg) => {
                updateCachedData((draft) => {
                  draft.push(arg);
                });
            };
            try {
              socket.on('newMessage', handleMessageReceived);
              socket.on('connect_error', (error) => {
                console.error('Connection error:', error);
              });
              await cacheEntryRemoved;
            } catch (error) {
              console.error('Error in onCacheEntryAdded:', error);
            } finally {
              socket.off('newMessage', handleMessageReceived);
              socket.off('connect_error');
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
          query: ({ id, message }) => ({
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
