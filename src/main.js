import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_ROOT_API
//axios.defaults.baseURL = 'https://apidjackets.codewithstein.com'
//axios.defaults.baseURL = 'http://localhost:8000'
//axios.defaults.baseURL = 'https://bi-backend.azurewebsites.net'
console.log(axios.defaults.baseURL)
createApp(App).use(store).use(router, axios).mount('#app')
