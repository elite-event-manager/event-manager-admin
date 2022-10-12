import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { appSlice } from './app'
import { profileSlice } from './profile'

import { sidebarSlice } from 'features/Sidebar/slice'
import { rtkQueryErrorLogger } from 'middlewares/rtkQueryErrorLogger'
import { authAPI } from 'services/auth'
import { dictionariesAPI } from 'services/dictionaries'
import { filesAPI } from 'services/files'
import { usersAPI } from 'services/users'

const persistConfig = {
  key: 'event-manager',
  storage,
  whitelist: [appSlice.name],
}

const rootReducer = combineReducers({
  // App slices
  [profileSlice.name]: profileSlice.reducer,
  [appSlice.name]: appSlice.reducer,

  // Feature slices
  [sidebarSlice.name]: sidebarSlice.reducer,

  // Services
  [authAPI.reducerPath]: authAPI.reducer,
  [usersAPI.reducerPath]: usersAPI.reducer,
  [dictionariesAPI.reducerPath]: dictionariesAPI.reducer,
  [filesAPI.reducerPath]: filesAPI.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authAPI.middleware,
      usersAPI.middleware,
      dictionariesAPI.middleware,
      filesAPI.middleware,
      rtkQueryErrorLogger,
    ),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch
