import { DeleteOutlined, EditOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input, InputRef, Space, Tooltip } from 'antd'
import { FilterConfirmProps, FilterDropdownProps } from 'antd/lib/table/interface'
import moment from 'moment'
import { RefObject } from 'react'
import Highlighter from 'react-highlight-words'
import { Link } from 'react-router-dom'

import * as G from 'guards'
import { t } from 'languages'
import { T_DictionaryUserStatus } from 'models/shared/dictionaries'
import { E_RolePermission } from 'models/shared/role'
import { E_UserStatus, T_UserId } from 'models/shared/user'
import { T_UserRecord } from 'models/user'
import { getStatusName } from 'utils/dictionaries/statuses'
import { E_FormatDate } from 'utils/helpers/date'

interface I_GetColumnsProps {
  handleRemove: (userId: T_UserId) => void
  handleSearch: (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void) => void
  handleReset: (clearFilters: () => void, confirm: (param?: FilterConfirmProps) => void) => void
  searchInput: RefObject<InputRef>
  searchText: string
  statuses: T_DictionaryUserStatus[]
  handleOpenModalUser: (userId: T_UserId) => () => void
}

export const getColumns = ({
  handleRemove,
  handleSearch,
  handleReset,
  searchInput,
  searchText,
  statuses,
  handleOpenModalUser,
}: I_GetColumnsProps) => [
  {
    title: t('usersTable.table.id'),
    dataIndex: 'id',
    sorter: (a: T_UserRecord, b: T_UserRecord) => a.id - b.id,
  },
  {
    title: t('usersTable.table.user'),
    dataIndex: 'username',

    render: (username: string) => {
      return (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={username ? username.toString() : ''}
        />
      )
    },
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: FilterDropdownProps) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder='?????????? ????????????????????????'
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys as string[], confirm)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            ??????????
          </Button>
          <Button
            size='small'
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            style={{ width: 90 }}
          >
            ????????????????
          </Button>
        </Space>
      </div>
    ),
    onFilterDropdownOpenChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },

    onFilter: (value: string | number | boolean, record: T_UserRecord) =>
      (record.username + record.phone).toLowerCase().includes(String(value).toLowerCase()),
  },
  {
    title: t('usersTable.table.status'),
    dataIndex: 'status',
    sorter: (a: T_UserRecord, b: T_UserRecord) => a.status.localeCompare(b.status),
    render: (statusId: E_UserStatus) => getStatusName(statuses, statusId),
  },

  {
    title: t('usersTable.table.createdAt'),
    dataIndex: 'createdAt',
    sorter: (a: T_UserRecord, b: T_UserRecord) =>
      moment(a.createdAt).unix() - moment(b.createdAt).unix(),
    render: (value: string) => (
      <Space size='middle'>{moment(value).format(E_FormatDate.default)}</Space>
    ),
  },
  {
    title: t('usersTable.table.updatedAt'),
    dataIndex: 'updatedAt',
    sorter: (a: T_UserRecord, b: T_UserRecord) =>
      moment(a.updatedAt).unix() - moment(b.updatedAt).unix(),
    render: (value: string) => (
      <Space size='middle'>{moment(value).format(E_FormatDate.default)}</Space>
    ),
  },
  {
    key: 'action',
    render: (record: T_UserRecord) => (
      <Space size='middle'>
        <G.RolesGuard scope={[E_RolePermission['users.delete']]}>
          <Tooltip title={t('usersTable.tooltip.delete')} placement='topLeft'>
            <Button icon={<DeleteOutlined />} onClick={() => handleRemove(record.id)} />
          </Tooltip>
        </G.RolesGuard>
        <G.RolesGuard scope={[E_RolePermission['users.update']]}>
          <Tooltip title={t('usersTable.tooltip.update')} placement='topLeft'>
            <Link to={`/users/update/${record.id}`}>
              <Button icon={<EditOutlined />} />
            </Link>
          </Tooltip>
        </G.RolesGuard>
        <G.RolesGuard scope={[E_RolePermission['users.delete']]}>
          <Tooltip title={t('usersTable.tooltip.view')} placement='topLeft'>
            <Button onClick={handleOpenModalUser(record.id)} icon={<EyeOutlined />} />
          </Tooltip>
        </G.RolesGuard>
      </Space>
    ),
    align: 'center',
  },
]
