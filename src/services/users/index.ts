import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReAuth } from '../utils'

import { I_User, T_UserForm } from 'models/user'

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

    createUser: build.mutation<I_User, T_UserForm>({
      query: (payload) => ({
        url: `/funds`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['users'],
    }),
  }),
})
