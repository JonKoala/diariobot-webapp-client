import Vue from 'vue'
import Vuex from 'vuex'

import constants from 'store/modules/constants'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    constants
  }
})
