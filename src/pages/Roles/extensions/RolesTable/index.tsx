import { ExclamationCircleOutlined, CheckOutlined } from '@ant-design/icons'
import { Table, Modal, notification } from 'antd'
import { ColumnsType } from 'antd/lib/table/interface'
import { useEffect, useState } from 'react'

import { getColumns } from './data'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { ViewRoleModal } from 'components/Modals'
import { t } from 'languages'
import { T_RoleRecord } from 'models/roles'
import { T_RoleId } from 'models/shared/role'
import { rolesAPI } from 'services/roles'
import { formatToDataSource } from 'utils/helpers/table'

export const RolesTable = () => {
  const [isModalUserOpen, setIsModalUserOpen] = useState(false)
  const [modalRoleId, setModalRoleId] = useState<T_RoleId | null>(null)

  // Удаление пользователя
  const [fetchDeleteUser, { isSuccess: isDeleteRoleSuccess }] = rolesAPI.useDeleteRoleMutation()

  // Получение пользователей
  const { data: rolesData, isFetching: isRolesFetching } = rolesAPI.useGetRolesQuery(null, {
    refetchOnMountOrArgChange: true,
  })

  const handleRemove = (userId: T_RoleId) => {
    Modal.confirm({
      title: t('modal.confirm.removeRole.title'),
      icon: <ExclamationCircleOutlined />,
      content: t('modal.confirm.removeRole.content'),
      okText: t('modal.confirm.removeRole.ok'),
      cancelText: t('modal.confirm.removeRole.cancel'),
      maskClosable: true,
      onOk: () => {
        fetchDeleteUser(userId)
      },
    })
  }

  useEffect(() => {
    if (isDeleteRoleSuccess) {
      notification.open({
        message: t('notifications.deleteUser.success'),
        icon: <CheckOutlined style={{ color: '#52c41a' }} />,
      })
    }
  }, [isDeleteRoleSuccess])

  const handleCloseModalUser = () => {
    setIsModalUserOpen(false)
  }

  const handleOpenModalUser = (userId: T_RoleId) => () => {
    setIsModalUserOpen(true)
    setModalRoleId(userId)
  }

  if (isRolesFetching) {
    return <Loader />
  }

  if (rolesData?.data) {
    const dataTable = rolesData.data.length ? formatToDataSource(rolesData.data) : []
    return (
      <>
        <Table
          scroll={{ x: 'max-content' }}
          columns={
            getColumns({
              handleRemove,
              handleOpenModalUser,
            }) as ColumnsType<T_RoleRecord>
          }
          dataSource={dataTable}
          pagination={{ position: ['bottomLeft', 'topLeft'] }}
        />
        <ViewRoleModal
          roleId={modalRoleId}
          isOpen={isModalUserOpen}
          handleClose={handleCloseModalUser}
        />
      </>
    )
  }

  return <ErrorFeedback relative />
}
