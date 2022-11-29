import { createApi } from '@reduxjs/toolkit/query/react'

import { T_CreateRoleDto, T_UpdateRoleDto } from './models/dtos'
import {
  T_GetRolesResponse,
  T_GetRoleResponse,
  T_CreateRoleResponse,
  T_UpdateRoleResponse,
} from './models/responses'

import { baseQueryWithReAuth } from '../utils'

export const rolesAPI = createApi({
  reducerPath: 'rolesAPI',
  baseQuery: baseQueryWithReAuth,
  endpoints: (build) => ({
    getRoles: build.query<T_GetRolesResponse, null>({
      query: () => ({
        url: '/roles',
      }),
    }),

    getRole: build.query<T_GetRoleResponse, string>({
      query: (payload) => ({
        url: `/roles/${payload}`,
      }),
    }),

    createRole: build.mutation<T_CreateRoleResponse, T_CreateRoleDto>({
      query: (payload) => ({
        url: `/roles`,
        method: 'POST',
        body: payload,
      }),
    }),

    updateRole: build.mutation<T_UpdateRoleResponse, { body: T_UpdateRoleDto; roleId: string }>({
      query: (payload) => ({
        url: `/roles/${payload.roleId}`,
        method: 'PUT',
        body: payload.body,
      }),
    }),

    deleteRole: build.mutation<void, string>({
      query: (payload) => ({
        url: `/roles/${payload}`,
        method: 'DELETE',
        body: payload,
      }),
    }),
  }),
})
