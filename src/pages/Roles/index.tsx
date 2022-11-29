import { Breadcrumb, Button, Divider } from 'antd'
import { useNavigate } from 'react-router-dom'

import { RolesTable } from './extensions/RolesTable'

import { t } from 'languages'
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
        <Button onClick={handleToCreateRole} type='primary'>
          Создать роль
        </Button>
        <C.Brick />
        <RolesTable />
      </C.WrapperPage>
    </div>
  )
}
