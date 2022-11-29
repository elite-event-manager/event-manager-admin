import { createApi } from '@reduxjs/toolkit/query/react'

import { I_DictionaryUserStatusesResponse } from './models/responses'

import { baseQueryWithReAuth } from '../utils'

export const dictionariesAPI = createApi({
  reducerPath: 'dictionariesAPI',
  baseQuery: baseQueryWithReAuth,
  endpoints: (build) => ({
    getStatuses: build.query<I_DictionaryUserStatusesResponse, void>({
      query: () => ({
        url: '/dictionaries/statuses',
      }),
    }),
  }),
})
