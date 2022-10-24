import { CheckOutlined } from '@ant-design/icons'
import { Button, Divider, Form, notification, Space } from 'antd'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { AvatarSection, GeneralSection, PasswordSection } from '../../components'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { t } from 'languages'
import { T_CreateAdminForm } from 'models/admins/forms'
import { adminsAPI } from 'services/admins'
import { dictionariesAPI } from 'services/dictionaries'
import { formCreateToAdmin } from 'utils/forms/admins'

export const FormCreateAdmin = () => {
  const navigate = useNavigate()

  const [form] = Form.useForm<T_CreateAdminForm>()
  const avatarValue = Form.useWatch('avatar', form)

  // Создание админа
  const [fetchCreateAdmin, { data, isSuccess }] = adminsAPI.useCreateAdminMutation()

  // Получения словаря с ролями
  const { data: rolesData, isFetching: isRolesFetching } = dictionariesAPI.useGetRolesQuery()

  useEffect(() => {
    if (data && isSuccess) {
      notification.open({
        message: t('notifications.createAdmin.success'),
        icon: <CheckOutlined style={{ color: '#52c41a' }} />,
      })
      navigate(`/admins`)
    }
  }, [isSuccess, data, navigate])

  const handleFinish = (values: T_CreateAdminForm) => {
    const payload = formCreateToAdmin(values)
    fetchCreateAdmin(payload)
  }

  const handleCancel = () => {
    navigate(-1)
  }

  if (isRolesFetching) return <Loader relative />

  if (rolesData?.data) {
    return (
      <Form form={form} layout='vertical' onFinish={handleFinish}>
        <GeneralSection roles={rolesData.data} />
        <PasswordSection />
        <AvatarSection avatarValue={avatarValue} />

        <Divider />
        <Form.Item>
          <Space>
            <Button onClick={handleCancel} size='large' type='default' htmlType='button'>
              {t('adminForm.actions.cancel')}
            </Button>
            <Button size='large' type='primary' htmlType='submit'>
              {t('adminForm.actions.create')}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    )
  }

  return <ErrorFeedback relative />
}
