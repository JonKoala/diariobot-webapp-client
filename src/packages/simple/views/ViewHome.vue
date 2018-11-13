<template>
  <v-container fluid fill-height grid-list-md class="pt-0">
    <v-layout column>
      <v-flex>
        <v-expansion-panel v-model="showingFilter" expand class="elevation-0">
          <v-expansion-panel-content class="grey lighten-5">
            <home-filters v-on:input="filterChanged" class="fluid pa-0"></home-filters>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
      <v-btn @click.stop="toggleFilter" flat fab small>
        <v-icon>{{ (showingFilter[0]) ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
      </v-btn>
      <v-flex xs12>
        <v-card color="white" class="scrollable-container elevation-10">
          <div class="scrollable-content">
            <predicoes-table-advanced class="fluid ma-0 pa-0" strip-internal-links
            v-bind:predicoes="formattedPredicoes"
            v-bind:totalItems="totalItems"
            v-bind:isLoading="isLoading"
            v-on:paginationChanged="paginationChanged">
            </predicoes-table-advanced>
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

import { QUERY, VIEW_HOME } from 'store/namespaces'
import { SET_ITEMS_PER_PAGE, SET_PAGE, SET_SORT_BY, SET_SORT_ORDER } from 'store/mutation.types'
import { FETCH_PREDICOES } from 'store/action.types'

import PredicoesTableAdvanced from 'components/PredicoesTableAdvanced'
import HomeFilters from '../components/HomeFilters'

export default {
  name: 'ViewHome',
  components: {
    PredicoesTableAdvanced,
    HomeFilters
  },
  data () {
    return {
      showingFilter: [true]
    }
  },
  computed: {
    ...mapGetters(VIEW_HOME, [
      'isLoading',
      'predicoes',
      'totalItems'
    ]),
    formattedPredicoes () {
      return this.predicoes.map(predicao => {
        return {
          ...predicao,
          formattedValor: (predicao.valor) ? predicao.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL'}).substr(2) : null,
          formattedData: moment.utc(predicao.data).format('DD/MM/YYYY')
        }
      })
    }
  },
  methods: {
    filterChanged () {
      this.$store.dispatch(`${VIEW_HOME}/${FETCH_PREDICOES}`)
    },
    paginationChanged (pagination) {
      this.$store.commit(`${VIEW_HOME}/${QUERY}/${SET_ITEMS_PER_PAGE}`, pagination.rowsPerPage)
      this.$store.commit(`${VIEW_HOME}/${QUERY}/${SET_PAGE}`, pagination.page - 1)
      this.$store.commit(`${VIEW_HOME}/${QUERY}/${SET_SORT_BY}`, pagination.sortBy)
      this.$store.commit(`${VIEW_HOME}/${QUERY}/${SET_SORT_ORDER}`, (pagination.descending) ? 'DESC' : 'ASC')
      this.$store.dispatch(`${VIEW_HOME}/${FETCH_PREDICOES}`)
    },
    toggleFilter () {
      Vue.set(this.showingFilter, 0, !this.showingFilter[0])
    }
  }
}
</script>
