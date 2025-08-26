import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setActiveChannel } from '../Slices/channelsSlice';

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
    tagTypes: ['Channel'],
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
        async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          /* dispatch(channelCreated('Канал создан')) */
          dispatch(setActiveChannel(data));
          console.log('Канал создан');
        } catch (err) {
          /* dispatch(channelCreated('Канал не создан')) */
        }
      },
      }),
      editChannel: builder.mutation({
        query: ({ id, ...body }) => ({
          url: id,
          method: 'PATCH',
          body,
        }),
        async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
         /* dispatch(channelCreated('Канал изменен')) */
         dispatch(setActiveChannel(data));
         console.log('Канал переименован');
        } catch (err) {
          /* dispatch(channelCreated('Канал не изменен')) */
          console.log('Канал не изменен');
        }
      },
      }),
      removeChannel: builder.mutation({
        query: id => ({
          url: id,
          method: 'DELETE',
        }),
        async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          /* dispatch(channelCreated('Канал удален')) */
          console.log('Канал удален');
        } catch (err) {
          /* dispatch(channelCreated('Канал не удален')) */
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'Channel', id },
        { type: 'Messages', id }
      ],
      }),
    }),
});

export const { useGetChannelsQuery, useAddChannelMutation, useEditChannelMutation, useRemoveChannelMutation } = channelsApi;