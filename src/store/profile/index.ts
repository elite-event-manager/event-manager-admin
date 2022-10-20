import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { E_AdminRole } from 'models/shared/admin'
import { T_File } from 'models/shared/upload'
import { I_AuthResponse } from 'services/auth/models/response'
import { LocalStorage } from 'utils/helpers/localStorage'

export interface I_Profile {
  isAuth: boolean
  firstName: string
  lastName: string
  role: E_AdminRole | ''
  avatar: T_File
}

const initialState: I_Profile = {
  isAuth: false,
  firstName: '',
  lastName: '',
  role: '',
  avatar: { id: 0, filename: '', mimeType: '', url: '' },
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<I_AuthResponse>) => {
      if (action.payload.data) {
        state.isAuth = true
        state.firstName = action.payload.data.user.firstName
        state.lastName = action.payload.data.user.lastName
        state.role = action.payload.data.user.role
        state.avatar = action.payload.data.user.avatar

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

export const profileActions = profileSlice.actions
