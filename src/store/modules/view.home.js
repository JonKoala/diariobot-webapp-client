import ApiService from 'services/api.service'

import query from 'store/modules/view.home.query'

import { QUERY } from 'store/namespaces'
import { END_LOADING, RESET_STATE, SET_ERROR, SET_PREDICOES, SET_TOTAL_ITEMS, START_LOADING } from 'store/mutation.types'
import { FETCH_PREDICOES } from 'store/action.types'


function getInitialState () {
  return {
    error: null,
    isLoading: false,
    predicoes: [],
    totalItems: null
  }
}
const state = getInitialState

const modules = {
  [QUERY]: query
}

const getters = {

  error (state) {
    return state.error
  },
  isLoading (state) {
    return state.isLoading
  },
  predicoes (state) {
    return state.predicoes
  },
  totalItems (state) {
    return state.totalItems
  },
  totalPages (state, getters) {
    return (state.totalItems > 0) ? Math.ceil(state.totalItems / getters[`${QUERY}/itemsPerPage`]) : 0
  }

}

const mutations = {

  [END_LOADING] (state) {
    state.isLoading = false
  },
  [SET_ERROR] (state, error) {
    state.error = error
  },
  [SET_PREDICOES] (state, predicoes) {
    state.predicoes = predicoes
  },
  [SET_TOTAL_ITEMS] (state, totalItems) {
    state.totalItems = totalItems
  },
  [START_LOADING] (state) {
    state.isLoading = true
  },
  [RESET_STATE] (state) {
    const initialState = getInitialState()
    Object.keys(initialState).forEach(key => { state[key] = initialState[key] })
  }

}

const actions = {

  async [FETCH_PREDICOES] ({ commit, getters }) {
    commit(START_LOADING)
    try {
      var response = await ApiService.get('predicoes/paginable', { params: getters[`${QUERY}/params`] })
      commit(RESET_STATE)
      commit(SET_PREDICOES, response.rows)
      commit(SET_TOTAL_ITEMS, response.count)
    } catch(err) {
      commit(RESET_STATE)
      commit(SET_ERROR, (err.response) ? err.response.data : err.message)
    } finally {
      commit(END_LOADING)
    }
  }

}

export default {
  namespaced: true,
  modules,
  state,
  getters,
  mutations,
  actions
}
