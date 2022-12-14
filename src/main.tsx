import { ConfigProvider } from 'antd'
import ruRU from 'antd/es/locale/ru_RU'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'

import { App } from 'App'
import { persistor, store } from 'store'
import { GlobalStyles } from 'styles/global'
import { theme } from 'styles/theme'

import 'antd/dist/antd.less'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConfigProvider locale={ruRU}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
            <GlobalStyles />
          </BrowserRouter>
        </ThemeProvider>
      </ConfigProvider>
    </PersistGate>
  </Provider>,
)
