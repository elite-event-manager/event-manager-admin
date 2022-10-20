import { Breadcrumb, Divider } from 'antd'

import { t } from 'languages'
import * as C from 'styles/components'

export const UpdateEvent = () => {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>{t('dashboard.header.updateEvent')}</Breadcrumb.Item>
      </Breadcrumb>
      <Divider />

      <C.WrapperPage>Форма изменения мероприятия</C.WrapperPage>
    </div>
  )
}
