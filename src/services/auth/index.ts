import { createApi } from '@reduxjs/toolkit/query/react'

import { I_SignInRequest } from './models/request'
import { I_AuthResponse } from './models/response'

import { baseQueryWithReAuth } from 'services/utils'

export const authAPI = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReAuth,
  endpoints: (build) => ({
    signIn: build.mutation<I_AuthResponse, I_SignInRequest>({
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
