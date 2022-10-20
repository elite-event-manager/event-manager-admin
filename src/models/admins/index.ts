import { E_AdminRole, T_AdminId } from '../shared/admin'
import { T_File } from '../shared/upload'

export interface I_Admin {
  id: T_AdminId
  phone: string
  firstName: string
  lastName: string
  description: string
  password: string
  avatar: T_File
  role: E_AdminRole
  createdAt: Date
  updatedAt: Date
}

export type T_UserPreview = Pick<I_Admin, 'phone' | 'role' | 'firstName' | 'lastName' | 'avatar'>

export type T_AdminRecord = Omit<I_Admin, 'firstName' | 'lastName'> & {
  username: string
  key: string
}
