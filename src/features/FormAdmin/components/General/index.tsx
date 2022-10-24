import { Col, Form, Input, Row, Select } from 'antd'
import { MaskedInput } from 'antd-mask-input'

import { t } from 'languages'
import { T_DictionaryAdminRole } from 'models/shared/dictionaries'
import { maskPatterns } from 'utils/forms/maskPatterns'

interface I_GeneralSectionProps {
  roles: T_DictionaryAdminRole[]
}

export const GeneralSection = ({ roles }: I_GeneralSectionProps) => (
  <>
    <Row gutter={[16, 4]}>
      <Col xs={24} lg={6} xl={4}>
        <Form.Item name='phone' label={t('adminForm.fields.phone')} rules={[{ required: true }]}>
          <MaskedInput mask={maskPatterns.phone} />
        </Form.Item>
      </Col>
      <Col xs={24} lg={6} xl={4}>
        <Form.Item name='role' label={t('adminForm.fields.role')} rules={[{ required: true }]}>
          <Select>
            {roles.map((role) => (
              <Select.Option key={role.id} value={role.id}>
                {role.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={[16, 4]}>
      <Col xs={24} lg={6} xl={4}>
        <Form.Item
          name='lastName'
          label={t('adminForm.fields.lastName')}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col xs={24} lg={6} xl={4}>
        <Form.Item
          name='firstName'
          label={t('adminForm.fields.firstName')}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={[16, 4]}>
      <Col xs={24} lg={18} xl={12}>
        <Form.Item
          name='description'
          label={t('adminForm.fields.description')}
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Col>
    </Row>
  </>
)
