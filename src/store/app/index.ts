import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { E_Locale } from 'models/app'

interface I_InitialState {
  language: E_Locale
}

export const initialState: I_InitialState = {
  language: E_Locale.ru,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    switchLanguage: (state, action: PayloadAction<E_Locale>) => {
      state.language = action.payload
    },
  },
})

export const { switchLanguage } = appSlice.actions
