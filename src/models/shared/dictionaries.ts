import { E_AdminRole } from './admin'
import { E_UserStatus } from './user'

export type T_DictionaryUserRole = {
  id: E_AdminRole
  name: string
}

export type T_DictionaryUserStatus = {
  id: E_UserStatus
  name: string
}
