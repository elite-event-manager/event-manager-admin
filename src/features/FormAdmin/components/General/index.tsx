import { Col, Form, Input, Row } from 'antd'

import { t } from 'languages'

export const GeneralSection = () => (
  <>
    <Row gutter={[16, 4]}>
      <Col xs={24} lg={6} xl={4}>
        <Form.Item name='email' label={t('adminForm.fields.email')} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
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
