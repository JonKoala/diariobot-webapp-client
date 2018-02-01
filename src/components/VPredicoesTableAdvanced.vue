<template>
  <v-container fluid grid-list-md class="pa-0">
    <v-data-table
      v-bind:items="predicoes"
      v-bind:headers="headers"
      v-bind:pagination.sync="pagination"
      v-bind:loading="isLoading"
      v-bind:total-items="totalItems"
      v-bind:rows-per-page-items="itemsPerPageOptions"
      v-bind:rows-per-page-text="'Linhas por página'">
      <template slot="items" slot-scope="props">
        <tr @click="showDetails(props.item)">
          <td class="text-xs-right">{{ props.item.materia }}</td>
          <td class="text-xs-right">{{ props.item.tipo }}</td>
          <td class="text-xs-right">{{ props.item.categoria }}</td>
          <td class="text-xs-right">{{ props.item.orgao }}</td>
          <td class="text-xs-right">{{ props.item.suborgao }}</td>
          <td class="text-xs-right">{{ props.item.formattedData }}</td>
          <td class="text-xs-right">{{ props.item.formattedValor }}</td>
          <td class="text-xs-center white--text" v-bind:style="{backgroundColor: colors[props.item.classe_ordem]}">{{ props.item.classe }}</td>
        </tr>
      </template>
    </v-data-table>
    <v-dialog v-model="isShowingDetail" width="75vw" scrollable>
      <v-card>
        <v-toolbar color="blue-grey" dense card>
          <v-toolbar-title class="white--text">
            <v-tooltip top>
              <v-btn v-bind:href="linkToPredicao(detailed.id)" target="_blank" @click="" slot="activator" class="mx-0" icon>
                <v-icon color="white">link</v-icon>
              </v-btn>
              <span>Detalhes</span>
            </v-tooltip>
            <v-tooltip top>
              <v-btn v-bind:href="linkToCrowdsourcer(detailed.id)" target="_blank" @click="" slot="activator" class="ml-0" icon>
                <v-icon color="white">edit</v-icon>
              </v-btn>
              <span>Corrigir</span>
            </v-tooltip>
            <span class="ml-4">{{ detailed.materia }}</span>
          </v-toolbar-title>
        </v-toolbar>
        <v-publicacao-viewer-body v-bind:publicacao="detailed.corpo" highlight-monetary-value></v-publicacao-viewer-body>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import moment from 'moment'

import ApiService from '../common/api.service'
import ColorScheme from '../common/color.scheme'
import RegexCollection from '../common/regex.collection'
import VPublicacaoViewerBody from '../components/VPublicacaoViewerBody'

export default {
  name: 'VPredicoesTableAdvanced',
  components: {
    VPublicacaoViewerBody
  },
  props: {
    predicoes: { type: Array, required: true },
    totalItems: { type: Number },
    isLoading: { type: Boolean }
  },
  data () {
    return {
      colors: ColorScheme.classes,
      headers: [
        {text: 'MATÉRIA', value: 'materia'},
        {text: 'TIPO', value: 'tipo'},
        {text: 'CATEGORIA', value: 'categoria'},
        {text: 'ORGÃO', value: 'orgao'},
        {text: 'SUBÓRGÃO/JURISDICIONADO', value: 'suborgao'},
        {text: 'DATA', value: 'data'},
        {text: 'VALOR', value: 'valor'},
        {text: 'PREDIÇÃO', value: 'classe'}
      ],
      isShowingDetail: false,
      detailed: {},

      itemsPerPageOptions: [30, 50, 80],
      page: 0,
      pagination: {}
    };
  },
  methods: {
    linkToPredicao(id) {
      return `predicao/${id}`
    },
    linkToCrowdsourcer(id) {
      return `crowdsourcer/${id}`
    },
    showDetails(detailed) {
      this.detailed = detailed;
      this.isShowingDetail = true;
    }
  },
  watch: {
    pagination: {
      handler () {
        this.$emit('paginationChanged', this.pagination);
      },
      deep: true
    }
  }
}
</script>
