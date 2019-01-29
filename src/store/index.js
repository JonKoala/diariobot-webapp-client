import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'

import constants from 'store/modules/constants'
import user from 'store/modules/user'
import home from 'store/modules/view.home'
import login from 'store/modules/view.login'
import { USER } from 'store/namespaces'
import { VIEW_HOME, VIEW_LOGIN } from 'store/namespaces'


Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    constants,
    [USER]: user,
    [VIEW_HOME]: home,
    [VIEW_LOGIN]: login
  },

  plugins: [createPersistedState({
    paths: [USER],
    storage: {
      getItem: key => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value, { expires: 3 }),
      removeItem: key => Cookies.remove(key)
    },
    filter: ({ type }) => type.startsWith(`${USER}/`)
  })]

})
