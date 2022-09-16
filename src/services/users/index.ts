import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReAuth } from '../utils'

import { I_User } from 'models/user'

export const usersAPI = createApi({
  reducerPath: 'usersAPI',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['users'],
  endpoints: (build) => ({
    getUsers: build.query<I_User[], void>({
      query: () => ({
        url: '/users',
      }),
    }),
  }),
})
