import { ReactNode } from 'react'

import { useStoreSelector } from 'hooks/useStoreSelector'
import { E_UserRole } from 'models/shared/user'

interface I_RoleGateProps {
  children: ReactNode
  scopes: E_UserRole[]
}

export const RoleGate = ({ children, scopes = [] }: I_RoleGateProps) => {
  const userRole = useStoreSelector((state) => state.profile.role)

  if (userRole === '' || !scopes.includes(userRole)) return null

  return <>{children}</>
}
