import Vue from 'vue'
import Vuex from 'vuex'

import constants from 'store/modules/constants'
import home from 'store/modules/view.home'
import { VIEW_HOME } from 'store/namespaces'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    constants,
    [VIEW_HOME]: home
  }
})
