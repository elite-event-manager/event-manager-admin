import { Navigate, Route, Routes } from 'react-router-dom'

import { ProtectedRoute } from './ProtectedRoute'

import useScrollToTop from 'hooks/useScrollToTop'
import { E_Routes } from 'models/routes'
import * as Pages from 'pages'

export const AppRoutes = () => {
  useScrollToTop()
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path={E_Routes.users} element={<Pages.Users />} />
        <Route path={E_Routes.createUser} element={<Pages.CreateUser />} />
        <Route path={E_Routes.updateUser} element={<Pages.UpdateUser />} />
        <Route path={E_Routes.admins} element={<Pages.Admins />} />
        <Route path={E_Routes.roles} element={<Pages.Roles />} />
        <Route path={E_Routes.createRole} element={<Pages.CreateRole />} />
        <Route path={E_Routes.updateRole} element={<Pages.UpdateRole />} />
        <Route path={E_Routes.createAdmin} element={<Pages.CreateAdmin />} />
        <Route path={E_Routes.updateAdmin} element={<Pages.UpdateAdmin />} />
        <Route path={E_Routes.events} element={<Pages.Events />} />
        <Route path={E_Routes.createEvent} element={<Pages.CreateEvent />} />
        <Route path={E_Routes.updateEvent} element={<Pages.UpdateEvent />} />
        <Route path={E_Routes.tickets} element={<Pages.Tickets />} />
        <Route path={E_Routes.references} element={<Pages.References />} />
        <Route path={E_Routes.partners} element={<Pages.Partners />} />
      </Route>
      <Route path='*' element={<Navigate to={E_Routes.users} />} />
    </Routes>
  )
}
