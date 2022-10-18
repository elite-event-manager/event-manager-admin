import { CheckOutlined } from '@ant-design/icons'
import { Button, Divider, Form, notification, Row, Space } from 'antd'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { UpdateUserPasswordModal } from 'components/Modals'
import {
  AvatarSection,
  GeneralSection,
  StatusSection,
  RoleSection,
} from 'features/FormUser/components'
import { RoleGate } from 'gates/Role'
import { t } from 'languages'
import { T_Params } from 'models/routes'
import { E_UserRole } from 'models/shared/user'
import { T_UpdateUserForm } from 'models/user/forms'
import { usersAPI } from 'services/users'
import { formToUser, userToForm } from 'utils/forms/users'

export const FormUpdateUser = () => {
  const navigate = useNavigate()
  const params = useParams<T_Params>()

  const [isModalPasswordOpen, setIsModalPasswordOpen] = useState(false)

  const [form] = Form.useForm<T_UpdateUserForm>()
  const avatarValue = Form.useWatch('avatar', form)

  // Обновление пользователя
  const [fetchUpdateUser, { data, isSuccess }] = usersAPI.useUpdateUserMutation()

  // Обновление пароля пользователя
  const [fetchChangePassword, { isSuccess: isPasswordChangeSuccess }] =
    usersAPI.useChangePasswordMutation()

  // Успешное обновление пользователя
  useEffect(() => {
    if (data && isSuccess) {
      notification.open({
        message: t('notifications.updateUser.success'),
        icon: <CheckOutlined style={{ color: '#52c41a' }} />,
      })
      navigate(`/users`)
    }
  }, [isSuccess, data, navigate])

  useEffect(() => {
    if (isPasswordChangeSuccess) {
      notification.open({
        message: t('notifications.changePassword.success'),
        icon: <CheckOutlined style={{ color: '#52c41a' }} />,
      })
    }
  }, [isPasswordChangeSuccess])

  // Если параметр адресной строки не найден
  if (!params.userId) return <Navigate to='/users' />

  // Получение пользователя
  const { data: userData, isFetching: isUserFetching } = usersAPI.useGetUserQuery(
    Number(params.userId),
  )

  const handleFinish = (values: T_UpdateUserForm) => {
    const payload = formToUser(values)
    fetchUpdateUser({ user: payload, userId: Number(params.userId) })
  }

  const handleCancel = () => {
    navigate(-1)
  }

  const handleCloseModalPassword = () => {
    setIsModalPasswordOpen(false)
  }

  const handleOpenModalPassword = () => {
    setIsModalPasswordOpen(true)
  }

  const handleOkModalPassword = (password: string) => {
    if (password?.length >= 6 && userData?.id) {
      fetchChangePassword({ password, userId: userData.id })
      setIsModalPasswordOpen(false)
    }
  }

  if (isUserFetching) return <Loader relative />

  if (userData) {
    return (
      <>
        <Form
          form={form}
          layout='vertical'
          onFinish={handleFinish}
          initialValues={userToForm(userData)}
        >
          <GeneralSection />
          <AvatarSection avatarValue={avatarValue} />

          <RoleGate scopes={[E_UserRole.superAdmin]}>
            <Row gutter={[16, 4]}>
              <StatusSection />
              <RoleSection />
            </Row>
          </RoleGate>

          <Divider />
          <Form.Item>
            <Space>
              <Button onClick={handleCancel} size='large' type='default' htmlType='button'>
                {t('userForm.actions.cancel')}
              </Button>
              <Button size='large' type='primary' htmlType='submit'>
                {t('userForm.actions.save')}
              </Button>
            </Space>
          </Form.Item>
        </Form>
        <Divider />
        <Button onClick={handleOpenModalPassword} size='large' type='dashed' htmlType='button'>
          {t('userForm.actions.updatePassword')}
        </Button>
        <UpdateUserPasswordModal
          isOpen={isModalPasswordOpen}
          onOk={handleOkModalPassword}
          onClose={handleCloseModalPassword}
        />
      </>
    )
  }
  return <ErrorFeedback />
}
