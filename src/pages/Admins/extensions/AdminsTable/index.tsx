import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Table, Modal, InputRef } from 'antd'
import { ColumnsType, FilterConfirmProps } from 'antd/lib/table/interface'
import { useRef, useState } from 'react'

import { getColumns } from './data'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { ViewUserModal } from 'components/Modals'
import { t } from 'languages'
import { T_AdminRecord } from 'models/admins'
import { T_UserId } from 'models/shared/user'
import { adminsAPI } from 'services/admins'
import { dictionariesAPI } from 'services/dictionaries'
import { formatAdminToDataSource } from 'utils/helpers/table'

export const AdminsTable = () => {
  const [searchText, setSearchText] = useState('')
  const [isModalUserOpen, setIsModalUserOpen] = useState(false)
  const [modalUserId, setModalUserId] = useState<T_UserId | null>(null)

  const searchInput = useRef<InputRef>(null)

  // Удаление админа
  const [fetchDeleteUser] = adminsAPI.useDeleteAdminMutation()

  // Получение админов
  const { data: adminsData, isFetching: isAdminsFetching } = adminsAPI.useGetAdminsQuery()

  // Получения словаря с ролями
  const { data: rolesData, isFetching: isRolesFetching } = dictionariesAPI.useGetRolesQuery()

  const handleRemove = (userId: T_UserId) => {
    Modal.confirm({
      title: t('modal.confirm.removeUser.title') + ` ID:${userId}`,
      icon: <ExclamationCircleOutlined />,
      content: t('modal.confirm.removeUser.content'),
      okText: t('modal.confirm.removeUser.ok'),
      cancelText: t('modal.confirm.removeUser.cancel'),
      maskClosable: true,
      onOk: () => {
        fetchDeleteUser(userId)
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

  // Закрытие модального окна пользователя
  const handleCloseModalUser = () => {
    setIsModalUserOpen(false)
  }

  const handleOpenModalUser = (userId: T_UserId) => () => {
    setIsModalUserOpen(true)
    setModalUserId(userId)
  }

  if (isAdminsFetching || isRolesFetching) {
    return <Loader />
  }

  if (adminsData && rolesData) {
    const dataTable = adminsData.data.length ? formatAdminToDataSource(adminsData.data) : []
    return (
      <>
        <Table
          scroll={{ x: 'max-content' }}
          columns={
            getColumns({
              handleRemove,
              handleSearch,
              handleReset,
              searchInput,
              searchText,
              roles: rolesData.data,
              handleOpenModalUser,
            }) as ColumnsType<T_AdminRecord>
          }
          dataSource={dataTable}
          pagination={{ position: ['bottomLeft', 'topLeft'] }}
        />
        <ViewUserModal
          userId={modalUserId}
          isOpen={isModalUserOpen}
          handleClose={handleCloseModalUser}
        />
      </>
    )
  }

  return <ErrorFeedback relative />
}
