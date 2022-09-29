import { Col, Form, Input, Row } from 'antd'

import { t } from 'languages'

export const PasswordSection = () => {
  return (
    <Row>
      <Col span={6}>
        <Form.Item
          name='password'
          label={t('userForm.fields.password')}
          hasFeedback
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
      </Col>
      <Col span={6} offset={1}>
        <Form.Item
          name='confirm'
          label={t('userForm.fields.rePassword')}
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Пароли не совпадают!'))
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Col>
    </Row>
  )
}
