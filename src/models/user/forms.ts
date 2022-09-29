import { I_User } from '.'

import { T_File } from 'models/shared/upload'

export type T_UserForm = Pick<
  I_User,
  'firstName' | 'lastName' | 'phone' | 'description' | 'status' | 'role'
> & {
  avatar: T_File[]
}

export type T_CreateUserForm = T_UserForm & {
  password: string
  confirm: string
}

export type T_CreateUserRequest = Omit<T_CreateUserForm, 'avatar'> & {
  avatar: string
}

export type T_UpdateUserForm = T_UserForm

export type T_UpdateUserRequest = Omit<T_UpdateUserForm, 'avatar'> & {
  avatar: string
}

export type T_ChangePassword = {
  password: string
  confirm: string
}
