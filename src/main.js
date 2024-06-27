import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from '@/router/index'
import axios from 'axios'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')

import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faUser, faInfoCircle, faBars,
}
    from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUser, faInfoCircle, faBars,)

app.component('font-awesome-icon', FontAwesomeIcon)

axios.defaults.baseURL = 'http://10.164.58.18/employee-desk/public/api'
