import { createApi } from '@reduxjs/toolkit/query/react'

import { I_SignInDto } from './models/dtos'
import { T_AuthResponse } from './models/responses'

import { baseQueryWithReAuth } from 'services/utils'

export const authAPI = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReAuth,
  endpoints: (build) => ({
    signIn: build.mutation<T_AuthResponse, I_SignInDto>({
      query: (payload) => ({
        url: 'auth/signin',
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: T_AuthResponse) => {
        if (response.data?.user.avatar?.url) {
          response.data.user.avatar.url =
            import.meta.env.VITE_SERVER_API + response.data.user.avatar.url
        }
        return response
      },
    }),
    check: build.query<T_AuthResponse, void>({
      query: () => ({
        url: `auth/check`,
      }),
      transformResponse: (response: T_AuthResponse) => {
        if (response.data?.user.avatar?.url) {
          response.data.user.avatar.url =
            import.meta.env.VITE_SERVER_API + response.data.user.avatar.url
        }
        return response
      },
    }),
  }),
})
