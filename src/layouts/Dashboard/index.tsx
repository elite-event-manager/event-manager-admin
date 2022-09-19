import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Modal, Layout, Menu } from 'antd'
import { ReactNode, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { menuItems } from './data'
import * as S from './styles'

import { useStoreDispatch } from 'hooks/useStoreDispatch'
import { t } from 'languages'
import { logout } from 'store/profile'

import type { MenuInfo } from 'rc-menu/lib/interface'

interface I_DashboardLayout {
  children: ReactNode
}

export const DashboardLayout = ({ children }: I_DashboardLayout) => {
  const dispatch = useStoreDispatch()
  const location = useLocation()

  const [isCollapsed, setCollapsed] = useState(false)

  const handleLogout = () => {
    Modal.confirm({
      title: t('modal.confirm.logout.title'),
      icon: <ExclamationCircleOutlined />,
      content: t('modal.confirm.logout.content'),
      okText: t('modal.confirm.logout.ok'),
      cancelText: t('modal.confirm.logout.cancel'),
      maskClosable: true,
      onOk: () => {
        dispatch(logout())
      },
    })
  }

  const handleMenuItem = ({ key }: MenuInfo) => {
    switch (key) {
      case 'logout':
        handleLogout()
    }
  }

  const handleCollapse = () => {
    setCollapsed((prev) => !prev)
  }

  return (
    <S.MainLayout>
      <Layout.Sider collapsible collapsed={isCollapsed} onCollapse={handleCollapse}>
        <Menu
          items={menuItems}
          onClick={handleMenuItem}
          theme='dark'
          defaultSelectedKeys={[location.pathname.split('/')[1]]}
          selectedKeys={[location.pathname.split('/')[1]]}
          mode='inline'
        />
      </Layout.Sider>
      <Layout>
        <S.ContentLayout>{children}</S.ContentLayout>
        <S.FooterLayout>
          {t('app.copyright')} — {t('app.title')} <b>{APP_VERSION}</b>
        </S.FooterLayout>
      </Layout>
    </S.MainLayout>
  )
}
