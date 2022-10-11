import { LeftOutlined, LogoutOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { T_MenuItem } from './models'
import * as S from './styles'
import {
  variantsCollapse,
  variantsTitle,
  variantsSidebarWrapper,
  variantsListItemIcon,
  variantsListItemText,
  variantsProfileInfo,
  variantsProfileLogout,
} from './variants'

import { t } from 'languages'
import { I_Profile } from 'store/profile'

interface I_SidebarProps {
  items: T_MenuItem[]
  profile: I_Profile
}

export const Sidebar = ({ items, profile }: I_SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev)
  }

  return (
    <S.SidebarWrapper
      animate={isCollapsed ? 'collapsed' : 'opened'}
      variants={variantsSidebarWrapper}
    >
      <S.SidebarInner>
        <S.SidebarLabel isCollapsed={isCollapsed}>
          <S.SidebarTitle animate={isCollapsed ? 'collapsed' : 'opened'} variants={variantsTitle}>
            Event Manager
          </S.SidebarTitle>
          <S.SidebarCollapse
            animate={isCollapsed ? 'collapsed' : 'opened'}
            variants={variantsCollapse}
            onClick={toggleCollapse}
          >
            <LeftOutlined />
          </S.SidebarCollapse>
        </S.SidebarLabel>
        <S.SidebarList>
          {items.map((item) => (
            <Link key={item.key} to={item.to}>
              <Tooltip placement='right' title={t(item.label)}>
                <S.SidebarListItem>
                  <S.SidebarListItemIcon
                    animate={isCollapsed ? 'collapsed' : 'opened'}
                    variants={variantsListItemIcon}
                  >
                    {item.icon}
                  </S.SidebarListItemIcon>
                  <AnimatePresence>
                    <S.SidebarListItemText
                      animate={isCollapsed ? 'collapsed' : 'opened'}
                      variants={variantsListItemText}
                    >
                      {t(item.label)}
                    </S.SidebarListItemText>
                  </AnimatePresence>
                </S.SidebarListItem>
              </Tooltip>
            </Link>
          ))}
        </S.SidebarList>
      </S.SidebarInner>
      <S.SidebarProfile>
        <S.SidebarProfileInfo
          animate={isCollapsed ? 'collapsed' : 'opened'}
          variants={variantsProfileInfo}
        >
          <S.SidebarProfileAvatar src={profile.avatar.url} />
          <S.SidebarProfileLabel>
            <span>
              {profile.lastName} {profile.firstName}
            </span>
            <br />
            <span>{profile.role}</span>
          </S.SidebarProfileLabel>
        </S.SidebarProfileInfo>
        <S.SidebarProfileLogout
          animate={isCollapsed ? 'collapsed' : 'opened'}
          variants={variantsProfileLogout}
        >
          <LogoutOutlined />
        </S.SidebarProfileLogout>
      </S.SidebarProfile>
    </S.SidebarWrapper>
  )
}
