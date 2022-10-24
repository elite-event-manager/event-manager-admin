import { I_Admin } from '.'

import { T_File } from 'models/shared/upload'

export type T_AdminForm = Pick<
  I_Admin,
  'phone' | 'role' | 'lastName' | 'firstName' | 'description'
> & {
  avatar: T_File[]
}

export type T_CreateAdminForm = T_AdminForm & {
  password: string
}

export type T_UpdateAdminForm = T_AdminForm

export type T_ChangePassword = {
  password: string
  confirm: string
}
