/* eslint-disable @typescript-eslint/no-unused-vars */
import { I_User } from 'models/user'
import { T_CreateUserForm, T_UpdateUserForm } from 'models/user/forms'
import { T_CreateUserDto, T_UpdateUserDto } from 'services/users/models/dtos'

export const formCreateToUser = (form: T_CreateUserForm): T_CreateUserDto => {
  const { avatar, ...rest } = form

  return {
    ...rest,
    avatar: avatar[0].url.split('/').at(-1)!,
  }
}

export const formUpdateToUser = (form: T_UpdateUserForm): T_UpdateUserDto => {
  const { avatar, ...rest } = form

  return {
    ...rest,
    avatar: avatar[0].url.split('/').at(-1)!,
  }
}

export const userToFormUpdate = (user: I_User): T_UpdateUserForm => {
  const { createdAt, updatedAt, id, avatar, ...rest } = user

  return {
    ...rest,
    avatar: [{ url: avatar }],
  }
}
