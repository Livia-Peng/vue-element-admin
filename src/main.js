import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
// import * as icons from '@element-plus/icons'  // element icon 全局导入
import './styles/index.scss' // 全局样式
import installIcons from './icons'

const app = createApp(App)
// Object.keys(icons).forEach((k) => app.component(k, icons[k]))
installElementPlus(app)
installIcons(app)
app.use(store).use(router).mount('#app')
