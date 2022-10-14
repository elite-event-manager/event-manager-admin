import { MenuOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, Dropdown, Modal } from 'antd'

import { headerTitles, profileMenu } from './data'
import * as S from './styles'

import { useActions } from 'hooks/useActions'
import { useCurrentPath } from 'hooks/useCurrentPath'
import { useMediaQuery } from 'hooks/useMediaQuery'
import { useStoreSelector } from 'hooks/useStoreSelector'
import { t } from 'languages'
import { dictionariesAPI } from 'services/dictionaries'
import { E_MediaQuery } from 'styles/theme'
import { getRoleName } from 'utils/dictionaries/roles'

export const Header = () => {
  const { openSidebar, logout } = useActions()
  const profile = useStoreSelector((state) => state.profile)

  const currentPath = useCurrentPath()
  const isMatch = useMediaQuery(E_MediaQuery.md)

  // Получения словаря с ролями
  const { data: rolesData, isFetching: isRolesFetching } = dictionariesAPI.useGetRolesQuery()

  const handleOpenSidebar = () => {
    openSidebar()
  }

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
    <S.HeaderWrapper>
      <S.HeaderLeftSection>
        {isMatch && <Button onClick={handleOpenSidebar} shape='circle' icon={<MenuOutlined />} />}
        <S.HeaderTitle>{t(headerTitles[currentPath])}</S.HeaderTitle>
      </S.HeaderLeftSection>

      <Dropdown overlay={profileMenu({ onLogout: handleLogout })} placement='bottomLeft'>
        <S.HeaderRightSection>
          <S.HeaderProfileInfo>
            <S.HeaderProfileInfoName>
              {profile.lastName} {profile.firstName}
            </S.HeaderProfileInfoName>
            <S.HeaderProfileInfoRole>
              {isRolesFetching || !rolesData ? '...' : getRoleName(rolesData.data, profile.role)}
            </S.HeaderProfileInfoRole>
          </S.HeaderProfileInfo>
          <S.HeaderProfileAvatar src={profile.avatar.url} />
        </S.HeaderRightSection>
      </Dropdown>
    </S.HeaderWrapper>
  )
}
