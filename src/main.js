import App from './App.vue'
import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueClipboard from 'vue-clipboard2'
import '@/assets/sass/app.scss'

// Register non resource located components
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)

const app = new Vue({
  el: '#app',
  render: h => h(App)
})
