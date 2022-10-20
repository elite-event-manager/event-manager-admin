import { T_File } from '../shared/upload'
import { E_UserStatus, T_UserId } from '../shared/user'

export interface I_User {
  id: T_UserId
  phone: string
  firstName: string
  lastName: string
  description: string
  password: string
  avatar: T_File
  status: E_UserStatus
  createdAt: Date
  updatedAt: Date
}

export type T_UserRecord = Omit<I_User, 'firstName' | 'lastName'> & {
  username: string
  key: string
}
