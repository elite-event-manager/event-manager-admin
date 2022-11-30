import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { I_AdminRole } from 'models/roles'
import { T_AuthResponse } from 'services/auth/models/responses'
import { T_TokenData } from 'services/utils'
import { LocalStorage } from 'utils/helpers/localStorage'

export interface I_Profile {
  isAuth: boolean
  firstName: string
  lastName: string
  roles: I_AdminRole[]
  avatar: string
}

const initialState: I_Profile = {
  isAuth: false,
  firstName: '',
  lastName: '',
  roles: [],
  avatar: '',
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<T_AuthResponse>) => {
      if (action.payload.data) {
        state.isAuth = true
        state.firstName = action.payload.data.admin.firstName
        state.lastName = action.payload.data.admin.lastName
        state.roles = action.payload.data.admin.roles
        state.avatar = action.payload.data.admin.avatar

        if (action.payload.data.accessToken)
          LocalStorage.setAccessToken(action.payload.data.accessToken)
        if (action.payload.data.refreshToken)
          LocalStorage.setRefreshToken(action.payload.data.refreshToken)
      }
    },
    refreshProfile: (state, action: PayloadAction<T_TokenData>) => {
      state.roles = [...action.payload.roles]
    },
    logout: () => {
      LocalStorage.removeAccessToken()
      LocalStorage.removeRefreshToken()
      return initialState
    },
  },
})

export const profileActions = profileSlice.actions
