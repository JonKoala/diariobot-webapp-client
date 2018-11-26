import query from 'store/modules/view.home.query'
import request from 'store/modules/request'

import { QUERY, REQUEST } from 'store/namespaces'
import { RESET_STATE, SET_ERROR, SET_PREDICOES, SET_TOTAL_ITEMS } from 'store/mutation.types'
import { FETCH_PREDICOES, MAKE_REQUEST } from 'store/action.types'


function getInitialState () {
  return {
    error: null,
    predicoes: [],
    totalItems: null
  }
}
const initialState = getInitialState()
const state = getInitialState

const modules = {
  [QUERY]: query,
  [REQUEST]: request
}

const getters = {

  error (state) {
    return state.error
  },
  isLoading (state, getters) {
    return getters[`${REQUEST}/isLoading`]
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

  [SET_ERROR] (state, error) {
    state.error = error
  },
  [SET_PREDICOES] (state, predicoes) {
    state.predicoes = predicoes
  },
  [SET_TOTAL_ITEMS] (state, totalItems) {
    state.totalItems = totalItems
  },
  [RESET_STATE] (state) {
    Object.keys(initialState).forEach(key => { state[key] = initialState[key] })
  }

}

const actions = {

  async [FETCH_PREDICOES] ({ commit, dispatch, getters }) {

    try {
      var response = await dispatch(`${REQUEST}/${MAKE_REQUEST}`, { service: 'predicoes/paginable', config: { params: getters[`${QUERY}/params`] } })
      if (response != null) {
        commit(RESET_STATE)
        commit(SET_PREDICOES, response.rows)
        commit(SET_TOTAL_ITEMS, response.count)
      }
    } catch (err) {
      commit(RESET_STATE)
      commit(SET_ERROR, (err.response) ? err.response.data : err.message)
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
