import { createSlice } from '@reduxjs/toolkit'

interface Profile {
  isAuth: boolean
}

const initialState: Profile = {
  isAuth: false,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    signIn: (state) => {
      state.isAuth = true
    },
    logout: (state) => {
      state.isAuth = false
    },
  },
})

export const { signIn, logout } = profileSlice.actions
