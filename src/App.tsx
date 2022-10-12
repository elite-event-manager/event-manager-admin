import { useEffect } from 'react'

import { useActions } from 'hooks/useActions'
import { AppRoutes } from 'routes'
import { authAPI } from 'services/auth'

export const App = () => {
  const { signIn } = useActions()
  const { isSuccess, data, isFetching } = authAPI.useCheckQuery()

  // Успешная аутентификация
  useEffect(() => {
    if (data && isSuccess) {
      signIn(data)
    }
  }, [data, isSuccess, signIn])

  if (isFetching) return null
  return <AppRoutes />
}
