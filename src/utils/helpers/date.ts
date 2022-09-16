import { RangePickerProps } from 'antd/lib/date-picker'
import moment, { Moment } from 'moment'

export enum E_FormatDate {
  default = 'DD.MM.YYYY',
  shortYear = 'DD.MM.YY',
  extend = 'DD.MM.YYYY, hh:mm',
}

// Отключение дней: сегодня и прошлого
export const disabledDateBeforeTodayAndToday: RangePickerProps['disabledDate'] = (
  current: Moment,
) => {
  return current && current < moment().endOf('day')
}

// Форматирование даты
export const formatDate = (date: string, format: E_FormatDate = E_FormatDate.default) => {
  if (date === null) return '-'
  return date.startsWith('0001-01-01') ? '-' : moment(date).format(format)
}
