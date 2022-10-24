import { DeleteOutlined, EditOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input, InputRef, Space, Tag, Tooltip } from 'antd'
import { FilterConfirmProps, FilterDropdownProps } from 'antd/lib/table/interface'
import moment from 'moment'
import { RefObject } from 'react'
import Highlighter from 'react-highlight-words'
import { Link } from 'react-router-dom'

import { RoleGate } from 'gates/Role'
import { t } from 'languages'
import { T_AdminRecord } from 'models/admins'
import { E_AdminRole, T_AdminId } from 'models/shared/admin'
import { T_DictionaryAdminRole } from 'models/shared/dictionaries'
import { getRoleName } from 'utils/dictionaries/roles'
import { E_FormatDate } from 'utils/helpers/date'

interface I_GetColumnsProps {
  handleRemove: (adminId: T_AdminId) => void
  handleSearch: (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void) => void
  handleReset: (clearFilters: () => void, confirm: (param?: FilterConfirmProps) => void) => void
  searchInput: RefObject<InputRef>
  searchText: string
  roles: T_DictionaryAdminRole[]
  handleOpenModalUser: (adminId: T_AdminId) => () => void
}

export const getColumns = ({
  handleRemove,
  handleSearch,
  handleReset,
  searchInput,
  searchText,
  roles,
  handleOpenModalUser,
}: I_GetColumnsProps) => [
  {
    title: t('adminsTable.table.id'),
    dataIndex: 'id',
    sorter: (a: T_AdminRecord, b: T_AdminRecord) => a.id - b.id,
  },
  {
    title: t('adminsTable.table.user'),
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
          placeholder='Поиск админа'
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

    onFilter: (value: string | number | boolean, record: T_AdminRecord) =>
      (record.username + record.phone).toLowerCase().includes(String(value).toLowerCase()),
  },
  {
    title: t('adminsTable.table.role'),
    dataIndex: 'role',
    sorter: (a: T_AdminRecord, b: T_AdminRecord) => a.role.localeCompare(b.role),
    render: (roleId: E_AdminRole) => <Tag>{getRoleName(roles, roleId)}</Tag>,
  },

  {
    title: t('adminsTable.table.createdAt'),
    dataIndex: 'createdAt',
    sorter: (a: T_AdminRecord, b: T_AdminRecord) =>
      moment(a.createdAt).unix() - moment(b.createdAt).unix(),
    render: (value: string) => (
      <Space size='middle'>{moment(value).format(E_FormatDate.default)}</Space>
    ),
  },
  {
    key: 'action',
    render: (record: T_AdminRecord) => (
      <Space size='middle'>
        <RoleGate scopes={[E_AdminRole.superAdmin, E_AdminRole.admin]}>
          <Tooltip title={t('adminsTable.tooltip.delete')} placement='topLeft'>
            <Button icon={<DeleteOutlined />} onClick={() => handleRemove(record.id)} />
          </Tooltip>
        </RoleGate>
        <Tooltip title={t('adminsTable.tooltip.update')} placement='topLeft'>
          <Link to={`/admins/update/${record.id}`}>
            <Button icon={<EditOutlined />} />
          </Link>
        </Tooltip>
        <Tooltip title={t('adminsTable.tooltip.view')} placement='topLeft'>
          <Button onClick={handleOpenModalUser(record.id)} icon={<EyeOutlined />} />
        </Tooltip>
      </Space>
    ),
    align: 'center',
  },
]
