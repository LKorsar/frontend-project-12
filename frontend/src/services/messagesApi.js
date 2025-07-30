import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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