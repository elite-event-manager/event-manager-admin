import { Button, Col, Divider, Form, Input, Row, Upload } from 'antd'
import { useNavigate } from 'react-router-dom'

import { UploadImageButton } from 'components/UploadButton'
import { t } from 'languages'
import { T_UserForm } from 'models/user'
import { usersAPI } from 'services/users'

export const CreateUserForm = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const handleCancel = () => {
    navigate(-1)
  }

  const [fetchCreateUser, { data, isSuccess, isError, error }] = usersAPI.useCreateUserMutation()

  const handleFinish = (values: T_UserForm) => {
    values.avatar = 'string'
    fetchCreateUser(values)
  }

  return (
    <Form form={form} layout='vertical' onFinish={handleFinish}>
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

      <Row>
        <Col span={13}>
          <Form.Item name='avatar' label={t('userForm.fields.avatar')} valuePropName='fileList'>
            <Upload listType='picture-card'>
              <UploadImageButton />
            </Upload>
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={6}>
          <Form.Item name='status' label={t('userForm.fields.status')} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={6} offset={1}>
          <Form.Item name='role' label={t('userForm.fields.role')} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Divider />

      <Form.Item>
        <Button size='large' type='primary' htmlType='submit'>
          {t('userForm.actions.create')}
        </Button>
        <Button onClick={handleCancel} size='large' type='dashed' htmlType='button'>
          {t('userForm.actions.cancel')}
        </Button>
      </Form.Item>
    </Form>
  )
}
