import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { sidebarActions } from 'features/Sidebar/slice'
import { appActions } from 'store/app'
import { profileActions } from 'store/profile'

const actions = {
  ...appActions,
  ...profileActions,
  ...sidebarActions,
}

export const useActions = () => {
  const dispatch = useDispatch()

  return bindActionCreators(actions, dispatch)
}
