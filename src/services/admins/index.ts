import { createApi } from '@reduxjs/toolkit/query/react'

import { T_ChangePasswordDto } from './models/dtos'
import {
  T_GetAdminsResponse,
  T_CreateAdminResponse,
  T_UpdateAdminResponse,
  T_GetAdminResponse,
} from './models/responses'

import { baseQueryWithReAuth } from '../utils'

import { T_UserId } from 'models/shared/user'
import { I_User } from 'models/user'
import { T_CreateUserRequest, T_UpdateUserRequest } from 'models/user/forms'

export const adminsAPI = createApi({
  reducerPath: 'adminsAPI',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['admins', 'admin'],
  endpoints: (build) => ({
    getAdmins: build.query<T_GetAdminsResponse, void>({
      query: () => ({
        url: '/admins',
      }),
      providesTags: ['admins'],
    }),

    getAdmin: build.query<T_GetAdminResponse, T_UserId>({
      query: (payload) => ({
        url: `/admins/${payload}`,
      }),
      transformResponse: (response: T_GetAdminResponse) => {
        response.data.avatar.url = import.meta.env.VITE_SERVER_API + response.data.avatar.url
        return response
      },
      providesTags: ['admins', 'admin'],
    }),

    createAdmin: build.mutation<T_CreateAdminResponse, T_CreateUserRequest>({
      query: (payload) => ({
        url: `/admins`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['admins'],
    }),

    changePassword: build.mutation<void, T_ChangePasswordDto>({
      query: (payload) => ({
        url: `/admins/changePassword`,
        method: 'POST',
        body: payload,
      }),
    }),

    updateAdmin: build.mutation<
      T_UpdateAdminResponse,
      { user: T_UpdateUserRequest; userId: T_UserId }
    >({
      query: (payload) => ({
        url: `/admins/${payload.userId}`,
        method: 'PUT',
        body: payload.user,
      }),
      invalidatesTags: ['admins', 'admin'],
    }),

    deleteAdmin: build.mutation<void, T_UserId>({
      query: (payload) => ({
        url: `/admins/${payload}`,
        method: 'DELETE',
        body: payload,
      }),
      invalidatesTags: ['admins'],
    }),
  }),
})
