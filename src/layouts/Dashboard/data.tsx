import { TeamOutlined, ScheduleOutlined } from '@ant-design/icons'

import { T_MenuItem } from 'features/Sidebar/models'

export const menuItems: T_MenuItem[] = [
  {
    key: 'users',
    label: 'dashboard.sideMenu.users',
    icon: <TeamOutlined />,
    to: '/users',
  },
  {
    key: 'events',
    label: 'dashboard.sideMenu.events',
    icon: <ScheduleOutlined />,
    to: '/events',
  },
]
