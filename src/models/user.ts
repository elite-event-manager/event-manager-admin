import { E_UserRole, E_UserStatus, T_UserId } from './shared/user'

export interface I_User {
  id: T_UserId
  phone: string
  firstName: string
  lastName: string
  description: string
  avatar: string
  role: E_UserRole
  status: E_UserStatus
  createdAt: Date
  updatedAt: Date
}

export type T_UserPreview = Pick<I_User, 'phone' | 'role' | 'firstName' | 'lastName'>

export type T_UserRecord = Omit<I_User, 'firstName' | 'lastName'> & {
  username: string
  key: string
}

export type T_UserForm = Pick<
  I_User,
  'firstName' | 'lastName' | 'description' | 'avatar' | 'status' | 'role'
>
