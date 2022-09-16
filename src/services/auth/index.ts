import { createApi } from '@reduxjs/toolkit/query/react'

import { I_AuthResponse, I_SignInPayload } from './models/signIn'

import { baseQueryWithReAuth } from 'services/utils'

export const authAPI = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReAuth,
  endpoints: (build) => ({
    signIn: build.mutation<I_AuthResponse, I_SignInPayload>({
      query: (payload) => ({
        url: 'auth/signin',
        method: 'POST',
        body: payload,
      }),
    }),
    check: build.query<I_AuthResponse, void>({
      query: () => ({
        url: `auth/check`,
      }),
    }),
  }),
})
