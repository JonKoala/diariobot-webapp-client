import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import 'vuetify/src/stylus/app.styl'

import App from './App'
import router from './router'

Vue.use(Vuetify)

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
