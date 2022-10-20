import { Breadcrumb, Divider } from 'antd'

import { t } from 'languages'
import * as C from 'styles/components'

export const CreateAdmin = () => {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>{t('dashboard.header.createAdmin')}</Breadcrumb.Item>
      </Breadcrumb>
      <Divider />

      <C.WrapperPage>Форма создания админа</C.WrapperPage>
    </div>
  )
}
