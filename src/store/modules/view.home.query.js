import moment from 'moment'

import {
  RESET_STATE, SET_CLASSE, SET_CORPO, SET_DATA_END, SET_DATA_START, SET_ITEMS_PER_PAGE, SET_MACRORREGIAO,
  SET_ORGAO, SET_PAGE, SET_SORT_BY, SET_SORT_ORDER, SET_SUBORGAO, SET_TIPO, SET_VALOR_MAX, SET_VALOR_MIN
} from 'store/mutation.types'

function getInitialState () {
  return {
    pagination: {
      itemsPerPage: 30,
      page: 0,
      sortBy: null,
      sortOrder: null
    },
    filter: {
      classe: null,
      corpo: null,
      dataEnd: null,
      dataStart: moment.utc().format('YYYY-MM-DD'),
      macrorregiao: null,
      orgao: null,
      suborgao: null,
      tipo: null,
      valorMax: null,
      valorMin: null
    }
  }
}
const state = getInitialState

const getters = {

  params (state, getters) {
    return {
      ...state.pagination,
      filterStartingDate: getters.dataStart,
      filterEndingDate: getters.dataEnd,
      filterMinValor: getters.valorMin,
      filterMaxValor: getters.valorMax,
      filterCorpo: getters.corpo,
      filterTipo: getters.tipo,
      filterOrgao: getters.orgao,
      filterSuborgao: getters.suborgao,
      filterMacrorregiao: getters.macrorregiao,
      filterClasse: getters.classe
    }
  },

  classe (state) {
    return state.filter.classe
  },
  corpo (state) {
    return state.filter.corpo
  },
  dataEnd (state) {
    return state.filter.dataEnd
  },
  dataStart (state) {
    return state.filter.dataStart
  },
  itemsPerPage (state) {
    return state.pagination.itemsPerPage
  },
  macrorregiao (state) {
    return state.filter.macrorregiao
  },
  orgao (state) {
    return state.filter.orgao
  },
  page (state) {
    return state.pagination.page
  },
  sortBy (state) {
    return state.pagination.sortBy
  },
  sortOrder (state) {
    return state.pagination.sortOrder
  },
  suborgao (state) {
    return state.filter.suborgao
  },
  tipo (state) {
    return state.filter.tipo
  },
  valorMax (state) {
    return state.filter.valorMax
  },
  valorMin (state) {
    return state.filter.valorMin
  }

}

const mutations = {

  [SET_CLASSE] (state, classe) {
    state.filter.classe = classe
  },
  [SET_CORPO] (state, corpo) {
    state.filter.corpo = corpo
  },
  [SET_DATA_END] (state, dataEnd) {
    state.filter.dataEnd = dataEnd
  },
  [SET_DATA_START] (state, dataStart) {
    state.filter.dataStart = dataStart
  },
  [SET_ITEMS_PER_PAGE] (state, itemsPerPage) {
    state.pagination.itemsPerPage = itemsPerPage
  },
  [SET_MACRORREGIAO] (state, macrorregiao) {
    state.filter.macrorregiao = macrorregiao
  },
  [SET_ORGAO] (state, orgao) {
    state.filter.orgao = orgao
  },
  [SET_PAGE] (state, page) {
    state.pagination.page = page
  },
  [SET_SORT_BY] (state, sortBy) {
    state.pagination.sortBy = sortBy
  },
  [SET_SORT_ORDER] (state, sortOrder) {
    state.pagination.sortOrder = sortOrder
  },
  [SET_SUBORGAO] (state, suborgao) {
    state.filter.suborgao = suborgao
  },
  [SET_TIPO] (state, tipo) {
    state.filter.tipo = tipo
  },
  [SET_VALOR_MAX] (state, valorMax) {
    state.filter.valorMax = valorMax
  },
  [SET_VALOR_MIN] (state, valorMin) {
    state.filter.valorMin = valorMin
  },
  [RESET_STATE] (state) {
    const initialState = getInitialState()
    Object.keys(initialState).forEach(key => { state[key] = initialState[key] })
  }

}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
