import ApiService from 'services/api.service'

import predicao from 'store/modules/predicao'

import { PREDICAO } from 'store/namespaces'
import {
  RESET_STATE, SET_CLASSE, SET_CORPO, SET_DATA, SET_ID, SET_IDENTIFICADOR,
  SET_MACRORREGIAO, SET_MATERIA, SET_ORGAO, SET_SUBORGAO, SET_TIPO
} from 'store/mutation.types'
import { FETCH_PREDICAO } from 'store/action.types'

function state () {
  return { }
}

const modules = {
  [PREDICAO]: predicao
}

const getters = {

  paramId (state, getters, rootState) {
    return rootState.route.params.id
  }

}

const actions = {

  async [FETCH_PREDICAO] ({ commit, getters }) {

    commit(`${PREDICAO}/${RESET_STATE}`)

    var response = await ApiService.get(`predicoes/${getters.paramId}`)
    if (response != null) {
      commit(`${PREDICAO}/${SET_CLASSE}`, { id: response.classe_id, nome: response.classe, ordem: response.classe_ordem })
      commit(`${PREDICAO}/${SET_CORPO}`, response.corpo)
      commit(`${PREDICAO}/${SET_DATA}`, response.data)
      commit(`${PREDICAO}/${SET_ID}`, response.id)
      commit(`${PREDICAO}/${SET_IDENTIFICADOR}`, response.identificador)
      commit(`${PREDICAO}/${SET_MACRORREGIAO}`, { id: response.macrorregiao_id, nome: response.macrorregiao })
      commit(`${PREDICAO}/${SET_MATERIA}`, response.materia)
      commit(`${PREDICAO}/${SET_ORGAO}`, response.orgao)
      commit(`${PREDICAO}/${SET_SUBORGAO}`, response.suborgao)
      commit(`${PREDICAO}/${SET_TIPO}`, response.tipo)
    }

  }
}

export default {
  namespaced: true,
  state,
  modules,
  getters,
  actions
}
