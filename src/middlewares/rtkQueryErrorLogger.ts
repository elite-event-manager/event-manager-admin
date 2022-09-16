import { isRejectedWithValue } from '@reduxjs/toolkit'
import { notification } from 'antd'

import type { Middleware } from '@reduxjs/toolkit'

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.log(action)
    const errorMessage = action.payload.data?.message || action.payload.data?.message.text
    // console.log(`[rtkQueryErrorLogger] Ошибка: ${JSON.stringify(action)}`)
    if (action.payload.data?.message.text && action.payload.data?.message.isNotifying) {
      notification.error({ message: errorMessage })
    } else if (action.payload.data?.message) {
      notification.error({ message: errorMessage })
    }
  }

  return next(action)
}
