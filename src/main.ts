import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import 'bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import { getCookie } from './services/CookieService'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://laravel-backend-exam.test/api'
axios.defaults.headers.common['Accepted'] = 'application/json'
axios.defaults.headers.common['Accept'] = 'application/json'
createApp(App).use(router, axios).mount('#app')
