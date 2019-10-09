import pick from 'lodash.pick'

import {
  RESET_STATE, SET_CLASSE, SET_CORPO, SET_DATA, SET_FONTE, SET_ID,
  SET_IDENTIFICADOR, SET_MATERIA, SET_ORGAO, SET_SUBORGAO, SET_TIPO, SET_VALOR
} from 'store/mutation.types'


function getInitialState () {
  return {
    corpo: null,
    data: null,
    fonte: null,
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
  fonte (state) {
    return state.fonte
  },
  id (state) {
    return state.id
  },
  identificador (state) {
    return state.identificador
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
    state.classe = pick(classe, ['id', 'nome', 'ordem'])
  },
  [SET_CORPO] (state, corpo) {
    state.corpo = corpo
  },
  [SET_DATA] (state, data) {
    state.data = data
  },
  [SET_FONTE] (state, fonte) {
    state.fonte = fonte
  },
  [SET_ID] (state, id) {
    state.id = id
  },
  [SET_IDENTIFICADOR] (state, identificador) {
    state.identificador = identificador
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
