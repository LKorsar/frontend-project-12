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
        query: (id, channel) => ({
          url: id,
          method: 'PATCH',
          body: channel,
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

const { useGetChannelsQuery, useAddChannelMutation, useEditChannelMutation, useRemoveChannelMutation } = channelsApi;
export {
  useGetChannelsQuery as getChannels,
  useAddChannelMutation as addChannel,
  useEditChannelMutation as editChannel,
  useRemoveChannelMutation as removeChannel,
};