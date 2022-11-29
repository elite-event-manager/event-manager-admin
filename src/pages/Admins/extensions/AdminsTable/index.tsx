import { ExclamationCircleOutlined, CheckOutlined } from '@ant-design/icons'
import { Table, Modal, InputRef, notification } from 'antd'
import { ColumnsType, FilterConfirmProps } from 'antd/lib/table/interface'
import { useEffect, useRef, useState } from 'react'

import { getColumns } from './data'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { ViewAdminModal } from 'components/Modals'
import { t } from 'languages'
import { T_AdminRecord } from 'models/admins'
import { T_AdminId } from 'models/shared/admin'
import { adminsAPI } from 'services/admins'
import { formatAdminToDataSource } from 'utils/helpers/table'

export const AdminsTable = () => {
  const [searchText, setSearchText] = useState('')
  const [isModalUserOpen, setIsModalUserOpen] = useState(false)
  const [modalAdminId, setModalAdminId] = useState<T_AdminId | null>(null)

  const searchInput = useRef<InputRef>(null)

  // Удаление админа
  const [fetchDeleteUser, { isSuccess: isDeleteAdminSuccess }] = adminsAPI.useDeleteAdminMutation()

  // Получение админов
  const {
    data: adminsData,
    isFetching: isAdminsFetching,
    isLoading: isAdminsLoading,
  } = adminsAPI.useGetAdminsQuery(null, {
    refetchOnMountOrArgChange: true,
  })

  const handleRemove = (adminId: T_AdminId) => {
    Modal.confirm({
      title: t('modal.confirm.removeAdmin.title') + ` ID:${adminId}`,
      icon: <ExclamationCircleOutlined />,
      content: t('modal.confirm.removeAdmin.content'),
      okText: t('modal.confirm.removeAdmin.ok'),
      cancelText: t('modal.confirm.removeAdmin.cancel'),
      maskClosable: true,
      onOk: () => {
        fetchDeleteUser(adminId)
      },
    })
  }

  // Поиск по таблице
  const handleSearch = (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void) => {
    confirm()
    setSearchText(selectedKeys[0])
  }

  // Сброс поиска по таблице
  const handleReset = (clearFilters: () => void, confirm: (param?: FilterConfirmProps) => void) => {
    clearFilters()
    confirm()
    setSearchText('')
  }

  const handleCloseModalUser = () => {
    setIsModalUserOpen(false)
  }

  const handleOpenModalUser = (adminId: T_AdminId) => () => {
    setIsModalUserOpen(true)
    setModalAdminId(adminId)
  }

  useEffect(() => {
    if (isDeleteAdminSuccess) {
      notification.open({
        message: t('notifications.deleteAdmin.success'),
        icon: <CheckOutlined style={{ color: '#52c41a' }} />,
      })
    }
  }, [isDeleteAdminSuccess])

  if (isAdminsLoading) {
    return <Loader relative />
  }

  if (adminsData?.data) {
    const dataTable = adminsData.data.length ? formatAdminToDataSource(adminsData.data) : []
    return (
      <>
        {isAdminsFetching ? (
          <Loader relative />
        ) : (
          <Table
            scroll={{ x: 'max-content' }}
            columns={
              getColumns({
                handleRemove,
                handleSearch,
                handleReset,
                searchInput,
                searchText,
                handleOpenModalUser,
              }) as ColumnsType<T_AdminRecord>
            }
            dataSource={dataTable}
            pagination={{ position: ['bottomLeft', 'topLeft'] }}
          />
        )}
        <ViewAdminModal
          adminId={modalAdminId}
          isOpen={isModalUserOpen}
          handleClose={handleCloseModalUser}
        />
      </>
    )
  }

  return <ErrorFeedback relative />
}
