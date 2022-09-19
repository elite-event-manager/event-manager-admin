import { Breadcrumb, Divider } from 'antd'
import { Link } from 'react-router-dom'

import { CreateUserForm } from 'features/UserForm'
import { t } from 'languages'
import * as C from 'styles/components'

export const CreateUser = () => {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to='/users'>{t('breadcrumbs.users')}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{t('breadcrumbs.usersNew')}</Breadcrumb.Item>
      </Breadcrumb>
      <Divider />
      <C.WrapperPage>
        <CreateUserForm />
      </C.WrapperPage>
    </div>
  )
}
