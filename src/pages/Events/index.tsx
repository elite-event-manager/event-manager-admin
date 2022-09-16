import { Breadcrumb } from 'antd'

import { t } from 'languages'

export const Events = () => {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>{t('breadcrumbs.events')}</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  )
}
