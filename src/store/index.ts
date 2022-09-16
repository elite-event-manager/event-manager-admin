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

import { rtkQueryErrorLogger } from 'middlewares/rtkQueryErrorLogger'
import { authAPI } from 'services/auth'
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

  // Services
  [authAPI.reducerPath]: authAPI.reducer,
  [usersAPI.reducerPath]: usersAPI.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authAPI.middleware, usersAPI.middleware, rtkQueryErrorLogger),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch
