import { Col, Form, Input, InputNumber, Row, Select } from 'antd'
import { MaskedInput } from 'antd-mask-input'

import { t } from 'languages'
import { T_DictionaryUserStatus } from 'models/shared/dictionaries'
import { maskPatterns } from 'utils/forms/maskPatterns'

interface I_GeneralSectionProps {
  statuses: T_DictionaryUserStatus[]
}

export const GeneralSection = ({ statuses }: I_GeneralSectionProps) => (
  <>
    <Row gutter={[16, 4]}>
      <Col xs={24} lg={6} xl={4}>
        <Form.Item name='phone' label={t('userForm.fields.phone')} rules={[{ required: true }]}>
          <MaskedInput mask={maskPatterns.phone} />
        </Form.Item>
      </Col>
      <Col xs={24} lg={6} xl={4}>
        <Form.Item name='status' label={t('userForm.fields.status')} rules={[{ required: true }]}>
          <Select>
            {statuses.map((status) => (
              <Select.Option key={status.id} value={status.id}>
                {status.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col xs={24} lg={6} xl={4}>
        <Form.Item name='age' label={t('userForm.fields.age')} rules={[{ required: true }]}>
          <InputNumber min={18} max={99} />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={[16, 4]}>
      <Col xs={24} lg={6} xl={4}>
        <Form.Item
          name='lastName'
          label={t('userForm.fields.lastName')}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col xs={24} lg={6} xl={4}>
        <Form.Item
          name='firstName'
          label={t('userForm.fields.firstName')}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col xs={24} lg={6} xl={4}>
        <Form.Item
          name='middleName'
          label={t('userForm.fields.middleName')}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={[16, 4]}>
      <Col xs={24} lg={9} xl={6}>
        <Form.Item name='address' label={t('userForm.fields.address')} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col xs={24} lg={9} xl={6}>
        <Form.Item name='job' label={t('userForm.fields.job')} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={[16, 4]}>
      <Col xs={24} lg={18} xl={12}>
        <Form.Item
          name='description'
          label={t('userForm.fields.description')}
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Col>
    </Row>
  </>
)
