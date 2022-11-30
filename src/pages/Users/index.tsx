import { Breadcrumb, Button, Divider } from 'antd'
import { useNavigate } from 'react-router-dom'

import { UsersTable } from './extensions/UsersTable'

import * as G from 'guards'
import { t } from 'languages'
import { E_RolePermission } from 'models/shared/role'
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
        <G.RolesGuard scope={[E_RolePermission['users.create']]}>
          <Button onClick={handleToCreateUser} type='primary'>
            {t('usersPage.actions.create')}
          </Button>
          <C.Brick />
        </G.RolesGuard>
        <UsersTable />
      </C.WrapperPage>
    </div>
  )
}
