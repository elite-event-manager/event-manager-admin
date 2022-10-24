import { CheckOutlined } from '@ant-design/icons'
import { Button, Divider, Form, notification, Space } from 'antd'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { AvatarSection, GeneralSection } from '../../components'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { UpdateUserPasswordModal } from 'components/Modals'
import { t } from 'languages'
import { T_UpdateAdminForm } from 'models/admins/forms'
import { T_Params } from 'models/routes'
import { adminsAPI } from 'services/admins'
import { dictionariesAPI } from 'services/dictionaries'
import { adminToFormUpdate, formUpdateToAdmin } from 'utils/forms/admins'

export const FormUpdateAdmin = () => {
  const navigate = useNavigate()
  const params = useParams<T_Params>()

  const [isModalPasswordOpen, setIsModalPasswordOpen] = useState(false)

  const [form] = Form.useForm<T_UpdateAdminForm>()
  const avatarValue = Form.useWatch('avatar', form)

  // Обновление админа
  const [fetchUpdateAdmin, { data, isSuccess }] = adminsAPI.useUpdateAdminMutation()

  // Обновление пароля
  const [fetchChangePassword, { isSuccess: isPasswordChangeSuccess }] =
    adminsAPI.useChangePasswordMutation()

  // Успешное обновление админа
  useEffect(() => {
    if (data && isSuccess) {
      notification.open({
        message: t('notifications.updateAdmin.success'),
        icon: <CheckOutlined style={{ color: '#52c41a' }} />,
      })
      navigate(`/admins`)
    }
  }, [isSuccess, data, navigate])

  // Успешное обновление пароля
  useEffect(() => {
    if (isPasswordChangeSuccess) {
      notification.open({
        message: t('notifications.changePassword.success'),
        icon: <CheckOutlined style={{ color: '#52c41a' }} />,
      })
    }
  }, [isPasswordChangeSuccess])

  // Если параметр адресной строки не найден
  if (!params.adminId) return <Navigate to='/admins' />

  // Получение админа
  const { data: adminData, isFetching: isAdminFetching } = adminsAPI.useGetAdminQuery(
    Number(params.adminId),
  )

  // Получения словаря с ролями
  const { data: rolesData, isFetching: isRolesFetching } = dictionariesAPI.useGetRolesQuery()

  const handleFinish = (values: T_UpdateAdminForm) => {
    const payload = formUpdateToAdmin(values)
    fetchUpdateAdmin({ admin: payload, adminId: Number(params.adminId) })
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
    if (password?.length >= 6 && adminData?.data?.id) {
      fetchChangePassword({ password: { password }, adminId: adminData.data.id })
      setIsModalPasswordOpen(false)
    }
  }

  if (isAdminFetching || isRolesFetching) return <Loader relative />

  if (adminData?.data && rolesData?.data) {
    return (
      <>
        <Form
          form={form}
          layout='vertical'
          onFinish={handleFinish}
          initialValues={adminToFormUpdate(adminData.data)}
        >
          <GeneralSection roles={rolesData.data} />
          <AvatarSection avatarValue={avatarValue} />

          <Divider />
          <Form.Item>
            <Space>
              <Button onClick={handleCancel} size='large' type='default' htmlType='button'>
                {t('adminForm.actions.cancel')}
              </Button>
              <Button size='large' type='primary' htmlType='submit'>
                {t('adminForm.actions.save')}
              </Button>
            </Space>
          </Form.Item>
        </Form>
        <Divider />
        <Button onClick={handleOpenModalPassword} size='large' type='dashed' htmlType='button'>
          {t('adminForm.actions.updatePassword')}
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
