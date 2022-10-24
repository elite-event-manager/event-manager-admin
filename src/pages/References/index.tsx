import { Breadcrumb, Button, Divider } from 'antd'

import { t } from 'languages'
import * as C from 'styles/components'

export const References = () => {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>{t('dashboard.header.references')}</Breadcrumb.Item>
      </Breadcrumb>
      <Divider />

      <C.WrapperPage>Таблица справок</C.WrapperPage>
    </div>
  )
}
