import { createApi } from '@reduxjs/toolkit/query/react'

import {
  T_ChangePasswordDto,
  T_ChangeRolesDto,
  T_CreateAdminDto,
  T_UpdateAdminDto,
} from './models/dtos'
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
    getAdmins: build.query<T_GetAdminsResponse, null>({
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
        if (response.data?.avatar) {
          response.data.avatar = import.meta.env.VITE_SERVER_AVATAR + response.data.avatar
        }
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

    changePassword: build.mutation<void, { body: T_ChangePasswordDto; adminId: string }>({
      query: (payload) => ({
        url: `/admins/changePassword/${payload.adminId}`,
        method: 'PATCH',
        body: payload.body,
      }),
    }),

    changeRoles: build.mutation<void, { body: T_ChangeRolesDto; adminId: string }>({
      query: (payload) => ({
        url: `/admins/changeRoles/${payload.adminId}`,
        method: 'PATCH',
        body: payload.body,
      }),
      invalidatesTags: ['admins', 'admin'],
    }),

    updateAdmin: build.mutation<T_UpdateAdminResponse, { body: T_UpdateAdminDto; adminId: string }>(
      {
        query: (payload) => ({
          url: `/admins/${payload.adminId}`,
          method: 'PUT',
          body: payload.body,
        }),
        invalidatesTags: ['admins', 'admin'],
      },
    ),

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
