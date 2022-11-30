import { Breadcrumb, Button, Divider } from 'antd'
import { useNavigate } from 'react-router-dom'

import { RolesTable } from './extensions/RolesTable'

import * as G from 'guards'
import { t } from 'languages'
import { E_RolePermission } from 'models/shared/role'
import * as C from 'styles/components'

export const Roles = () => {
  const navigate = useNavigate()

  const handleToCreateRole = () => {
    navigate('/roles/create')
  }

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>{t('dashboard.header.roles')}</Breadcrumb.Item>
      </Breadcrumb>
      <Divider />

      <C.WrapperPage>
        <G.RolesGuard scope={[E_RolePermission['admins.create']]}>
          <Button onClick={handleToCreateRole} type='primary'>
            {t('rolesPage.actions.create')}
          </Button>
          <C.Brick />
        </G.RolesGuard>

        <RolesTable />
      </C.WrapperPage>
    </div>
  )
}
