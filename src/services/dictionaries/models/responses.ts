import { T_DictionaryAdminRole, T_DictionaryUserStatus } from 'models/shared/dictionaries'
import { I_Response } from 'models/shared/response'

export type I_DictionaryUserRolesResponse = I_Response<T_DictionaryAdminRole[]>

export type I_DictionaryUserStatusesResponse = I_Response<T_DictionaryUserStatus[]>
