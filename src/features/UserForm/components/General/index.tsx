import { Col, Form, Input, Row } from 'antd'
import { MaskedInput } from 'antd-mask-input'

import { t } from 'languages'
import { maskPatterns } from 'utils/forms/maskPatterns'

export const GeneralSection = () => (
  <>
    <Row>
      <Col span={6}>
        <Form.Item
          name='firstName'
          label={t('userForm.fields.firstName')}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={6} offset={1}>
        <Form.Item
          name='lastName'
          label={t('userForm.fields.lastName')}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Col>
    </Row>
    <Row>
      <Col span={6}>
        <Form.Item name='phone' label={t('userForm.fields.phone')} rules={[{ required: true }]}>
          <MaskedInput mask={maskPatterns.phone} />
        </Form.Item>
      </Col>
      <Col span={6} offset={1}>
        <Form.Item
          name='password'
          label={t('userForm.fields.password')}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Col>
    </Row>
    <Row>
      <Col span={13}>
        <Form.Item
          name='description'
          label={t('userForm.fields.description')}
          rules={[{ required: true }]}
        >
          <Input.TextArea showCount />
        </Form.Item>
      </Col>
    </Row>
  </>
)
