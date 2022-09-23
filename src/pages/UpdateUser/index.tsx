import { Breadcrumb, Divider } from 'antd'
import { Link, Navigate, useParams } from 'react-router-dom'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { UpdateUserForm } from 'features/UserForm'
import { t } from 'languages'
import { T_Params } from 'models/routes'
import { usersAPI } from 'services/users'
import * as C from 'styles/components'
import { userToForm } from 'utils/forms/users'

export const UpdateUser = () => {
  const params = useParams<T_Params>()
  if (!params.userId) return <Navigate to='/users' />

  const { data: userData, isFetching: isUserFetching } = usersAPI.useGetUserQuery(
    Number(params.userId),
  )

  if (isUserFetching) return <Loader relative />

  if (userData) {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to='/users'>{t('breadcrumbs.users')}</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{t('breadcrumbs.updateUser')}</Breadcrumb.Item>
        </Breadcrumb>
        <Divider />
        <C.WrapperPage>
          <UpdateUserForm initialValues={userToForm(userData)} />
        </C.WrapperPage>
      </div>
    )
  }

  return <ErrorFeedback />
}
