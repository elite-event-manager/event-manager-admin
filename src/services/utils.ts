import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query'
import jwt_decode from 'jwt-decode'

import { I_AdminRole } from 'models/roles'
import { T_Tokens } from 'models/shared/app'
import { profileActions } from 'store/profile'
import { LocalStorage } from 'utils/helpers/localStorage'

export type T_TokenData = {
  sub: number
  email: string
  roles: I_AdminRole[]
}

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
      const accessToken = (response?.data as T_Tokens).accessToken
      const refreshToken = (response?.data as T_Tokens).refreshToken
      const decoded = jwt_decode<T_TokenData>(accessToken)

      LocalStorage.setAccessToken(accessToken)
      LocalStorage.setRefreshToken(refreshToken)

      api.dispatch(profileActions.refreshProfile(decoded))

      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(profileActions.logout())
    }
  }
  return result
}
