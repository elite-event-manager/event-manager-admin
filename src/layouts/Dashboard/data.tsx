import { TeamOutlined, ScheduleOutlined } from '@ant-design/icons'

import { T_MenuItem } from 'features/Sidebar/models'

export const menuItems: T_MenuItem[] = [
  {
    key: 'users',
    label: 'dashboard.sidebar.users',
    icon: <TeamOutlined />,
    to: '/users',
  },
  {
    key: 'events',
    label: 'dashboard.sidebar.events',
    icon: <ScheduleOutlined />,
    to: '/events',
  },
]
