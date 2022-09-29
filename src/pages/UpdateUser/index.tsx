import { Breadcrumb, Divider } from 'antd'
import { Link } from 'react-router-dom'

import { UpdateUserForm } from 'features/UserForm'
import { t } from 'languages'
import * as C from 'styles/components'

export const UpdateUser = () => {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to='/users'>{t('breadcrumbs.users')}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{t('breadcrumbs.updateUser')}</Breadcrumb.Item>
      </Breadcrumb>
      <Divider />
      <C.WrapperPage>
        <UpdateUserForm />
      </C.WrapperPage>
    </div>
  )
}
