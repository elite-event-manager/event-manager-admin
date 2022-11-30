import {
  TeamOutlined,
  ScheduleOutlined,
  SnippetsOutlined,
  CommentOutlined,
  DeploymentUnitOutlined,
  LockOutlined,
  SlidersOutlined,
} from '@ant-design/icons'

import { T_MenuItem } from 'features/Sidebar/models'
import { E_RolePermission } from 'models/shared/role'

export const menuItems: T_MenuItem[] = [
  {
    key: 'users',
    label: 'dashboard.sidebar.users',
    icon: <TeamOutlined />,
    to: '/users',
    scope: [E_RolePermission['users.view']],
  },
  {
    key: 'admins',
    label: 'dashboard.sidebar.admins',
    icon: <LockOutlined />,
    to: '/admins',
    scope: [E_RolePermission['admins.view']],
  },
  {
    key: 'roles',
    label: 'dashboard.sidebar.roles',
    icon: <SlidersOutlined />,
    to: '/roles',
    scope: [E_RolePermission['roles.view']],
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
