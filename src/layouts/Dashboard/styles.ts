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

  margin-left: 240px;

  background: #f0f2f5;
`

export const LayoutContent = styled.div`
  height: 200vh;
  margin: 16px;
`
export const LayoutFooter = styled.div`
  text-align: center;
`
