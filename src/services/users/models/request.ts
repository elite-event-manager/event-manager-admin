import { T_UserId } from 'models/shared/user'

export interface I_ChangePasswordRequest {
  userId: T_UserId
  password: string
}
