import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { removeChannel } from '../Slices/channelsSlice'

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/messages',
    prepareHeaders: (headers) => {
      const userId = JSON.parse(localStorage.getItem('token'))
      if (userId) {
        headers.set('authorization', `Bearer ${userId}`)
      }
      return headers
    },
  }),
  tagTypes: ['Messages', 'Channel'],
  endpoints: builder => ({
    getMessages: builder.query({
      query: () => '',
      providesTags: result =>
        result ? result.map(({ channelId }) => ({ type: 'Messages', id: channelId })) : ['Messages'],
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
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, action) => {
      const channelId = action.payload
      console.log('Before removal', state.messages)
      const updatedMessages = state.messages.filter(mes => mes.channelId !== channelId)
      console.log('After removal', updatedMessages)
      return {
        ...state,
        messages: updatedMessages,
      }
    })
  },
})

const { useGetMessagesQuery, useAddMessageMutation, useEditMessageMutation, useRemoveMessageMutation } = messagesApi
export {
  useGetMessagesQuery as getMessages,
  useAddMessageMutation as addMessage,
  useEditMessageMutation as editMessage,
  useRemoveMessageMutation as removeMessage,
}
