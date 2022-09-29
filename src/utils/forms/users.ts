/* eslint-disable @typescript-eslint/no-unused-vars */
import { I_User } from 'models/user'

export const formToUser = (form: any): any => {
  const { avatar, ...rest } = form

  return {
    ...rest,
    avatar: avatar[0],
  }
}

export const userToForm = (user: I_User): any => {
  const { createdAt, updatedAt, id, avatar, ...rest } = user

  return {
    ...rest,
    avatar: [avatar],
  }
}
