import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import { ReactNode } from 'react'

import { menuItems } from './data'
import * as S from './styles'
import { variantsLayoutContent } from './variants'

import { Header } from 'features/Header'
import { Sidebar } from 'features/Sidebar'
import { useActions } from 'hooks/useActions'
import { useMediaQuery } from 'hooks/useMediaQuery'
import { useStoreSelector } from 'hooks/useStoreSelector'
import { t } from 'languages'
import { E_MediaQuery } from 'styles/theme'

interface I_DashboardLayout {
  children: ReactNode
}

export const DashboardLayout = ({ children }: I_DashboardLayout) => {
  const isSidebarCollapsed = useStoreSelector((state) => state.sidebar.isCollapsed)
  const { logout } = useActions()

  const isMatch = useMediaQuery(E_MediaQuery.md)

  const handleLogout = () => {
    Modal.confirm({
      title: t('modal.confirm.logout.title'),
      icon: <ExclamationCircleOutlined />,
      content: t('modal.confirm.logout.content'),
      okText: t('modal.confirm.logout.ok'),
      cancelText: t('modal.confirm.logout.cancel'),
      maskClosable: true,
      onOk: () => {
        logout()
      },
    })
  }

  return (
    <S.Layout>
      <Sidebar items={menuItems} selectedItem={location.pathname.split('/')[1]} />
      <S.LayoutWrapper
        initial={false}
        animate={isMatch ? 'mobile' : isSidebarCollapsed ? 'collapsed' : 'opened'}
        variants={variantsLayoutContent}
      >
        <Header />
        <S.LayoutContent>{children}</S.LayoutContent>
        <S.LayoutFooter>
          {t('app.copyright')} — {t('app.title')} <b>{APP_VERSION}</b>
        </S.LayoutFooter>
      </S.LayoutWrapper>
    </S.Layout>
  )
}
