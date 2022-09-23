import { T_ServerMessage } from 'models/shared/app'
import { T_UserPreview } from 'models/user'

export type I_AuthResponse = {
  data?: {
    accessToken?: string
    refreshToken?: string
    user: T_UserPreview
  }
  message?: T_ServerMessage
}
