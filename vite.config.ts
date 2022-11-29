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
          'primary-color': '#AB274F',
          'layout-header-background': '#2D2D2D',
          'layout-trigger-background': '#8B3550',
        },
        javascriptEnabled: true,
      },
    },
  },
})
