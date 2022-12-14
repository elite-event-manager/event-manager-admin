import { DeleteOutlined, EditOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input, InputRef, Space, Tag, Tooltip } from 'antd'
import { FilterConfirmProps, FilterDropdownProps } from 'antd/lib/table/interface'
import moment from 'moment'
import { RefObject } from 'react'
import Highlighter from 'react-highlight-words'
import { Link } from 'react-router-dom'

import * as G from 'guards'
import { t } from 'languages'
import { T_AdminRecord } from 'models/admins'
import { I_AdminRole } from 'models/roles'
import { T_AdminId } from 'models/shared/admin'
import { E_RolePermission } from 'models/shared/role'
import { E_FormatDate } from 'utils/helpers/date'

interface I_GetColumnsProps {
  handleRemove: (adminId: T_AdminId) => void
  handleSearch: (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void) => void
  handleReset: (clearFilters: () => void, confirm: (param?: FilterConfirmProps) => void) => void
  searchInput: RefObject<InputRef>
  searchText: string
  handleOpenModalUser: (adminId: T_AdminId) => () => void
}

export const getColumns = ({
  handleRemove,
  handleSearch,
  handleReset,
  searchInput,
  searchText,
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
          placeholder='?????????? ????????????'
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

    onFilter: (value: string | number | boolean, record: T_AdminRecord) =>
      (record.username + record.email).toLowerCase().includes(String(value).toLowerCase()),
  },
  {
    title: t('adminsTable.table.roles'),
    dataIndex: 'roles',
    render: (roles: I_AdminRole[]) =>
      roles.map((adminRole) => (
        <Tooltip key={adminRole.roleId + adminRole.adminId} title={adminRole.role.description}>
          <Tag>{adminRole.role.name}</Tag>
        </Tooltip>
      )),
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
        <G.RolesGuard scope={[E_RolePermission['admins.delete']]}>
          <Tooltip title={t('adminsTable.tooltip.delete')} placement='topLeft'>
            <Button icon={<DeleteOutlined />} onClick={() => handleRemove(record.id)} />
          </Tooltip>
        </G.RolesGuard>
        <G.RolesGuard scope={[E_RolePermission['admins.update.general']]}>
          <Tooltip title={t('adminsTable.tooltip.update')} placement='topLeft'>
            <Link to={`/admins/update/${record.id}`}>
              <Button icon={<EditOutlined />} />
            </Link>
          </Tooltip>
        </G.RolesGuard>
        <G.RolesGuard scope={[E_RolePermission['admins.view']]}>
          <Tooltip title={t('adminsTable.tooltip.view')} placement='topLeft'>
            <Button onClick={handleOpenModalUser(record.id)} icon={<EyeOutlined />} />
          </Tooltip>
        </G.RolesGuard>
      </Space>
    ),
    align: 'center',
  },
]
