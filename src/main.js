import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createNotivue } from 'notivue'

import App from './App.vue'
import router from './router'

//Plugins
import vuetify from '@/plugins/vuetify'
import './plugins/vee-validate'
import 'notivue/notification.css' // Only needed if using built-in notifications
import 'notivue/animations.css' // Only needed if using built-in animations
import 'notivue/notification-progress.css'

const notivue = createNotivue({
  position: 'top-right',
  limit: 4,
  enqueue: true,
  avoidDuplicates: true,
  notifications: {
    global: {
      duration: 5000
    }
  }
})

const app = createApp(App)

app.use(notivue)
app.use(createPinia())
app.use(vuetify)
app.use(router)

app.mount('#app')
