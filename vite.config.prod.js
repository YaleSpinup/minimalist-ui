// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@' : resolve(__dirname, './src')
    },
  },
  plugins: [vue()],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/module.js'),
      name: 'Minimalist',
      // the proper extensions will be added
      fileName: 'index',
    }
  }
})