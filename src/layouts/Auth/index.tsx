import { Button, Input, Typography, Form, Divider, notification } from 'antd'
import { MaskedInput } from 'antd-mask-input'
import { useEffect } from 'react'

import { I_AuthForm } from './models/form'
import * as S from './styles'

import { useActions } from 'hooks/useActions'
import { t } from 'languages'
import { authAPI } from 'services/auth'
import { maskPatterns } from 'utils/forms/maskPatterns'

export const AuthLayout = () => {
  const { signIn } = useActions()
  const [fetchSignIn, { data, isSuccess }] = authAPI.useSignInMutation()

  const [form] = Form.useForm<I_AuthForm>()

  const handleSingIn = (values: I_AuthForm) => {
    fetchSignIn(values)
  }

  // Успешная аутентификация
  useEffect(() => {
    if (data && isSuccess) {
      signIn(data)
    }
  }, [data, isSuccess, signIn])

  return (
    <S.Layout>
      <S.AuthForm>
        <Typography.Title level={3}>{t('app.title')}</Typography.Title>
        <Divider />
        <Form autoComplete='off' layout='vertical' form={form} onFinish={handleSingIn}>
          <Form.Item label={t('auth.form.phone.label')} name='phone' rules={[{ required: true }]}>
            <MaskedInput mask={maskPatterns.phone} />
          </Form.Item>

          <Form.Item
            label={t('auth.form.password.label')}
            name='password'
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Divider />

          <Form.Item>
            <Button type='primary' htmlType='submit' block>
              {t('auth.form.signIn')}
            </Button>
          </Form.Item>
        </Form>
      </S.AuthForm>
    </S.Layout>
  )
}
