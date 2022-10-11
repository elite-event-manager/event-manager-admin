import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Modal, Layout, Menu } from 'antd'
import { ReactNode, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { menuItems } from './data'
import * as S from './styles'

import { Sidebar } from 'features/Sidebar'
import { useStoreDispatch } from 'hooks/useStoreDispatch'
import { useStoreSelector } from 'hooks/useStoreSelector'
import { t } from 'languages'
import { logout } from 'store/profile'

interface I_DashboardLayout {
  children: ReactNode
}

export const DashboardLayout = ({ children }: I_DashboardLayout) => {
  const dispatch = useStoreDispatch()
  const profile = useStoreSelector((state) => state.profile)
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

  const handleMenuItem = (key: string) => {
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
      <Sidebar profile={profile} items={menuItems} />
      <Layout>
        <S.ContentLayout>{children}</S.ContentLayout>
        <S.FooterLayout>
          {t('app.copyright')} — {t('app.title')} <b>{APP_VERSION}</b>
        </S.FooterLayout>
      </Layout>
    </S.MainLayout>
  )
}
