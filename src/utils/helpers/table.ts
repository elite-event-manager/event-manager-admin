import { I_User, T_UserRecord } from 'models/user'

export const formatToDataSource = <T extends { id: number }>(data: T[]) =>
  data.map((item) => ({ ...item, key: String(item.id) }))

export const formatUserToDataSource = (data: I_User[]): T_UserRecord[] => {
  return data.map((item) => {
    const { firstName, lastName, ...rest } = item
    return { ...rest, username: `${lastName} ${firstName}`, key: String(item.id) }
  })
}
