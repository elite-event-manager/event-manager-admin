import {
  TeamOutlined,
  ScheduleOutlined,
  SnippetsOutlined,
  CommentOutlined,
  DeploymentUnitOutlined,
} from '@ant-design/icons'

import { T_MenuItem } from 'features/Sidebar/models'

export const menuItems: T_MenuItem[] = [
  {
    key: 'users',
    label: 'dashboard.sidebar.users',
    icon: <TeamOutlined />,
    to: '/users',
  },
  {
    key: 'request',
    label: 'dashboard.sidebar.request',
    icon: <CommentOutlined />,
    to: '/request',
  },
  {
    key: 'events',
    label: 'dashboard.sidebar.events',
    icon: <ScheduleOutlined />,
    to: '/events',
  },
  {
    key: 'references',
    label: 'dashboard.sidebar.references',
    icon: <SnippetsOutlined />,
    to: '/references',
  },
  {
    key: 'partners',
    label: 'dashboard.sidebar.partners',
    icon: <DeploymentUnitOutlined />,
    to: '/partners',
  },
]
