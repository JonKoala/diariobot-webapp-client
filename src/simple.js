import Vue from 'vue'
import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.css'

import Simple from './views/Simple'

Vue.use(Vuetify)

new Vue({
  el: '#app',
  template: '<Simple/>',
  components: { Simple }
})
