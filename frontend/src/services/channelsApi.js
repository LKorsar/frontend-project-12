import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const channelsApi = createApi({
    reducerPath: 'channelsApi',
    baseQuery: fetchBaseQuery({
      baseUrl: '/api/v1/channels',
      prepareHeaders: (headers) => {
        const userId = JSON.parse(localStorage.getItem('token'));
        if (userId && userId.token) {
          headers.set('authorization', `Bearer ${userId.token}`)
        }
        return headers;
      },
    }),
    endpoints: (builder) => ({
      getChannels: builder.query({
        query: () => '',
      }),
      addChannel: builder.mutation({
        query: channel => ({
          url: '',
          method: 'POST',
          body: channel,
        }),
      }),
      editChannel: builder.mutation({
        query: ({ id, ...body }) => ({
          url: id,
          method: 'PATCH',
          body,
        }),
      }),
      removeChannel: builder.mutation({
        query: id => ({
          url: id,
          method: 'DELETE',
        }),
      }),
    }),
});

export const { useGetChannelsQuery, useAddChannelMutation, useEditChannelMutation, useRemoveChannelMutation } = channelsApi;
export const { removeChannel } = channelsApi.util;