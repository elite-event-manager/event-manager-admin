import { T_AdminPreview } from 'models/admins'
import { I_Response } from 'models/shared/response'

export type T_AuthResponse = I_Response<{
  accessToken?: string
  refreshToken?: string
  admin: T_AdminPreview
}>
