import { createApi } from '@reduxjs/toolkit/query/react'

import { T_ChangePasswordDto, T_CreateAdminDto, T_UpdateAdminDto } from './models/dtos'
import {
  T_GetAdminsResponse,
  T_CreateAdminResponse,
  T_UpdateAdminResponse,
  T_GetAdminResponse,
} from './models/responses'

import { baseQueryWithReAuth } from '../utils'

import { T_AdminId } from 'models/shared/admin'

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

    getAdmin: build.query<T_GetAdminResponse, T_AdminId>({
      query: (payload) => ({
        url: `/admins/${payload}`,
      }),
      transformResponse: (response: T_GetAdminResponse) => {
        response.data.avatar.url = import.meta.env.VITE_SERVER_API + response.data.avatar.url
        return response
      },
      providesTags: ['admins', 'admin'],
    }),

    createAdmin: build.mutation<T_CreateAdminResponse, T_CreateAdminDto>({
      query: (payload) => ({
        url: `/admins`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['admins'],
    }),

    changePassword: build.mutation<void, { password: T_ChangePasswordDto; adminId: T_AdminId }>({
      query: (payload) => ({
        url: `/admins/changePassword${payload.adminId}`,
        method: 'PATCH',
        body: payload.password,
      }),
    }),

    updateAdmin: build.mutation<
      T_UpdateAdminResponse,
      { admin: T_UpdateAdminDto; adminId: T_AdminId }
    >({
      query: (payload) => ({
        url: `/admins/${payload.adminId}`,
        method: 'PUT',
        body: payload.admin,
      }),
      invalidatesTags: ['admins', 'admin'],
    }),

    deleteAdmin: build.mutation<void, T_AdminId>({
      query: (payload) => ({
        url: `/admins/${payload}`,
        method: 'DELETE',
        body: payload,
      }),
      invalidatesTags: ['admins'],
    }),
  }),
})
