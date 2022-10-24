import { T_File } from 'models/shared/upload'
import { E_UserStatus, T_UserId } from 'models/shared/user'

export type T_CreateUserDto = {
  phone: string
  password: string
  avatar: T_File
  firstName: string
  lastName: string
  middleName: string
  description: string
  address: string
  job: string
  age: number
  status: E_UserStatus
}

export type T_UpdateUserDto = {
  phone: string
  avatar: T_File
  firstName: string
  lastName: string
  middleName: string
  description: string
  address: string
  job: string
  age: number
  status: E_UserStatus
}

export type T_ChangePasswordDto = {
  password: string
}
