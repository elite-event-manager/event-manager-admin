import { motion } from 'framer-motion'
import styled from 'styled-components'

interface I_StyledComponentProps {
  isCollapsed: boolean
}

export const SidebarWrapper = styled(motion.div)`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-width: 88px;
  max-width: 240px;

  color: #ffffffa6;

  background-color: #1a1325;
`

export const SidebarInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;

  padding: 16px;
`

export const SidebarLabel = styled.div<I_StyledComponentProps>`
  position: relative;

  display: flex;
  align-items: center;
`

export const SidebarTitle = styled(motion.span)`
  position: absolute;

  width: 156px;

  font-size: 18px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
`

export const SidebarCollapse = styled(motion.span)`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 56px;
  height: 56px;

  border-radius: 8px;

  transition: color, background ease 500ms;

  :hover {
    color: #fff;

    background: #24163a;
  }
`

export const SidebarList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const SidebarListItem = styled.li`
  position: relative;

  width: 100%;
  height: 56px;
  padding: 16px;

  border-radius: 8px;

  transition-timing-function: ease;
  transition-duration: 500ms;
  transition-property: color background;

  :hover {
    color: #fff;

    background: #24163a;
  }
`

export const SidebarListItemIcon = styled(motion.span)`
  position: absolute;
`

export const SidebarListItemText = styled(motion.span)`
  position: absolute;

  overflow: hidden;

  width: 190px;
  height: 100%;
`

export const SidebarProfile = styled.div`
  position: relative;

  overflow: hidden;
  display: flex;
  align-items: center;

  height: 68px;
  padding: 16px;

  background: #24163a;
`

export const SidebarProfileInfo = styled(motion.div)`
  position: absolute;

  display: flex;
  gap: 8px;

  width: 160px;
`

export const SidebarProfileAvatar = styled.img`
  width: 50px;
  height: 50px;

  object-fit: cover;
  border-radius: 50%;
`

export const SidebarProfileLabel = styled.div``
export const SidebarProfileLogout = styled(motion.div)`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 48px;
  height: 48px;

  border-radius: 8px;

  transition: color, background ease 500ms;

  :hover {
    color: #fff;

    background: #391085;
  }
`
