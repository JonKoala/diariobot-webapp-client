import axios from 'axios'

import ApiService from 'services/api.service'

import { CANCEL_REQUEST, CREATE_CANCEL_TOKEN, END_LOADING, START_LOADING } from 'store/mutation.types'
import { MAKE_REQUEST } from 'store/action.types'


function getInitialState () {
  return {
    cancelToken: axios.CancelToken.source(),
    isLoading: false
  }
}
const initialState = getInitialState()
const state = getInitialState

const getters = {

  cancelToken (state) {
    return state.cancelToken
  },
  isLoading (state) {
    return state.isLoading
  }

}

const mutations = {

  [CANCEL_REQUEST] (state) {
    state.cancelToken.cancel()
  },
  [CREATE_CANCEL_TOKEN] (state) {
    state.cancelToken = axios.CancelToken.source()
  },
  [END_LOADING] (state) {
    state.isLoading = false
  },
  [START_LOADING] (state) {
    state.isLoading = true
  }

}

const actions = {

  [MAKE_REQUEST] ({ commit, getters }, { service, config = {} }) {
    commit(CANCEL_REQUEST)
    commit(CREATE_CANCEL_TOKEN)

    commit(START_LOADING)
    return new Promise((resolve, reject) => {
      ApiService.get(service, { ...config, cancelToken: getters.cancelToken.token })
      .then(response => {
        commit(END_LOADING)
        resolve(response)
      }).catch(err => {
        if (err instanceof axios.Cancel) {
          // not an error, another request was made before this one ended
          resolve()
        } else {
          commit(END_LOADING)
          reject(err)
        }
      })
    })
  }

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
