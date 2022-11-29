export type T_ChangePasswordDto = {
  password: string
}

export type T_ChangeRolesDto = {
  rolesIds: number[]
}

export type T_CreateAdminDto = {
  email: string
  password: string
  avatar: string
  firstName: string
  lastName: string
  description: string
}

export type T_UpdateAdminDto = {
  email: string
  avatar: string
  firstName: string
  lastName: string
  description: string
}
