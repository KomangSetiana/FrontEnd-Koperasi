import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './index.css'
import './axios'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Pagination from 'v-pagination-3'
import VueAwesomePaginate from 'vue-awesome-paginate'
import PrimeVue from 'primevue/config'
import 'vue-awesome-paginate/dist/style.css'
// Register the package

library.add(fas)

const app = createApp(App)
app.use(VueAwesomePaginate)
app.use(router)
app.use(axios)
app.use(VueSweetalert2)
app.use(PrimeVue, {
  unstyled: true
})
app.component('fa', FontAwesomeIcon)
// app.component('pagination', Pagination)
app.mount('#app')
