import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'

interface I_StyledComponentProps {
  isCollapsed: boolean
}

export const SidebarWrapper = styled(motion.div)`
  position: fixed;
  z-index: 100;

  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-width: 88px;
  max-width: 240px;
  height: 100vh;

  color: #ffffffa6;

  background-color: #1a1325;
  box-shadow: rgba(0, 0, 0, 15%) 1.95px 1.95px 2.6px;
`

export const SidebarInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
`

export const SidebarLabel = styled.div<I_StyledComponentProps>`
  position: relative;

  display: flex;
  align-items: center;

  padding: 16px 16px 0;
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

  transition: color ease 500ms, background ease 500ms;

  :hover {
    color: #fff;

    background: #24163a;
  }
`

export const SidebarList = styled.ul`
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;

  height: calc(100vh - 80px);
  padding-inline: 16px;

  ::-webkit-scrollbar {
    width: 2px;
  }

  ::-webkit-scrollbar-track {
    background-color: #1e1939;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #fff;
  }
`

export const SidebarListItem = styled.li<{ isActive: boolean }>`
  position: relative;

  width: 100%;
  min-width: 56px;
  height: 56px;
  padding: 16px;

  border-radius: 8px;

  transition: color ease 500ms, background ease 500ms;

  ${({ isActive }) =>
    isActive
      ? css`
          background: #51258f;
          color: #fff;
        `
      : css`
          :hover {
            color: #fff;

            background: #24163a;
          }
        `}
`

export const SidebarListItemIcon = styled(motion.span)`
  position: absolute;
`

export const SidebarListItemTextOverflow = styled.div`
  position: relative;

  overflow: hidden;

  height: 100%;
  margin-left: 24px;
`

export const SidebarListItemText = styled(motion.span)`
  position: absolute;
  left: -24px;

  overflow: hidden;

  width: 190px;
`
export const SidebarOverlay = styled(motion.div)`
  position: fixed;
  z-index: 90;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background-color: #00000080;
  backdrop-filter: blur(2px);
`
