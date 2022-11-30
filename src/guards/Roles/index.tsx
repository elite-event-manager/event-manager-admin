import { ReactNode } from 'react'

import { useStoreSelector } from 'hooks/useStoreSelector'
import { E_RolePermission } from 'models/shared/role'

interface I_RolesGuardProps {
  children: ReactNode
  scope?: E_RolePermission[]
}

export const RolesGuard = ({ children, scope }: I_RolesGuardProps) => {
  const profilePermissions = useStoreSelector((store) => store.profile.roles)

  if (!scope) return <>{children}</>

  const isAccessible = profilePermissions.reduce((previousValue, currentValue) => {
    if (!previousValue) {
      previousValue = currentValue.role.permissions.some((permission) => scope.includes(permission))
    }
    return previousValue
  }, false)

  if (!isAccessible) return null

  return <>{children}</>
}
