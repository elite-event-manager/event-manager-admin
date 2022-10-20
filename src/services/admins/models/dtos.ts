import { T_AdminId } from 'models/shared/admin'

export interface T_ChangePasswordDto {
  adminId: T_AdminId
  password: string
}
