import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReAuth } from '../utils'

import { T_UserId } from 'models/shared/user'
import { I_User, T_UserRequest } from 'models/user'

export const usersAPI = createApi({
  reducerPath: 'usersAPI',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['users'],
  endpoints: (build) => ({
    getUsers: build.query<I_User[], void>({
      query: () => ({
        url: '/users',
      }),
      providesTags: ['users'],
    }),

    getUser: build.query<I_User, T_UserId>({
      query: (payload) => ({
        url: `/users/${payload}`,
      }),
      transformResponse: (response: I_User) => {
        response.avatar = import.meta.env.VITE_SERVER_API + response.avatar
        return response
      },
      providesTags: ['users'],
    }),

    createUser: build.mutation<I_User, T_UserRequest>({
      query: (payload) => ({
        url: `/users`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['users'],
    }),

    deleteUser: build.mutation<void, T_UserId>({
      query: (payload) => ({
        url: `/users/${payload}`,
        method: 'DELETE',
        body: payload,
      }),
      invalidatesTags: ['users'],
    }),
  }),
})
