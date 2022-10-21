import { CheckOutlined } from '@ant-design/icons'
import { Button, Divider, Form, notification, Row, Space } from 'antd'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { AvatarSection, GeneralSection, PasswordSection } from 'features/FormUser/components'
import { RoleGate } from 'gates/Role'
import { t } from 'languages'
import { E_AdminRole } from 'models/shared/admin'
import { T_CreateUserForm } from 'models/user/forms'
import { usersAPI } from 'services/users'
import { formToUser } from 'utils/forms/users'

export const FormCreateUser = () => {
  const navigate = useNavigate()

  const [form] = Form.useForm<T_CreateUserForm>()
  const avatarValue = Form.useWatch('avatar', form)

  // Создание пользователя
  const [fetchCreateUser, { data, isSuccess }] = usersAPI.useCreateUserMutation()

  useEffect(() => {
    if (data && isSuccess) {
      notification.open({
        message: t('notifications.createUser.success'),
        icon: <CheckOutlined style={{ color: '#52c41a' }} />,
      })
      navigate(`/users`)
    }
  }, [isSuccess, data, navigate])

  const handleFinish = (values: T_CreateUserForm) => {
    console.log('values', values)
    const payload = formToUser(values)
    fetchCreateUser(payload)
  }

  const handleCancel = () => {
    navigate(-1)
  }

  return (
    <Form form={form} layout='vertical' onFinish={handleFinish}>
      <GeneralSection />
      <PasswordSection />
      <AvatarSection avatarValue={avatarValue} />

      <RoleGate scopes={[E_AdminRole.superAdmin]}>
        <Row gutter={[16, 4]}>
          <StatusSection />
        </Row>
      </RoleGate>

      <Divider />
      <Form.Item>
        <Space>
          <Button onClick={handleCancel} size='large' type='default' htmlType='button'>
            {t('userForm.actions.cancel')}
          </Button>
          <Button size='large' type='primary' htmlType='submit'>
            {t('userForm.actions.create')}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
