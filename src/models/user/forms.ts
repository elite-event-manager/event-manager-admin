import { I_User } from '.'

import { T_File } from 'models/shared/upload'

export type T_UserForm = Pick<
  I_User,
  | 'phone'
  | 'status'
  | 'age'
  | 'lastName'
  | 'firstName'
  | 'middleName'
  | 'description'
  | 'job'
  | 'address'
> & {
  avatar: T_File[]
}

export type T_CreateUserForm = T_UserForm & {
  password: string
}

export type T_UpdateUserForm = T_UserForm

export type T_ChangePassword = {
  password: string
  confirm: string
}
