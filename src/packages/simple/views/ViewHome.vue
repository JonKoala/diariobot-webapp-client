<template>
  <v-container fluid fill-height grid-list-md class="pt-0">
    <v-layout column>

      <v-flex>
        <v-expansion-panel v-model="isShowingFilters" expand class="elevation-0">
          <v-expansion-panel-content class="grey lighten-5">
            <home-filters v-on:input="filterChanged" class="fluid pa-0"></home-filters>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>

      <v-btn @click.stop="toggleFilter" flat fab small>
        <v-icon>{{ (isShowingFilters[0]) ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
      </v-btn>

      <v-flex xs12>
        <v-card ref="tableContainer" v-show="isShowingTable" color="white" class="scrollable-container elevation-10" v-bind:height="isShowingTableAlert ? 60 : '100%'">
          <div class="scrollable-content">
            <base-data-table class="fluid ma-0 pa-0"
            v-bind:lines="formattedPredicoes"
            v-bind:isLoading="isLoading"
            v-on:input="paginationChanged">
              <template slot="items" slot-scope="props">
                <tr style="cursor:pointer">
                  <td v-for="key in Object.keys(props.item).filter(key => key != 'tema')" class="text-xs-center">{{ props.item[key] }}</td>
                  <td class="text-xs-center white--text" v-bind:style="{backgroundColor: colors[temaOrdemMapping[props.item.tema]]}">
                    {{ props.item['tema'] }}
                  </td>
                </tr>
              </template>
            </base-data-table>
            <v-divider v-if="isShowingPagination"></v-divider>
            <div v-if="isShowingPagination" class="text-xs-center pt-3 pb-2">
              <v-pagination v-model="page" v-bind:length="totalPages" v-bind:total-visible="20"></v-pagination>
            </div>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'
import { mapGetters } from 'vuex'

import ColorScheme from 'services/color.scheme'

import { QUERY, VIEW_HOME } from 'store/namespaces'
import { SET_ITEMS_PER_PAGE, SET_PAGE, SET_SORT_BY, SET_SORT_ORDER } from 'store/mutation.types'
import { FETCH_PREDICOES } from 'store/action.types'

import BaseDataTable from 'components/BaseDataTable'
import HomeFilters from 'components/HomeFilters'
import PredicoesTableAdvanced from 'components/PredicoesTableAdvanced'

export default {
  name: 'ViewHome',
  components: {
    BaseDataTable,
    HomeFilters,
    PredicoesTableAdvanced
  },
  data () {
    return {
      colors: ColorScheme.classes,

      isShowingFilters: [true],
      isShowingTable: false
    }
  },
  computed: {
    ...mapGetters([
      'classes'
    ]),
    ...mapGetters(VIEW_HOME, [
      'isLoading',
      'predicoes',
      'totalItems',
      'totalPages'
    ]),
    formattedPredicoes () {
      return this.predicoes.map(predicao => {
        return {
          'matéria': predicao.materia,
          'tipo': predicao.tipo,
          'orgão': predicao.orgao,
          'jurisdicionado': predicao.suborgao,
          'macrorregiao': predicao.macrorregiao,
          'data': moment.utc(predicao.data).format('DD/MM/YYYY'),
          'valor': (predicao.valor) ? predicao.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL'}).substr(2) : null,
          'tema': predicao.classe
        }
      })
    },
    isShowingPagination () {
      return this.totalPages > 1
    },
    isShowingTableAlert () {
      return this.predicoes.length === 0
    },
    page: {
      get () { return this.$store.getters[`${VIEW_HOME}/${QUERY}/page`] + 1 },
      set (value) {
        this.$store.commit(`${VIEW_HOME}/${QUERY}/${SET_PAGE}`, value - 1)
        this.$store.dispatch(`${VIEW_HOME}/${FETCH_PREDICOES}`)
        this.scrollTableToTop()
      }
    },
    temaOrdemMapping () {
      var dictionary = {}
      this.classes.forEach(entry => { dictionary[entry['nome']] = entry['ordem'] })
      return dictionary
    }
  },
  methods: {
    filterChanged () {
      this.$store.commit(`${VIEW_HOME}/${QUERY}/${SET_PAGE}`, 0) // reset page
      this.$store.dispatch(`${VIEW_HOME}/${FETCH_PREDICOES}`)
      this.scrollTableToTop()
    },
    async paginationChanged (pagination) {
      this.$store.commit(`${VIEW_HOME}/${QUERY}/${SET_SORT_BY}`, pagination.sortBy)
      this.$store.commit(`${VIEW_HOME}/${QUERY}/${SET_SORT_ORDER}`, (pagination.descending) ? 'DESC' : 'ASC')

      await this.$store.dispatch(`${VIEW_HOME}/${FETCH_PREDICOES}`)
      this.isShowingTable = true
    },
    async scrollTableToTop () {
      await Vue.nextTick()
      this.$refs.tableContainer.$el.scrollTo(0, 0)
    },
    toggleFilter () {
      Vue.set(this.isShowingFilters, 0, !this.isShowingFilters[0])
    }
  }
}
</script>
