import { I_Role } from 'models/roles'
import { I_Response } from 'models/shared/response'

export type T_CreateRoleResponse = I_Response<I_Role>

export type T_GetRolesResponse = I_Response<I_Role[]>

export type T_GetRoleResponse = I_Response<I_Role>

export type T_UpdateRoleResponse = I_Response<I_Role>
