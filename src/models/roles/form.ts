import { I_Role } from '.'

export type T_RoleForm = Pick<I_Role, 'tag' | 'name' | 'description' | 'permissions'>

export type T_CreateRoleForm = T_RoleForm

export type T_UpdateRoleForm = T_RoleForm
