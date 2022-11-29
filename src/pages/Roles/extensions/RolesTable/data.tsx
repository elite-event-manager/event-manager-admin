import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import { Link } from 'react-router-dom'

import { t } from 'languages'
import { T_RoleRecord } from 'models/roles'
import { T_RoleId } from 'models/shared/role'

interface I_GetColumnsProps {
  handleRemove: (roleId: T_RoleId) => void
  handleOpenModalUser: (roleId: T_RoleId) => () => void
}

export const getColumns = ({ handleRemove, handleOpenModalUser }: I_GetColumnsProps) => [
  {
    title: t('rolesTable.table.id'),
    dataIndex: 'id',
    sorter: (a: T_RoleRecord, b: T_RoleRecord) => a.id - b.id,
  },
  {
    title: t('rolesTable.table.name'),
    dataIndex: 'name',
  },
  {
    title: t('rolesTable.table.description'),
    dataIndex: 'description',
  },
  {
    key: 'action',
    render: (record: T_RoleRecord) => (
      <Space size='middle'>
        <Tooltip title={t('rolesTable.tooltip.delete')} placement='topLeft'>
          <Button icon={<DeleteOutlined />} onClick={() => handleRemove(record.id)} />
        </Tooltip>
        <Tooltip title={t('rolesTable.tooltip.update')} placement='topLeft'>
          <Link to={`/roles/update/${record.id}`}>
            <Button icon={<EditOutlined />} />
          </Link>
        </Tooltip>
        <Tooltip title={t('rolesTable.tooltip.view')} placement='topLeft'>
          <Button onClick={handleOpenModalUser(record.id)} icon={<EyeOutlined />} />
        </Tooltip>
      </Space>
    ),
    align: 'center',
  },
]
