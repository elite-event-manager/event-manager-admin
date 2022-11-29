import { LogoutOutlined, ProfileOutlined } from '@ant-design/icons'
import { Menu } from 'antd'

import { t } from 'languages'
import { E_Routes } from 'models/routes'

export const headerTitles: Record<E_Routes, string> = {
  [E_Routes.users]: 'dashboard.header.users',
  [E_Routes.createUser]: 'dashboard.header.createUser',
  [E_Routes.updateUser]: 'dashboard.header.updateUser',
  [E_Routes.roles]: 'dashboard.header.roles',
  [E_Routes.createRole]: 'dashboard.header.createRole',
  [E_Routes.updateRole]: 'dashboard.header.updateRole',
  [E_Routes.events]: 'dashboard.header.events',
  [E_Routes.createEvent]: 'dashboard.header.creteEvent',
  [E_Routes.updateEvent]: 'dashboard.header.updateEvent',
  [E_Routes.admins]: 'dashboard.header.admins',
  [E_Routes.createAdmin]: 'dashboard.header.createAdmin',
  [E_Routes.updateAdmin]: 'dashboard.header.updateAdmin',
  [E_Routes.partners]: 'dashboard.header.partners',
  [E_Routes.references]: 'dashboard.header.references',
  [E_Routes.tickets]: 'dashboard.header.tickets',
}

interface I_ProfileMenu {
  onLogout: () => void
}

export const profileMenu = ({ onLogout }: I_ProfileMenu) => (
  <Menu
    items={[
      {
        key: '0',
        label: <span>{t('dashboard.menu.profile')}</span>,
        icon: <ProfileOutlined />,
        onClick: onLogout,
      },
      {
        key: '1',
        label: <span>{t('dashboard.menu.logout')}</span>,
        icon: <LogoutOutlined />,
        onClick: onLogout,
      },
    ]}
  />
)
