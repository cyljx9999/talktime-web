import {fileURLToPath, URL} from 'node:url'
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
export default defineConfig({
  plugins: [vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: "icon-[dir]-[name]"
    })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue','scss']
  },
  css:{
    preprocessorOptions:{
      scss:{
        javascriptEnabled:true,
        additionalData:'@import "./src/assets/style/variable.scss"; @import "./src/assets/style/global.scss";',
      }
    }
  }
})
