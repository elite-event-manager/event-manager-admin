import { T_AdminId } from '../shared/admin'

import { I_AdminRole } from 'models/roles'

export interface I_Admin {
  id: T_AdminId
  email: string
  firstName: string
  lastName: string
  description: string
  avatar: string
  roles: I_AdminRole[]
  createdAt: Date
  updatedAt: Date
}

export type T_AdminPreview = Pick<I_Admin, 'email' | 'roles' | 'firstName' | 'lastName' | 'avatar'>

export type T_AdminRecord = Omit<I_Admin, 'firstName' | 'lastName'> & {
  username: string
  key: string
}
