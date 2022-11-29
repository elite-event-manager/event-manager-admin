import { Descriptions, Divider, Modal, Space } from 'antd'
import moment from 'moment'
import { useEffect } from 'react'

import * as S from './styles'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { t } from 'languages'
import { T_UserId } from 'models/shared/user'
import { dictionariesAPI } from 'services/dictionaries'
import { usersAPI } from 'services/users'
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
  const { data: statusesData, isFetching: isStatusesFetching } =
    dictionariesAPI.useGetStatusesQuery()

  useEffect(() => {
    if (userId) {
      fetchGetUser(userId)
    }
  }, [fetchGetUser, userId])

  return (
    <Modal title={t('modal.viewUser.title')} open={isOpen} footer={null} onCancel={handleClose}>
      {isUserFetching || isStatusesFetching ? (
        <Loader relative />
      ) : userData?.data && statusesData?.data ? (
        <div>
          <S.TopSection>
            <S.UserAvatar src={userData.data.avatar} />
            <Space direction='vertical'>
              <b>
                {userData.data.lastName} {userData.data.firstName} {userData.data.middleName}
              </b>
              <span>{userData.data.phone}</span>
            </Space>
          </S.TopSection>
          <Divider />
          <Descriptions bordered>
            <Descriptions.Item span={3} label={t('modal.viewUser.status')}>
              {getStatusName(statusesData.data, userData.data.status)}
            </Descriptions.Item>
            <Descriptions.Item span={3} label={t('modal.viewUser.age')}>
              {userData.data.age}
            </Descriptions.Item>
            <Descriptions.Item span={3} label={t('modal.viewUser.address')}>
              {userData.data.address}
            </Descriptions.Item>
            <Descriptions.Item span={3} label={t('modal.viewUser.job')}>
              {userData.data.job}
            </Descriptions.Item>
            <Descriptions.Item span={3} label={t('modal.viewUser.description')}>
              {userData.data.description}
            </Descriptions.Item>
            <Descriptions.Item span={3} label={t('modal.viewUser.created')}>
              {moment(userData.data.createdAt).format(E_FormatDate.default)}
            </Descriptions.Item>
            <Descriptions.Item span={3} label={t('modal.viewUser.updated')}>
              {moment(userData.data.updatedAt).format(E_FormatDate.default)}
            </Descriptions.Item>
          </Descriptions>
        </div>
      ) : (
        <ErrorFeedback relative />
      )}
    </Modal>
  )
}
