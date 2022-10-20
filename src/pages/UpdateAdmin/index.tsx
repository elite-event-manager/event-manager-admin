import { Breadcrumb, Divider } from 'antd'

import { t } from 'languages'
import * as C from 'styles/components'

export const UpdateAdmin = () => {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>{t('dashboard.header.updateAdmin')}</Breadcrumb.Item>
      </Breadcrumb>
      <Divider />

      <C.WrapperPage>Форма изменения админа</C.WrapperPage>
    </div>
  )
}
