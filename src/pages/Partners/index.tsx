import { Breadcrumb, Divider } from 'antd'

import { t } from 'languages'
import * as C from 'styles/components'

export const Partners = () => {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>{t('dashboard.header.partners')}</Breadcrumb.Item>
      </Breadcrumb>
      <Divider />

      <C.WrapperPage>Таблица партнёров</C.WrapperPage>
    </div>
  )
}
