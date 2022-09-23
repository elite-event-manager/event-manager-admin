import { Layout } from 'antd'
import styled from 'styled-components'

export const MainLayout = styled.div`
  display: flex;
  flex-direction: 'row';

  min-height: 100vh;
`

export const ContentLayout = styled(Layout.Content)`
  margin: 16px;
`
export const FooterLayout = styled(Layout.Footer)`
  text-align: center;
`
