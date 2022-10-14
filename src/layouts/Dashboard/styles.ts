import { motion } from 'framer-motion'
import styled from 'styled-components'

export const Layout = styled.div`
  display: flex;
  flex-direction: 'row';

  min-height: 100vh;
`

export const LayoutWrapper = styled(motion.div)`
  display: flex;
  flex: auto;
  flex-direction: column;

  width: 100%;
  height: 100vh;

  background: #f0f2f5;
`

export const LayoutContainer = styled.div`
  overflow: auto;

  padding: 16px;
`

export const LayoutContent = styled.div`
  height: 200vh;
`
export const LayoutFooter = styled.div`
  text-align: center;
`
