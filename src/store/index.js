import Vue from 'vue'
import Vuex from 'vuex'

import constants from 'store/modules/constants'
import home from 'store/modules/view.home'
import login from 'store/modules/view.login'
import { VIEW_HOME, VIEW_LOGIN } from 'store/namespaces'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    constants,
    [VIEW_HOME]: home,
    [VIEW_LOGIN]: login
  }
})
