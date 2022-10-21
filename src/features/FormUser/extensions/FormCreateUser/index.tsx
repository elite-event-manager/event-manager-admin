import { CheckOutlined } from '@ant-design/icons'
import { Button, Divider, Form, notification, Space } from 'antd'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { AvatarSection, GeneralSection, PasswordSection } from 'features/FormUser/components'
import { t } from 'languages'
import { T_CreateUserForm } from 'models/user/forms'
import { dictionariesAPI } from 'services/dictionaries'
import { usersAPI } from 'services/users'
import { formCreateToUser } from 'utils/forms/users'

export const FormCreateUser = () => {
  const navigate = useNavigate()

  const [form] = Form.useForm<T_CreateUserForm>()
  const avatarValue = Form.useWatch('avatar', form)

  // Создание пользователя
  const [fetchCreateUser, { data, isSuccess }] = usersAPI.useCreateUserMutation()

  // Получения словаря со статусами
  const { data: statusesData, isFetching: isStatusesFetching } =
    dictionariesAPI.useGetStatusesQuery()

  // Успешное создание пользователя
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
    const payload = formCreateToUser(values)
    fetchCreateUser(payload)
  }

  const handleCancel = () => {
    navigate(-1)
  }

  if (isStatusesFetching) return <Loader relative />

  if (statusesData) {
    return (
      <Form form={form} layout='vertical' onFinish={handleFinish}>
        <GeneralSection statuses={statusesData.data} />
        <PasswordSection />
        <AvatarSection avatarValue={avatarValue} />

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

  return <ErrorFeedback relative />
}
