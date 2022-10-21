import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Table, Modal, InputRef } from 'antd'
import { ColumnsType, FilterConfirmProps } from 'antd/lib/table/interface'
import { useRef, useState } from 'react'

import { getColumns } from './data'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { ViewUserModal } from 'components/Modals'
import { t } from 'languages'
import { T_UserId } from 'models/shared/user'
import { T_UserRecord } from 'models/user'
import { dictionariesAPI } from 'services/dictionaries'
import { usersAPI } from 'services/users'
import { formatUserToDataSource } from 'utils/helpers/table'

export const UsersTable = () => {
  const [searchText, setSearchText] = useState('')
  const [isModalUserOpen, setIsModalUserOpen] = useState(false)
  const [modalUserId, setModalUserId] = useState<T_UserId | null>(null)

  const searchInput = useRef<InputRef>(null)

  // Удаление пользователя
  const [fetchDeleteUser] = usersAPI.useDeleteUserMutation()

  // Получение пользователей
  const { data: usersData, isFetching: isUsersFetching } = usersAPI.useGetUsersQuery()

  // Получения словаря со статусами
  const { data: statusesData, isFetching: isStatusesFetching } =
    dictionariesAPI.useGetStatusesQuery()

  const handleRemove = (userId: T_UserId) => {
    Modal.confirm({
      title: t('modal.confirm.removeUser.title'),
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

  if (isUsersFetching || isStatusesFetching) {
    return <Loader />
  }

  if (usersData && statusesData) {
    const dataTable = usersData.data.length ? formatUserToDataSource(usersData.data) : []
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
              statuses: statusesData.data,
              handleOpenModalUser,
            }) as ColumnsType<T_UserRecord>
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
