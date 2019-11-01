<template>
  <div v-resize:debounce="updateComponentHeight" style="height: 100%">

    <v-card class="scrollable-container elevation-10" v-bind:style="scrollableContainerStyle">
      <div class="scrollable-content" v-resize:debounce="updateScrollableContentHeight">
        <base-data-table class="fluid ma-0 pa-0"
          v-bind:error="error"
          v-bind:lines="predicoes"
          v-bind:headers="headers"
          v-bind:isLoading="isLoading"
          v-on:input="updateSort">
          <template slot="items" slot-scope="props">
            <tr v-on:click="selectPredicao(props.item)" style="cursor:pointer">
              <td v-for="key in Object.keys(props.item).filter(key => !key.startsWith('_'))" class="text-xs-center">{{ props.item[key] }}</td>
              <td class="text-xs-center white--text" v-bind:style="{backgroundColor: colors[temaOrdemMapping[props.item._classe]]}">
                {{ props.item._classe }}
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

    <v-dialog v-model="isShowingSelectedPredicao" width="75vw" scrollable>
      <v-card>
        <v-toolbar color="blue-grey" dense card>
          <v-toolbar-title class="white--text">
            <base-icon-button v-bind:to="selectedPredicao.linkToDetails" tooltip="Detalhes" top color="white">details</base-icon-button>
            <span class="ml-4" v-bind:title="selectedPredicao.materia">{{ selectedPredicao.materia }}</span>
          </v-toolbar-title>
        </v-toolbar>
        <base-scrollable-text v-bind:text="(isShowingSelectedPredicao) ? selectedPredicao.formattedCorpo : ''"></base-scrollable-text>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import moment from 'moment'
import resize from 'vue-resize-directive'
import VueScrollTo from 'vue-scrollto'
import { mapGetters } from 'vuex'

import ColorScheme from 'services/color.scheme'
import PublicacaoFonteSchema from 'services/publicacao.fonte.schema'
import RegexCollection from 'services/regex.collection'

import { QUERY, VIEW_HOME } from 'store/namespaces'
import { SET_PAGE, SET_SORT_BY, SET_SORT_ORDER } from 'store/mutation.types'

import BaseDataTable from 'components/BaseDataTable'
import BaseIconButton from 'components/BaseIconButton'
import BaseScrollableText from 'components/BaseScrollableText'

export default {
  name: 'HomeResults',
  props: {
    bus: { type: Object }
  },
  directives: {
      resize
  },
  components: {
    BaseDataTable,
    BaseIconButton,
    BaseScrollableText
  },
  data () {
    return {
      colors: ColorScheme.classes,
      headers: [
        { text: 'MATÉRIA', value: 'materia', align: 'center', width: '20%' },
        { text: 'TIPO', value: 'tipo', align: 'center',  width: '10%' },
        { text: 'ORGÃO', value: 'orgao', align: 'center', width: '15%' },
        { text: 'JURISDICIONADO', value: 'suborgao', align: 'center', width: '15%' },
        { text: 'DATA', value: 'data', align: 'center', width: '8%' },
        { text: 'VALOR (R$)', value: 'valor', align: 'center', width: '8%' },
        { text: 'FONTE', value: 'fonte', align: 'center', width: '12%' },
        { text: 'TEMA', value: 'classe', align: 'center', width: '12%' }
      ],

      componentHeight: null,
      scrollableContentHeight: null,

      isShowingSelectedPredicao: false,
      selectedPredicao: {}
    }
  },
  computed: {
    ...mapGetters([
      'classes'
    ]),
    ...mapGetters(VIEW_HOME, [
      'isLoading',
      'totalItems',
      'totalPages'
    ]),
    error () {
      if (this.$store.getters[`${VIEW_HOME}/error`]) {
        var err = 'Ocorreu um erro ao realizar a busca: ' + this.$store.getters[`${VIEW_HOME}/error`]
        err = (err.includes('Timeout')) ? 'A busca excedeu o tempo limite. Tente manter as datas inicial e final em um intervalo de até 3 meses.' : err

        return err
      }
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
    predicoes () {
      return this.$store.getters[`${VIEW_HOME}/predicoes`].map(predicao => {
        return {
          _classe: predicao.classe,
          _corpo: predicao.corpo,
          _id: predicao.id,

          materia: predicao.materia,
          tipo: predicao.tipo,
          orgao: predicao.orgao,
          suborgao: predicao.suborgao,
          data: moment.utc(predicao.data).format('DD/MM/YYYY'),
          valor: (predicao.valor) ? predicao.valor.toLocaleString('pt-br', { minimumFractionDigits: 2 }) : null,
          fonte: PublicacaoFonteSchema[predicao.fonte]
        }
      })
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
    selectPredicao (predicao) {
      this.isShowingSelectedPredicao = true
      this.selectedPredicao = {
        ...predicao,
        linkToDetails: `/predicao/${predicao._id}`,
        formattedCorpo: predicao._corpo.replace(RegexCollection.monetaryGlobal, (match) => { return '<span class="highlighted">' + match + '</span>' })
      }
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

<style scoped>

  .content-block >>> .highlighted {
    color: black;
    font-weight: 700;
    text-decoration: underline;
  }

</style>
