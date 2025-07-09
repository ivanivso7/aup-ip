import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './vuetify'
import router from './router'
import Toast from 'vue-toastification'
import '@mdi/font/css/materialdesignicons.css'

import 'vue-toastification/dist/index.css'

const app = createApp(App)

app.use(vuetify)
app.use(router)
app.use(Toast)

app.mount('#app')
