import { Col, Form, Select } from 'antd'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { t } from 'languages'
import { dictionariesAPI } from 'services/dictionaries'

export const StatusSection = () => {
  const { data: statusesData, isFetching: isStatusesFetching } =
    dictionariesAPI.useGetStatusesQuery()

  if (isStatusesFetching) return <Loader relative />

  if (statusesData) {
    return (
      <Col xs={24} lg={9} xl={6}>
        <Form.Item name='status' label={t('userForm.fields.status')} rules={[{ required: true }]}>
          <Select>
            {statusesData.data.map((status) => (
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
