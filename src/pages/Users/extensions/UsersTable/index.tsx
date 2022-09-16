import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Table, Modal, InputRef } from 'antd'
import { FilterConfirmProps } from 'antd/lib/table/interface'
import { useRef, useState } from 'react'

import { getColumns } from './data'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { t } from 'languages'
import { T_UserId } from 'models/shared/user'
import { usersAPI } from 'services/users'
import { formatUserToDataSource } from 'utils/helpers/table'

export const UsersTable = () => {
  const [searchText, setSearchText] = useState('')
  const searchInput = useRef<InputRef>(null)

  const handleSearch = (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void) => {
    confirm()
    setSearchText(selectedKeys[0])
  }

  const handleReset = (clearFilters: () => void, confirm: (param?: FilterConfirmProps) => void) => {
    clearFilters()
    confirm()
    setSearchText('')
  }

  const { data: usersData, isFetching: isUsersFetching } = usersAPI.useGetUsersQuery()

  const handleRemove = (userId: T_UserId) => {
    Modal.confirm({
      title: t('modal.confirm.removeUser.title'),
      icon: <ExclamationCircleOutlined />,
      content: t('modal.confirm.removeUser.content'),
      okText: t('modal.confirm.removeUser.ok'),
      cancelText: t('modal.confirm.removeUser.cancel'),
      maskClosable: true,
      onOk: () => {
        console.log('fetchRemoveReview', userId)
      },
    })
  }

  if (isUsersFetching) {
    return <Loader />
  }

  if (usersData) {
    const dataTable = formatUserToDataSource(usersData)
    return (
      <Table
        columns={getColumns({
          handleRemove,
          handleSearch,
          handleReset,
          searchInput,
          searchText,
        })}
        dataSource={dataTable}
      />
    )
  }

  return <ErrorFeedback />
}
