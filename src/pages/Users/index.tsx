import { Breadcrumb, Button, Divider } from 'antd'
import { useNavigate } from 'react-router-dom'

import { UsersTable } from './extensions/UsersTable'

import { t } from 'languages'
import * as C from 'styles/components'

export const Users = () => {
  const navigate = useNavigate()

  const handleToCreateUser = () => {
    navigate('/users/create')
  }

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>{t('breadcrumbs.users')}</Breadcrumb.Item>
      </Breadcrumb>
      <Divider />
      <C.WrapperPage>
        <Button onClick={handleToCreateUser} type='primary'>
          Создать пользователя
        </Button>
        <C.Brick />
        <UsersTable />
      </C.WrapperPage>
    </div>
  )
}
