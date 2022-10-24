import { Col, Descriptions, Divider, Modal, Row, Space, Tag } from 'antd'
import moment from 'moment'
import { useEffect } from 'react'

import * as S from './styles'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { t } from 'languages'
import { T_AdminId } from 'models/shared/admin'
import { adminsAPI } from 'services/admins'
import { dictionariesAPI } from 'services/dictionaries'
import { getRoleName } from 'utils/dictionaries/roles'
import { E_FormatDate } from 'utils/helpers/date'

interface I_ViewAdminModalProps {
  isOpen: boolean
  handleClose: () => void
  adminId: T_AdminId | null
}

export const ViewAdminModal = ({ isOpen, handleClose, adminId }: I_ViewAdminModalProps) => {
  // Получение админа
  const [fetchGetAdmin, { data: adminData, isFetching: isAdminFetching }] =
    adminsAPI.useLazyGetAdminQuery()

  // Получения словаря с ролями
  const { data: rolesData, isFetching: isRolesFetching } = dictionariesAPI.useGetRolesQuery()

  useEffect(() => {
    if (adminId) {
      fetchGetAdmin(adminId)
    }
  }, [fetchGetAdmin, adminId])

  return (
    <Modal title={t('modal.viewAdmin.title')} open={isOpen} footer={null} onCancel={handleClose}>
      {isAdminFetching || isRolesFetching ? (
        <Loader relative />
      ) : adminData?.data && rolesData?.data ? (
        <div>
          <Row gutter={[16, 4]}>
            <Col xl={6}>
              <S.UserAvatar src={adminData.data.avatar.url} />
            </Col>
            <Col xl={18}>
              <Space direction='vertical'>
                <b>
                  {adminData.data.lastName} {adminData.data.firstName}
                </b>
                <span>{adminData.data.phone}</span>
                <span>
                  <Tag color='#51258F'>{getRoleName(rolesData.data, adminData.data.role)}</Tag>
                </span>
              </Space>
            </Col>
          </Row>
          <Divider />
          <Descriptions bordered>
            <Descriptions.Item span={24} label={t('modal.viewAdmin.description')}>
              {adminData.data.description}
            </Descriptions.Item>
          </Descriptions>
          <Divider />
          <Row>
            <Col>
              <b>{t('modal.viewAdmin.created')}</b>{' '}
              {moment(adminData.data.createdAt).format(E_FormatDate.default)}
            </Col>
          </Row>
          <Row>
            <Col>
              <b>{t('modal.viewAdmin.updated')}</b>{' '}
              {moment(adminData.data.updatedAt).format(E_FormatDate.default)}
            </Col>
          </Row>
        </div>
      ) : (
        <ErrorFeedback relative />
      )}
    </Modal>
  )
}
