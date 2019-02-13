import _ from 'lodash/core'

import {
  RESET_STATE, SET_CLASSE, SET_CORPO, SET_DATA, SET_ID, SET_IDENTIFICADOR,
  SET_MACRORREGIAO, SET_MATERIA, SET_ORGAO, SET_SUBORGAO, SET_TIPO, SET_VALOR
} from 'store/mutation.types'


function getInitialState () {
  return {
    corpo: null,
    data: null,
    id: null,
    identificador: null,
    materia: null,
    orgao: null,
    suborgao: null,
    tipo: null,
    valor: null,
    classe: {
      id: null,
      nome: null,
      ordem: null
    },
    macrorregiao: {
      id: null,
      nome: null
    }
  }
}
const initialState = getInitialState()
const state = getInitialState

const getters = {

  classe (state) {
    return state.classe
  },
  corpo (state) {
    return state.corpo
  },
  data (state) {
    return state.data
  },
  id (state) {
    return state.id
  },
  identificador (state) {
    return state.identificador
  },
  macrorregiao (state) {
    return state.macrorregiao
  },
  materia (state) {
    return state.materia
  },
  orgao (state) {
    return state.orgao
  },
  suborgao (state) {
    return state.suborgao
  },
  tipo (state) {
    return state.tipo
  },
  valor (state) {
    return state.valor
  }

}

const mutations = {

  [SET_CLASSE] (state, classe) {
    state.classe = _.pick(classe, ['id', 'nome', 'ordem'])
  },
  [SET_CORPO] (state, corpo) {
    state.corpo = corpo
  },
  [SET_DATA] (state, data) {
    state.data = data
  },
  [SET_ID] (state, id) {
    state.id = id
  },
  [SET_IDENTIFICADOR] (state, identificador) {
    state.identificador = identificador
  },
  [SET_MACRORREGIAO] (state, macrorregiao) {
    state.macrorregiao = _.pick(macrorregiao, ['id', 'nome'])
  },
  [SET_MATERIA] (state, materia) {
    state.materia = materia
  },
  [SET_ORGAO] (state, orgao) {
    state.orgao = orgao
  },
  [SET_SUBORGAO] (state, suborgao) {
    state.suborgao = suborgao
  },
  [SET_TIPO] (state, tipo) {
    state.tipo = tipo
  },
  [SET_VALOR] (state, valor) {
    state.valor = valor
  },
  [RESET_STATE] (state) {
    Object.keys(initialState).forEach(key => { state[key] = initialState[key] })
  }

}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
