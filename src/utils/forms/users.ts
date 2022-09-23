/* eslint-disable @typescript-eslint/no-unused-vars */
import { I_User, T_UserForm, T_UserRequest } from 'models/user'

export const formToUser = (form: T_UserForm): T_UserRequest => {
  const { avatar, ...rest } = form
  const avatarPath = new URL(avatar[0].url).pathname

  return {
    ...rest,
    avatar: avatarPath,
  }
}

export const userToForm = (user: I_User): T_UserForm => {
  const { createdAt, updatedAt, id, avatar, ...rest } = user
  return {
    ...rest,
    avatar: [{ url: avatar }],
  }
}
