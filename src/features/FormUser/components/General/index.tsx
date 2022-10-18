import { Col, Form, Input, Row } from 'antd'
import { MaskedInput } from 'antd-mask-input'

import { t } from 'languages'
import { maskPatterns } from 'utils/forms/maskPatterns'

export const GeneralSection = () => (
  <>
    <Row gutter={[16, 4]}>
      <Col xs={24} lg={9} xl={6}>
        <Form.Item name='phone' label={t('userForm.fields.phone')} rules={[{ required: true }]}>
          <MaskedInput mask={maskPatterns.phone} />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={[16, 4]}>
      <Col xs={24} lg={9} xl={6}>
        <Form.Item
          name='firstName'
          label={t('userForm.fields.firstName')}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col xs={24} lg={9} xl={6}>
        <Form.Item
          name='lastName'
          label={t('userForm.fields.lastName')}
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
          label={t('userForm.fields.description')}
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Col>
    </Row>
  </>
)
