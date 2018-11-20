<template>
  <div v-resize:debounce="updateComponentHeight" style="height: 100%">
    <v-card color="white" class="scrollable-container elevation-10" v-bind:style="scrollableContainerStyle">
      <div class="scrollable-content" v-resize:debounce="updateScrollableContentHeight">
        <base-data-table class="fluid ma-0 pa-0"
          v-bind:lines="formattedPredicoes"
          v-bind:headers="headers"
          v-bind:isLoading="isLoading"
          v-on:input="updateSort">
          <template slot="items" slot-scope="props">
            <tr style="cursor:pointer">
              <td v-for="key in Object.keys(props.item).filter(key => key != 'classe')" class="text-xs-center">{{ props.item[key] }}</td>
              <td class="text-xs-center white--text" v-bind:style="{backgroundColor: colors[temaOrdemMapping[props.item.classe]]}">
                {{ props.item['classe'] }}
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
  </div>
</template>

<script>
import moment from 'moment'
import resize from 'vue-resize-directive'
import VueScrollTo from 'vue-scrollto'
import { mapGetters } from 'vuex'

import ColorScheme from 'services/color.scheme'

import { QUERY, VIEW_HOME } from 'store/namespaces'
import { SET_PAGE, SET_SORT_BY, SET_SORT_ORDER } from 'store/mutation.types'

import BaseDataTable from 'components/BaseDataTable'

export default {
  name: 'HomeResults',
  props: {
    bus: { type: Object }
  },
  directives: {
      resize
  },
  components: {
    BaseDataTable
  },
  data () {
    return {
      colors: ColorScheme.classes,
      headers: [
        { text: 'MATÉRIA', value: 'materia', align: 'center', width: '20%' },
        { text: 'TIPO', value: 'tipo', align: 'center',  width: '10%' },
        { text: 'ORGÃO', value: 'orgao', align: 'center', width: '15%' },
        { text: 'JURISDICIONADO', value: 'suborgao', align: 'center', width: '15%' },
        { text: 'MACRORREGIÃO', value: 'macrorregiao', align: 'center', width: '12%' },
        { text: 'DATA', value: 'data', align: 'center', width: '8%' },
        { text: 'VALOR (R$)', value: 'valor', align: 'center', width: '8%' },
        { text: 'TEMA', value: 'classe', align: 'center', width: '12%' }
      ],

      componentHeight: null,
      scrollableContentHeight: null
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
          materia: predicao.materia,
          tipo: predicao.tipo,
          orgao: predicao.orgao,
          suborgao: predicao.suborgao,
          macrorregiao: predicao.macrorregiao,
          data: moment.utc(predicao.data).format('DD/MM/YYYY'),
          valor: (predicao.valor) ? predicao.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL'}).substr(3) : null,
          classe: predicao.classe
        }
      })
    },
    isShowingPagination () {
      return this.totalPages > 1
    },
    page: {
      get () { return this.$store.getters[`${VIEW_HOME}/${QUERY}/page`] + 1 },
      set (value) {
        this.$store.commit(`${VIEW_HOME}/${QUERY}/${SET_PAGE}`, value - 1)
        this.$emit('page-change')
      }
    },
    scrollableContainerStyle () {
      if (this.scrollableContentHeight > this.componentHeight)
        return { height: '100%', overflowY: 'scroll' }
      return { height: `${this.scrollableContentHeight}px`, overflowY: 'hidden' }
    },
    temaOrdemMapping () {
      var dictionary = {}
      this.classes.forEach(entry => { dictionary[entry['nome']] = entry['ordem'] })
      return dictionary
    }
  },
  methods: {
    scrollToTop () {
      VueScrollTo.scrollTo('.scrollable-content', 500, { container: '.scrollable-container' })
    },
    updateComponentHeight (element) {
      this.componentHeight = element.clientHeight
    },
    updateScrollableContentHeight (element) {
      this.scrollableContentHeight = element.clientHeight
    },
    updateSort (sort) {
      this.$store.commit(`${VIEW_HOME}/${QUERY}/${SET_PAGE}`, 0)
      this.$store.commit(`${VIEW_HOME}/${QUERY}/${SET_SORT_BY}`, sort.sortBy)
      this.$store.commit(`${VIEW_HOME}/${QUERY}/${SET_SORT_ORDER}`, (sort.descending) ? 'DESC' : 'ASC')
      this.$emit('sort-change')
    }
  },
  mounted() {
    this.bus.$on('reset-results-scroll', this.scrollToTop)
  }
}
</script>
