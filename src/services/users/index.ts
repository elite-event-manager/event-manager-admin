import { createApi } from '@reduxjs/toolkit/query/react'

import { T_ChangePasswordDto, T_CreateUserDto, T_UpdateUserDto } from './models/dtos'
import {
  T_CreateUserResponse,
  T_GetUserResponse,
  T_GetUsersResponse,
  T_UpdateUserResponse,
} from './models/responses'

import { baseQueryWithReAuth } from '../utils'

import { T_UserId } from 'models/shared/user'

export const usersAPI = createApi({
  reducerPath: 'usersAPI',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['users', 'user'],
  endpoints: (build) => ({
    getUsers: build.query<T_GetUsersResponse, void>({
      query: () => ({
        url: '/users',
      }),
      providesTags: ['users'],
    }),

    getUser: build.query<T_GetUserResponse, T_UserId>({
      query: (payload) => ({
        url: `/users/${payload}`,
      }),
      transformResponse: (response: T_GetUserResponse) => {
        response.data.avatar.url = import.meta.env.VITE_SERVER_API + response.data.avatar.url
        return response
      },
      providesTags: ['users', 'user'],
    }),

    createUser: build.mutation<T_CreateUserResponse, T_CreateUserDto>({
      query: (payload) => ({
        url: `/users`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['users'],
    }),

    changePassword: build.mutation<void, { password: T_ChangePasswordDto; userId: T_UserId }>({
      query: (payload) => ({
        url: `/users/changePassword${payload.userId}`,
        method: 'POST',
        body: payload.password,
      }),
    }),

    updateUser: build.mutation<T_UpdateUserResponse, { user: T_UpdateUserDto; userId: T_UserId }>({
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
