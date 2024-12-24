import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import './assets/styles/main.css'

const app = createApp(App)

// 先初始化基础插件
app.use(createPinia())
app.use(router)
app.use(ElementPlus)

// 延迟注册图标
setTimeout(() => {
  try {
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  } catch (error) {
    console.error('Failed to register icons:', error)
  }
}, 0)

// 挂载应用
app.mount('#app')
