import { DeleteOutlined, EditOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input, InputRef, Space, Tag, Tooltip } from 'antd'
import { FilterConfirmProps, FilterDropdownProps } from 'antd/lib/table/interface'
import moment from 'moment'
import { RefObject } from 'react'
import Highlighter from 'react-highlight-words'
import { Link } from 'react-router-dom'

import { t } from 'languages'
import { T_UserId } from 'models/shared/user'
import { T_UserRecord } from 'models/user'
import { E_FormatDate } from 'utils/helpers/date'

interface I_GetColumnsProps {
  handleRemove: (userId: T_UserId) => void
  handleSearch: (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void) => void
  handleReset: (clearFilters: () => void, confirm: (param?: FilterConfirmProps) => void) => void
  searchInput: RefObject<InputRef>
  searchText: string
}

export const getColumns = ({
  handleRemove,
  handleSearch,
  handleReset,
  searchInput,
  searchText,
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
          placeholder='Поиск пользователя'
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
            Поиск
          </Button>
          <Button
            size='small'
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            style={{ width: 90 }}
          >
            Сбросить
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
    title: t('usersTable.table.role'),
    dataIndex: 'role',
    sorter: (a: T_UserRecord, b: T_UserRecord) => a.role.localeCompare(b.role),
    render: (role: string) => <Tag color='#51258F'>{role}</Tag>,
  },

  {
    title: t('usersTable.table.createdAt'),
    dataIndex: 'createdAt',
    sorter: (a: T_UserRecord, b: T_UserRecord) =>
      moment(a.createdAt).unix() - moment(b.createdAt).unix(),
    render: (record: T_UserRecord) => (
      <Space size='middle'>{moment(record.createdAt).format(E_FormatDate.default)}</Space>
    ),
  },
  {
    title: t('usersTable.table.updatedAt'),
    dataIndex: 'updatedAt',
    sorter: (a: T_UserRecord, b: T_UserRecord) =>
      moment(a.updatedAt).unix() - moment(b.updatedAt).unix(),
    render: (record: T_UserRecord) => (
      <Space size='middle'>{moment(record.updatedAt).format(E_FormatDate.default)}</Space>
    ),
  },
  {
    key: 'action',
    render: (record: T_UserRecord) => (
      <Space size='middle'>
        <Tooltip title={t('usersTable.tooltip.delete')} placement='topLeft'>
          <Button icon={<DeleteOutlined />} onClick={() => handleRemove(record.id)} />
        </Tooltip>
        <Tooltip title={t('usersTable.tooltip.update')} placement='topLeft'>
          <Link to={`/users/${record.id}`} target='_blank'>
            <Button icon={<EditOutlined />} />
          </Link>
        </Tooltip>
        <Tooltip title={t('usersTable.tooltip.view')} placement='topLeft'>
          <Button icon={<EyeOutlined />} />
        </Tooltip>
      </Space>
    ),
  },
]
