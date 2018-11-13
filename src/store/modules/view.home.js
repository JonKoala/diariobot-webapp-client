import ApiService from 'services/api.service'

import query from 'store/modules/view.home.query'

import { QUERY } from 'store/namespaces'
import { END_LOADING, RESET_STATE, SET_PREDICOES, SET_TOTAL_ITEMS, START_LOADING } from 'store/mutation.types'
import { FETCH_PREDICOES } from 'store/action.types'


function getInitialState () {
  return {
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

  isLoading (state) {
    return state.isLoading
  },
  predicoes (state) {
    return state.predicoes
  },
  totalItems (state) {
    return state.totalItems
  }

}

const mutations = {

  [END_LOADING] (state) {
    state.isLoading = false
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
      var response = await ApiService.get('predicoes/paginable', {params: getters[`${QUERY}/params`]})
      commit(RESET_STATE)
      commit(SET_PREDICOES, response.rows)
      commit(SET_TOTAL_ITEMS, response.count)
    } catch(err) {
      throw err
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
