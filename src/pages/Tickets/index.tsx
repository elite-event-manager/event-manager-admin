import { Breadcrumb, Button, Divider } from 'antd'

import { t } from 'languages'
import * as C from 'styles/components'

export const Tickets = () => {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>{t('dashboard.header.tickets')}</Breadcrumb.Item>
      </Breadcrumb>
      <Divider />

      <C.WrapperPage>Таблица запросов</C.WrapperPage>
    </div>
  )
}
