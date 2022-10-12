import { MenuOutlined } from '@ant-design/icons'
import { Button } from 'antd'

import * as S from './styles'

import { useActions } from 'hooks/useActions'
import { useMediaQuery } from 'hooks/useMediaQuery'
import { E_MediaQuery } from 'styles/theme'

export const Header = () => {
  const { openSidebar } = useActions()
  const isMatch = useMediaQuery(E_MediaQuery.md)

  const handleOpenSidebar = () => {
    openSidebar()
  }

  return (
    <S.HeaderWrapper>
      <S.HeaderLeftSection>
        {isMatch && <Button onClick={handleOpenSidebar} shape='circle' icon={<MenuOutlined />} />}
        <S.HeaderTitle>Page title</S.HeaderTitle>
      </S.HeaderLeftSection>

      <S.HeaderRightSection>PROFILE</S.HeaderRightSection>
    </S.HeaderWrapper>
  )
}
