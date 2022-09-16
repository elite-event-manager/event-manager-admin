import { LogoutOutlined, TeamOutlined, ScheduleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

import { t } from 'languages'

import type { MenuProps } from 'antd'

export type MenuItem = Required<MenuProps>['items'][number]

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

export const menuItems: MenuProps['items'] = [
  getItem(<Link to='/users'>{t('dashboard.sideMenu.users')}</Link>, 'users', <TeamOutlined />),
  getItem(
    <Link to='/events'>{t('dashboard.sideMenu.events')}</Link>,
    'events',
    <ScheduleOutlined />,
  ),
  getItem(t('dashboard.sideMenu.logout'), 'logout', <LogoutOutlined />),
]
