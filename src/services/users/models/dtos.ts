import { E_UserStatus } from 'models/shared/user'

export type T_CreateUserDto = {
  phone: string
  avatar: string
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
  avatar: string
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
