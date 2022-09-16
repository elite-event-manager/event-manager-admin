import { Breadcrumb, Divider } from 'antd'
import { Link } from 'react-router-dom'

import { t } from 'languages'
import * as C from 'styles/components'

export const UsersNew = () => {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to='/users'>{t('breadcrumbs.users')}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{t('breadcrumbs.usersNew')}</Breadcrumb.Item>
      </Breadcrumb>
      <Divider />
      <C.Brick />
    </div>
  )
}
