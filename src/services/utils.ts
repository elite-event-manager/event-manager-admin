import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query'

import { T_Tokens } from 'models/shared/app'
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
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    const refreshToken = LocalStorage.getRefreshToken()
    const refreshResult = await fetch(`${import.meta.env.VITE_SERVER_API}/auth/refresh`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })

    const response = await refreshResult.json()

    if (response.data) {
      LocalStorage.setAccessToken((response?.data as T_Tokens).accessToken)
      LocalStorage.setRefreshToken((response?.data as T_Tokens).refreshToken)
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(profileActions.logout())
    }
  }
  return result
}
