import { Breadcrumb, Divider } from 'antd'
import { Link } from 'react-router-dom'

import { FormCreateRole } from 'features/FormRole'
import { t } from 'languages'
import * as C from 'styles/components'

export const CreateRole = () => {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to='/roles'>{t('dashboard.header.roles')}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{t('dashboard.header.createRole')}</Breadcrumb.Item>
      </Breadcrumb>
      <Divider />
      <C.WrapperPage>
        <FormCreateRole />
      </C.WrapperPage>
    </div>
  )
}
