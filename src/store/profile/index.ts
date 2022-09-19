import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { I_AuthResponse } from 'services/auth/models/signIn'
import { LocalStorage } from 'utils/helpers/localStorage'

interface I_Profile {
  isAuth: boolean
  firstName: string
  lastName: string
}

const initialState: I_Profile = {
  isAuth: false,
  firstName: '',
  lastName: '',
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<I_AuthResponse>) => {
      console.log(action)
      if (action.payload.data) {
        state.isAuth = true
        state.firstName = action.payload.data.user.firstName
        state.lastName = action.payload.data.user.lastName
        if (action.payload.data.accessToken)
          LocalStorage.setAccessToken(action.payload.data.accessToken)
        if (action.payload.data.refreshToken)
          LocalStorage.setRefreshToken(action.payload.data.refreshToken)
      }
    },
    logout: () => {
      LocalStorage.removeAccessToken()
      LocalStorage.removeRefreshToken()
      return initialState
    },
  },
})

export const { signIn, logout } = profileSlice.actions