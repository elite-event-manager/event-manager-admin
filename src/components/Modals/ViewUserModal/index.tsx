import { Col, Divider, Modal, Row, Space, Tag } from 'antd'
import moment from 'moment'
import { useEffect } from 'react'

import * as S from './styles'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { t } from 'languages'
import { T_UserId } from 'models/shared/user'
import { dictionariesAPI } from 'services/dictionaries'
import { usersAPI } from 'services/users'
import { getRoleName } from 'utils/dictionaries/roles'
import { getStatusName } from 'utils/dictionaries/statuses'
import { E_FormatDate } from 'utils/helpers/date'

interface I_ViewUserModalProps {
  isOpen: boolean
  handleClose: () => void
  userId: T_UserId | null
}

export const ViewUserModal = ({ isOpen, handleClose, userId }: I_ViewUserModalProps) => {
  // Получение пользователей
  const [fetchGetUser, { data: userData, isFetching: isUserFetching }] =
    usersAPI.useLazyGetUserQuery()

  // Получения словаря со статусами
  const { data: rolesData, isFetching: isRolesFetching } = dictionariesAPI.useGetRolesQuery()

  // Получения словаря со статусами
  const { data: statusesData, isFetching: isStatusesFetching } =
    dictionariesAPI.useGetStatusesQuery()

  useEffect(() => {
    if (userId) {
      fetchGetUser(userId)
    }
  }, [fetchGetUser, userId])

  return (
    <Modal title={t('modal.viewUser.title')} open={isOpen} footer={null} onCancel={handleClose}>
      {isUserFetching || isStatusesFetching || isRolesFetching ? (
        <Loader relative />
      ) : userData && rolesData && statusesData ? (
        <div>
          <Row>
            <Col span={4}>
              <S.UserAvatar src={userData.avatar.url} />
            </Col>
            <Col span={19} offset={1}>
              <Space direction='vertical'>
                <b>
                  {userData.lastName} {userData.firstName}
                </b>
                <span>{userData.phone}</span>
                <span>
                  <Tag color='#51258F'>{getRoleName(rolesData.data, userData.role)}</Tag>
                  <Tag color='#51258F'>{getStatusName(statusesData.data, userData.status)}</Tag>
                </span>
              </Space>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col>{userData.description}</Col>
          </Row>
          <Divider />
          <Row>
            <Col>
              <b>{t('modal.viewUser.created')}</b>{' '}
              {moment(userData.createdAt).format(E_FormatDate.default)}
            </Col>
          </Row>
          <Row>
            <Col>
              <b>{t('modal.viewUser.updated')}</b>{' '}
              {moment(userData.updatedAt).format(E_FormatDate.default)}
            </Col>
          </Row>
        </div>
      ) : (
        <ErrorFeedback relative />
      )}
    </Modal>
  )
}
