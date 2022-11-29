import { Divider, Modal, Space } from 'antd'
import { useEffect } from 'react'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { RoleTree } from 'features/Trees'
import { t } from 'languages'
import { T_UserId } from 'models/shared/user'
import { rolesAPI } from 'services/roles'

interface I_ViewRoleModalProps {
  isOpen: boolean
  handleClose: () => void
  roleId: T_UserId | null
}

export const ViewRoleModal = ({ isOpen, handleClose, roleId }: I_ViewRoleModalProps) => {
  // Получение роли
  const [fetchGetRole, { data: roleData, isFetching: isRoleFetching }] =
    rolesAPI.useLazyGetRoleQuery()

  useEffect(() => {
    if (roleId) {
      fetchGetRole(roleId)
    }
  }, [fetchGetRole, roleId])

  return (
    <Modal title={t('modal.viewRole.title')} open={isOpen} footer={null} onCancel={handleClose}>
      {isRoleFetching ? (
        <Loader relative />
      ) : roleData?.data ? (
        <div>
          <Space direction='vertical'>
            <b>{roleData.data.name}</b>
            <span>{roleData.data.description}</span>
          </Space>
          <Divider />
          <RoleTree roles={[roleData.data]} />
        </div>
      ) : (
        <ErrorFeedback relative />
      )}
    </Modal>
  )
}
