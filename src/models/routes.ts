export enum E_Routes {
  users = '/users',
  createUser = '/users/create',
  updateUser = '/users/update/:userId',
  admins = '/admins',
  createAdmin = '/admins/create',
  updateAdmin = '/admins/update/:adminId',
  roles = '/roles',
  events = '/events',
  createEvent = '/events/create',
  updateEvent = '/events/update/:eventId',
  tickets = '/tickets',
  references = '/references',
  partners = '/partners',
}

export type T_Params = {
  userId: string
  adminId: string
  eventId: string
}
