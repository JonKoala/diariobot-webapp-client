<template>
  <v-container fluid grid-list-md class="py-0">
    <v-data-table v-bind:items="predicoes" v-bind:headers="headers" v-bind:search="search" hide-actions>
      <template slot="items" slot-scope="props">
        <tr @click="showDetails(props.item)">
          <td class="text-xs-right">{{ props.item.materia }}</td>
          <td class="text-xs-right">{{ props.item.tipo }}</td>
          <td class="text-xs-right">{{ props.item.categoria }}</td>
          <td class="text-xs-right">{{ props.item.orgao }}</td>
          <td class="text-xs-right">{{ props.item.suborgao }}</td>
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
                <v-icon color="white">developer_board</v-icon>
              </v-btn>
              <span>Predição</span>
            </v-tooltip>
            <v-tooltip top>
              <v-btn v-bind:href="linkToCrowdsourcer(detailed.id)" target="_blank" @click="" slot="activator" class="ml-0" icon>
                <v-icon color="white">edit</v-icon>
              </v-btn>
              <span>Corrigir</span>
            </v-tooltip>
            <span class="ml-4" v-bind:title="detailed.materia">{{ detailed.materia }}</span>
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
import VPublicacaoViewerBody from './VPublicacaoViewerBody'

export default {
  name: 'VPredicoesTable',
  components: {
    VPublicacaoViewerBody
  },
  props: {
    predicoes: { type: Array, required: true },
    search: { type: String }
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
        {text: 'VALOR', value: 'valor'},
        {text: 'PREDIÇÃO', value: 'classe'}
      ],
      isShowingDetail: false,
      detailed: {}
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
  }
}
</script>
