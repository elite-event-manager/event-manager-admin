import {
  TeamOutlined,
  ScheduleOutlined,
  SnippetsOutlined,
  CommentOutlined,
  DeploymentUnitOutlined,
  LockOutlined,
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
    key: 'admins',
    label: 'dashboard.sidebar.admins',
    icon: <LockOutlined />,
    to: '/admins',
  },
  {
    key: 'tickets',
    label: 'dashboard.sidebar.tickets',
    icon: <CommentOutlined />,
    to: '/tickets',
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
