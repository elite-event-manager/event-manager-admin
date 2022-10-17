import { createApi } from '@reduxjs/toolkit/query/react'

import { I_ChangePasswordRequest } from './models/request'

import { baseQueryWithReAuth } from '../utils'

import { T_UserId } from 'models/shared/user'
import { I_User } from 'models/user'
import { T_CreateUserRequest, T_UpdateUserRequest } from 'models/user/forms'

export const usersAPI = createApi({
  reducerPath: 'usersAPI',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['users', 'user'],
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
        response.avatar.url = import.meta.env.VITE_SERVER_API + response.avatar.url
        return response
      },
      providesTags: ['users', 'user'],
    }),

    createUser: build.mutation<I_User, T_CreateUserRequest>({
      query: (payload) => ({
        url: `/users`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['users'],
    }),

    changePassword: build.mutation<void, I_ChangePasswordRequest>({
      query: (payload) => ({
        url: `/users/changePassword`,
        method: 'POST',
        body: payload,
      }),
    }),

    updateUser: build.mutation<I_User, { user: T_UpdateUserRequest; userId: T_UserId }>({
      query: (payload) => ({
        url: `/users/${payload.userId}`,
        method: 'PUT',
        body: payload.user,
      }),
      invalidatesTags: ['users', 'user'],
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
