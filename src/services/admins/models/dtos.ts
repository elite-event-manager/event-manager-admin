import { T_AdminId } from 'models/shared/admin'

export type T_ChangePasswordDto = {
  adminId: T_AdminId
  password: string
}
