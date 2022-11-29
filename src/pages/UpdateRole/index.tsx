import { Breadcrumb, Divider } from 'antd'
import { Link } from 'react-router-dom'

import { FormUpdateRole } from 'features/FormRole'
import { t } from 'languages'
import * as C from 'styles/components'

export const UpdateRole = () => {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to='/roles'>{t('dashboard.header.roles')}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{t('dashboard.header.updateRole')}</Breadcrumb.Item>
      </Breadcrumb>
      <Divider />
      <C.WrapperPage>
        <FormUpdateRole />
      </C.WrapperPage>
    </div>
  )
}
