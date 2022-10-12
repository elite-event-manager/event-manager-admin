import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query'

import { profileActions } from 'store/profile'
import { LocalStorage } from 'utils/helpers/localStorage'

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_SERVER_API}`,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const accessToken = LocalStorage.getAccessToken()
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    }
    return headers
  },
})

export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    api.dispatch(profileActions.logout())
  }
  return result
}
