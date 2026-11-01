import { createApp } from 'vue'

import JobiUI from 'jobi-ui'
import 'jobi-ui/style.css'
import './assets/styles/theme.css'

import App from './App.vue'

createApp(App).use(JobiUI).mount('#app')
