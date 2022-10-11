import { Col, Form, Select } from 'antd'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { t } from 'languages'
import { dictionariesAPI } from 'services/dictionaries'

export const RoleSection = () => {
  const { data: rolesData, isFetching: isRolesFetching } = dictionariesAPI.useGetRolesQuery()

  if (isRolesFetching) return <Loader relative />

  if (rolesData) {
    return (
      <Col xs={24} lg={9} xl={6}>
        <Form.Item name='role' label={t('userForm.fields.role')} rules={[{ required: true }]}>
          <Select>
            {rolesData.data.map((status) => (
              <Select.Option key={status.id} value={status.id}>
                {status.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
    )
  }

  return <ErrorFeedback relative />
}
