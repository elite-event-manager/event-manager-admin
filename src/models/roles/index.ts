import { E_RolePermission } from 'models/shared/role'

export interface I_AdminRole {
  adminId: number
  roleId: number
  assignedAt: string
  role: I_Role
}

export interface I_Role {
  id: number
  tag: string
  name: string
  description: string
  permissions: E_RolePermission[]
}

export type T_RoleRecord = I_Role & {
  key: string
}
