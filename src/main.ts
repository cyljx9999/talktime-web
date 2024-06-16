import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import App from './App.vue'
// 自定义全局注册组件 插件
import globalComponent from '@/components'
import router from './router'
import store from "@/stores";



const app = createApp(App)

//全局注册图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(store)
app.use(router)
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(globalComponent)
app.mount('#app')
