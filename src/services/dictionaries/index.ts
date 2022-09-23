import { createApi } from '@reduxjs/toolkit/query/react'

import { I_DictionaryUserRolesResponse, I_DictionaryUserStatusesResponse } from './models/response'

import { baseQueryWithReAuth } from '../utils'

export const dictionariesAPI = createApi({
  reducerPath: 'dictionariesAPI',
  baseQuery: baseQueryWithReAuth,
  endpoints: (build) => ({
    getRoles: build.query<I_DictionaryUserRolesResponse, void>({
      query: () => ({
        url: '/dictionaries/roles',
      }),
    }),

    getStatuses: build.query<I_DictionaryUserStatusesResponse, void>({
      query: () => ({
        url: '/dictionaries/statuses',
      }),
    }),
  }),
})
