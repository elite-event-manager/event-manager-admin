import { T_DictionaryUserRole } from 'models/shared/dictionaries'

export const getRoleName = (roles: T_DictionaryUserRole[], roleId: string) =>
  roles.filter((role) => role.id === roleId)[0].name
