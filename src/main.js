import 'leaflet/dist/leaflet.css'
import 'vuetify/styles'

import { createServer } from '~/mocks'
import { installPlugins } from '~/plugins'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

createServer()

installPlugins(app)

app.mount('#__vue')
