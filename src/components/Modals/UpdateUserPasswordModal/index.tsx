import { Form, Input, Modal } from 'antd'

import { t } from 'languages'
import { T_ChangePassword } from 'models/user/forms'

interface UpdateUserPasswordModalProps {
  isOpen: boolean
  onClose: () => void
  onOk: (value: string) => void
}

export const UpdateUserPasswordModal = ({
  isOpen,
  onClose,
  onOk,
}: UpdateUserPasswordModalProps) => {
  const [form] = Form.useForm<T_ChangePassword>()

  const handleFinish = (values: T_ChangePassword) => {
    console.log('values', values)
    onOk(values.password)
  }

  return (
    <Modal
      title={t('modal.updateUserPassword.title')}
      open={isOpen}
      onOk={form.submit}
      onCancel={onClose}
      okText={t('modal.updateUserPassword.actions.update')}
    >
      <Form form={form} layout='vertical' onFinish={handleFinish}>
        <Form.Item
          name='password'
          label={t('userForm.fields.password')}
          hasFeedback
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
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
      </Form>
    </Modal>
  )
}
