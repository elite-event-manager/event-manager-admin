import { ReactNode } from 'react'

import { menuItems } from './data'
import * as S from './styles'
import { variantsLayoutContent } from './variants'

import { Header } from 'features/Header'
import { Sidebar } from 'features/Sidebar'
import { useMediaQuery } from 'hooks/useMediaQuery'
import { useStoreSelector } from 'hooks/useStoreSelector'
import { t } from 'languages'
import { E_MediaQuery } from 'styles/theme'

interface I_DashboardLayout {
  children: ReactNode
}

export const DashboardLayout = ({ children }: I_DashboardLayout) => {
  const isSidebarCollapsed = useStoreSelector((state) => state.sidebar.isCollapsed)

  const isMatch = useMediaQuery(E_MediaQuery.md)

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
