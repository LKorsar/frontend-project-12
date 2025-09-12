import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setActiveChannel } from '../Slices/channelsSlice'

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/channels',
    prepareHeaders: (headers) => {
      const userId = JSON.parse(localStorage.getItem('token'))
      if (userId) {
        headers.set('authorization', `Bearer ${userId}`)
      }
      return headers
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
        const { data } = await queryFulfilled
        dispatch(setActiveChannel(data))
        console.log('Канал создан')
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
          dispatch(setActiveChannel(data))
          console.log('Канал переименован')
        } catch (err) {
          console.log('Канал не изменен')
          throw err
        }
      },
    }),
    removeChannel: builder.mutation({
      query: id => ({
        url: id,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { queryFulfilled }) {
        const { data } = await queryFulfilled
        console.log('Канал удален')
        console.log(data)
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'Channel', id },
        { type: 'Messages', id },
      ],
    }),
  }),
})

export const { useGetChannelsQuery, useAddChannelMutation, useEditChannelMutation, useRemoveChannelMutation } = channelsApi
