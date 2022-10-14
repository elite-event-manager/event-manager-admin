export enum E_Routes {
  users = '/users',
  createUser = '/users/create',
  updateUser = '/users/update/:userId',
  events = '/events',
  createEvent = '/events/create',
  updateEvent = '/events/update/:eventId',
}

export type T_Params = {
  userId: string
  eventId: string
}
