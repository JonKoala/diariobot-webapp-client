import ApiService from 'services/api.service'

import { USER } from 'store/namespaces'
import { END_LOADING, RESET_STATE, SET_PASSWORD, SET_TOKEN, SET_USERNAME, START_LOADING } from 'store/mutation.types'
import { LOGIN, START_VIEW } from 'store/action.types'


function getInitialState () {
  return {
    isLoading: false,
    password: null,
    username: null
  }
}
const initialState = getInitialState()
const state = getInitialState

const getters = {

  isLoading (state) {
    return state.isLoading
  },
  password (state) {
    return state.password
  },
  username (state) {
    return state.username
  }

}

const mutations = {

  [END_LOADING] (state) {
    state.isLoading = false
  },
  [SET_PASSWORD] (state, password) {
    state.password = password
  },
  [SET_USERNAME] (state, username) {
    state.username = username
  },
  [START_LOADING] (state) {
    state.isLoading = true
  },
  [RESET_STATE] (state) {
    Object.keys(initialState).forEach(key => { state[key] = initialState[key] })
  }

}

const actions = {

  [START_VIEW] ({ commit }) {
    commit(RESET_STATE)
  },
  async [LOGIN] ({ commit, getters }) {

    commit(START_LOADING)
    try {
      var response = await ApiService.post('usuarios/login', { username: getters.username, password: getters.password })
      commit(`${USER}/${SET_TOKEN}`, response.data, { root: true })
    } catch (err) {
      throw err
    } finally {
      commit(END_LOADING)
    }

  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
