/* eslint-disable @typescript-eslint/no-unused-vars */
import { I_Admin } from 'models/admins'
import { T_UpdateAdminForm, T_CreateAdminForm } from 'models/admins/forms'
import { T_CreateAdminDto, T_UpdateAdminDto } from 'services/admins/models/dtos'

export const formCreateToAdmin = (form: T_CreateAdminForm): T_CreateAdminDto => {
  const { avatar, confirm, ...rest } = form
  console.log('avatar', avatar)
  return {
    ...rest,
    avatar: avatar[0].url.split('/').at(-1)!,
  }
}

export const formUpdateToAdmin = (form: T_UpdateAdminForm): T_UpdateAdminDto => {
  const { avatar, ...rest } = form

  return {
    ...rest,
    avatar: avatar[0].url.split('/').at(-1)!,
  }
}

export const adminToFormUpdate = (user: I_Admin): T_UpdateAdminForm => {
  const { createdAt, updatedAt, id, avatar, ...rest } = user

  return {
    ...rest,
    avatar: [{ url: avatar }],
  }
}
