import { E_AdminRole } from 'models/shared/admin'
import { T_File } from 'models/shared/upload'

export type T_ChangePasswordDto = {
  password: string
}

export type T_CreateAdminDto = {
  phone: string
  password: string
  avatar: T_File
  firstName: string
  lastName: string
  description: string
  role: E_AdminRole
}

export type T_UpdateAdminDto = {
  phone: string
  avatar: T_File
  firstName: string
  lastName: string
  description: string
  role: E_AdminRole
}
