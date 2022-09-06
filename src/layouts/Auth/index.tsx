import { Button, Input, Typography, Form, Divider, Space } from 'antd'

import { useStoreDispatch } from 'hooks/useStoreDispatch'
import { t } from 'languages'
import { signIn } from 'store/profile'

export const AuthLayout = () => {
  const dispatch = useStoreDispatch()

  const handleSingIn = () => {
    dispatch(signIn())
  }

  return (
    <div className='auth'>
      <Space direction='vertical'>
        <Typography.Title level={3}>{t('auth.title')}</Typography.Title>
        <Divider />
        <Form
          name='signIn'
          initialValues={{ remember: true }}
          autoComplete='off'
          onFinish={handleSingIn}
          layout='vertical'
          className='form'
        >
          <Form.Item label={t('auth.form.email.label')} name='login' rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label={t('auth.form.password.label')}
            name='password'
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' block>
              {t('auth.form.signIn')}
            </Button>
          </Form.Item>
        </Form>
        <Divider />
      </Space>
    </div>
  )
}
