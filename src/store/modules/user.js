import jwtDecode from 'jwt-decode'

import { SET_TOKEN } from 'store/mutation.types'


function getInitialState () {
  return {
    token: null
  }
}
const state = getInitialState

const getters = {

  payload (state) {
    return (state.token) ? jwtDecode(state.token) : {}
  },
  email (state, getters) {
    return getters.payload.email
  },
  fullName (state, getters) {
    return getters.payload.fullName
  },
  name (state, getters) {
    return getters.payload.name
  },
  username (state, getters) {
    return getters.payload.username
  }

}

const mutations = {

  [SET_TOKEN] (state, token) {
    state.token = token
  }

}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
