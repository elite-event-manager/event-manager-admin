import { LeftOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

import { T_MenuItem } from './models'
import * as S from './styles'
import {
  variantsCollapse,
  variantsTitle,
  variantsSidebarWrapper,
  variantsListItemIcon,
  variantsListItemText,
} from './variants'

import { useActions } from 'hooks/useActions'
import { useMediaQuery } from 'hooks/useMediaQuery'
import { useStoreSelector } from 'hooks/useStoreSelector'
import { t } from 'languages'
import { E_MediaQuery } from 'styles/theme'

interface I_SidebarProps {
  items: T_MenuItem[]
  selectedItem: string
}

export const Sidebar = ({ items, selectedItem }: I_SidebarProps) => {
  const { isOpen, isCollapsed } = useStoreSelector((state) => state.sidebar)
  const isMobile = useMediaQuery(E_MediaQuery.md)
  const { closeSidebar, toggleSidebarCollapse } = useActions()

  const handleClose = () => {
    closeSidebar()
  }

  const handleToggleCollapse = () => {
    toggleSidebarCollapse()
  }

  return (
    <AnimatePresence>
      {(!isMobile || isOpen) && (
        <>
          <S.SidebarWrapper
            initial={{ x: isCollapsed ? -90 : -250 }}
            animate={isCollapsed ? 'collapsed' : 'opened'}
            exit={{ x: isCollapsed ? -90 : -250 }}
            variants={variantsSidebarWrapper}
          >
            <S.SidebarInner>
              <S.SidebarLabel isCollapsed={isCollapsed}>
                <S.SidebarTitle
                  initial={false}
                  animate={isCollapsed ? 'collapsed' : 'opened'}
                  variants={variantsTitle}
                >
                  {t('dashboard.sideMenu.title')}
                </S.SidebarTitle>
                <S.SidebarCollapse
                  animate={isCollapsed ? 'collapsed' : 'opened'}
                  variants={variantsCollapse}
                  onClick={handleToggleCollapse}
                >
                  <LeftOutlined />
                </S.SidebarCollapse>
              </S.SidebarLabel>
              <S.SidebarList>
                {items.map((item) => (
                  <Link key={item.key} to={item.to}>
                    <Tooltip placement='right' title={isCollapsed && t(item.label)}>
                      <S.SidebarListItem isActive={item.key === selectedItem}>
                        <S.SidebarListItemIcon
                          animate={isCollapsed ? 'collapsed' : 'opened'}
                          variants={variantsListItemIcon}
                        >
                          {item.icon}
                        </S.SidebarListItemIcon>
                        <S.SidebarListItemTextOverflow>
                          <S.SidebarListItemText
                            animate={isCollapsed ? 'collapsed' : 'opened'}
                            variants={variantsListItemText}
                          >
                            {t(item.label)}
                          </S.SidebarListItemText>
                        </S.SidebarListItemTextOverflow>
                      </S.SidebarListItem>
                    </Tooltip>
                  </Link>
                ))}
              </S.SidebarList>
            </S.SidebarInner>
          </S.SidebarWrapper>
          {isMobile && (
            <S.SidebarOverlay
              onClick={handleClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </>
      )}
    </AnimatePresence>
  )
}
