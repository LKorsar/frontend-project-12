import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logInSuccess: (state, action) => {
      state.user = action.payload.username
      state.isAuthenticated = true
    },
    logOutSuccess: (state) => {
      state.user = null
      state.isAuthenticated = false
    },
  },
})

export const { logInSuccess, logOutSuccess } = authSlice.actions
export default authSlice.reducer
