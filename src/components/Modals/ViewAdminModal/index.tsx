import { CheckOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Descriptions, Divider, Modal, notification, Space, Tag, Tooltip } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'

import * as S from './styles'

import { UpdatePasswordModal, UpdateAdminRolesModal } from '..'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { t } from 'languages'
import { T_AdminId } from 'models/shared/admin'
import { adminsAPI } from 'services/admins'
import { E_FormatDate } from 'utils/helpers/date'

interface I_ViewAdminModalProps {
  isOpen: boolean
  handleClose: () => void
  adminId: T_AdminId | null
}

export const ViewAdminModal = ({ isOpen, handleClose, adminId }: I_ViewAdminModalProps) => {
  const [isModalPasswordOpen, setIsModalPasswordOpen] = useState(false)
  const [isModalRolesOpen, setInModalRolesOpen] = useState(false)

  // Получение админа
  const [fetchGetAdmin, { data: adminData, isFetching: isAdminFetching }] =
    adminsAPI.useLazyGetAdminQuery()

  // Изменение роли
  const [fetchChangeRoles, { isSuccess: isChangeRolesSuccess, isLoading: isChangeRolesLoading }] =
    adminsAPI.useChangeRolesMutation()

  const [
    fetchChangePassword,
    { isSuccess: isChangePasswordSuccess, isLoading: isChangePasswordLoading },
  ] = adminsAPI.useChangePasswordMutation()

  // Получение админа
  useEffect(() => {
    if (adminId) {
      fetchGetAdmin(adminId)
    }
  }, [fetchGetAdmin, adminId])

  // Успешное изменение роли
  useEffect(() => {
    if (isChangeRolesSuccess) {
      notification.open({
        message: t('notifications.changeAdminRoles.success'),
        icon: <CheckOutlined style={{ color: '#52c41a' }} />,
      })
      setInModalRolesOpen(false)
    }
  }, [isChangeRolesSuccess])

  // Успешное изменение пароля
  useEffect(() => {
    if (isChangePasswordSuccess) {
      notification.open({
        message: t('notifications.changeAdminPassword.success'),
        icon: <CheckOutlined style={{ color: '#52c41a' }} />,
      })
      setIsModalPasswordOpen(false)
    }
  }, [isChangePasswordSuccess])

  const handleCloseModalPassword = () => {
    setIsModalPasswordOpen(false)
  }

  const handleOpenModalPassword = () => {
    setIsModalPasswordOpen(true)
  }

  const handleOkModalPassword = (password: string) => {
    if (adminData?.data?.id) {
      fetchChangePassword({ body: { password }, adminId: adminData.data.id })
      setIsModalPasswordOpen(false)
    }
  }

  const handleCloseModalRoles = () => {
    setInModalRolesOpen(false)
  }

  const handleOpenModalRoles = () => {
    setInModalRolesOpen(true)
  }

  const handleOkModalRoles = (rolesIds: number[]) => {
    if (adminData?.data?.id) {
      fetchChangeRoles({ body: { rolesIds }, adminId: adminData.data.id })
    }
  }

  return (
    <>
      <Modal
        title={t('modal.viewAdmin.title')}
        open={isOpen}
        footer={
          <Space>
            <Button
              key='updatePassword'
              disabled={isAdminFetching}
              onClick={handleOpenModalPassword}
            >
              {t('modal.viewAdmin.actions.updatePassword')}
            </Button>
            <Button key='updateRole' disabled={isAdminFetching} onClick={handleOpenModalRoles}>
              {t('modal.viewAdmin.actions.updateRole')}
            </Button>
          </Space>
        }
        onCancel={handleClose}
      >
        {isAdminFetching ? (
          <Loader relative />
        ) : adminData?.data ? (
          <div>
            <S.TopSection>
              <S.UserAvatar src={adminData.data.avatar} />
              <Space direction='vertical'>
                <b>
                  {adminData.data.lastName} {adminData.data.firstName}
                </b>
                <span>{adminData.data.email}</span>
              </Space>
            </S.TopSection>
            <Divider />
            <Descriptions bordered>
              <Descriptions.Item span={3} label={t('modal.viewAdmin.roles')}>
                {adminData.data.roles.map((adminRole) => (
                  <Tooltip
                    key={adminRole.roleId + adminRole.adminId}
                    title={adminRole.role.description}
                  >
                    <Tag>{adminRole.role.name}</Tag>
                  </Tooltip>
                ))}
              </Descriptions.Item>
              <Descriptions.Item span={3} label={t('modal.viewAdmin.description')}>
                {adminData.data.description}
              </Descriptions.Item>
              <Descriptions.Item span={3} label={t('modal.viewAdmin.created')}>
                {moment(adminData.data.createdAt).format(E_FormatDate.default)}
              </Descriptions.Item>
              <Descriptions.Item span={3} label={t('modal.viewAdmin.updated')}>
                {moment(adminData.data.updatedAt).format(E_FormatDate.default)}
              </Descriptions.Item>
            </Descriptions>
            {/* <Button danger icon={<DeleteOutlined />} /> */}
          </div>
        ) : (
          <ErrorFeedback relative />
        )}
        <UpdatePasswordModal
          isOpen={isModalPasswordOpen}
          onOk={handleOkModalPassword}
          onClose={handleCloseModalPassword}
          isLoading={isChangePasswordLoading}
        />
        <UpdateAdminRolesModal
          isOpen={isModalRolesOpen}
          onOk={handleOkModalRoles}
          onClose={handleCloseModalRoles}
          adminRoles={adminData?.data?.roles || []}
          isLoading={isChangeRolesLoading}
        />
      </Modal>
    </>
  )
}
