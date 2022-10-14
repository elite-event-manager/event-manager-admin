import { Breadcrumb, Button, Divider } from 'antd'
import { useNavigate } from 'react-router-dom'

import { UsersTable } from './extensions/UsersTable'

import { RoleGate } from 'gates/Role'
import { t } from 'languages'
import { E_UserRole } from 'models/shared/user'
import * as C from 'styles/components'

export const Users = () => {
  const navigate = useNavigate()

  const handleToCreateUser = () => {
    navigate('/users/create')
  }

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>{t('dashboard.header.users')}</Breadcrumb.Item>
      </Breadcrumb>
      <Divider />
      <C.WrapperPage>
        <RoleGate scopes={[E_UserRole.superAdmin, E_UserRole.admin]}>
          <Button onClick={handleToCreateUser} type='primary'>
            Создать пользователя
          </Button>
        </RoleGate>
        <C.Brick />
        <UsersTable />
      </C.WrapperPage>
    </div>
  )
}
