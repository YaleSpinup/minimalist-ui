import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue2'
import { getDirName } from './libs/utils.js'

// Getting the dirname of moduleA.js
const dirName = getDirName(import.meta.url)

export default defineConfig({
  resolve: {
    alias: {
      '@' : path.resolve(dirName, './src')
    },
  },
  plugins: [vue()]
})