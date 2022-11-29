import { Button, message, Modal } from 'antd'
import { useCallback, useState } from 'react'

import { AdminRolesTree } from 'features/Trees'
import { t } from 'languages'
import { I_AdminRole } from 'models/roles'

interface UpdateUserPasswordModalProps {
  isOpen: boolean
  onClose: () => void
  onOk: (rolesId: number[]) => void
  adminRoles: I_AdminRole[]
  isLoading: boolean
}

export const UpdateAdminRolesModal = ({
  isOpen,
  onClose,
  onOk,
  adminRoles,
  isLoading,
}: UpdateUserPasswordModalProps) => {
  const [selectedRolesIds, setSelectedRolesIdS] = useState<number[]>([])

  const handleFinish = () => {
    if (!selectedRolesIds.length) {
      message.info(t('updateAdminRoles.messages.select'))
      return
    }
    onOk(selectedRolesIds)
  }

  const handleCheckTree = useCallback((values: any[]) => {
    setSelectedRolesIdS(values)
  }, [])

  return (
    <Modal
      title={t('modal.updateAdminRoles.title')}
      open={isOpen}
      onOk={handleFinish}
      onCancel={onClose}
      footer={[
        <Button key='cancel' disabled={isLoading} onClick={onClose}>
          {t('modal.updateAdminRoles.actions.cancel')}
        </Button>,
        <Button key='updateRole' loading={isLoading} onClick={handleFinish}>
          {t('modal.updateAdminRoles.actions.update')}
        </Button>,
      ]}
    >
      <AdminRolesTree onChange={handleCheckTree} adminRoles={adminRoles} />
    </Modal>
  )
}
