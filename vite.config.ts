import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [tsconfigPaths(), react(), svgr({ exportAsDefault: true })],
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#51258f',
          'layout-header-background': '#1a1325',
          'layout-trigger-background': '#24163a',
        },
        javascriptEnabled: true,
      },
    },
  },
})
