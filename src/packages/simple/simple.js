import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import 'vuetify/src/stylus/app.styl'

import App from './App'

Vue.use(Vuetify)

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
