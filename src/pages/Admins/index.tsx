import { Breadcrumb, Button, Divider } from 'antd'
import { useNavigate } from 'react-router-dom'

import { AdminsTable } from './extensions/AdminsTable'

import * as G from 'guards'
import { t } from 'languages'
import { E_RolePermission } from 'models/shared/role'
import * as C from 'styles/components'

export const Admins = () => {
  const navigate = useNavigate()

  const handleToCreateAdmin = () => {
    navigate('/admins/create')
  }
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>{t('dashboard.header.admins')}</Breadcrumb.Item>
      </Breadcrumb>
      <Divider />

      <C.WrapperPage>
        <G.RolesGuard scope={[E_RolePermission['admins.create']]}>
          <Button onClick={handleToCreateAdmin} type='primary'>
            {t('adminsPage.actions.create')}
          </Button>
          <C.Brick />
        </G.RolesGuard>
        <AdminsTable />
      </C.WrapperPage>
    </div>
  )
}
