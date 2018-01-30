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
          <td class="text-xs-right">{{ getValor(props.item.corpo) }}</td>
          <td class="text-xs-center white--text" v-bind:style="{backgroundColor: colors[props.item.classe_ordem]}">{{ props.item.classe }}</td>
        </tr>
      </template>
    </v-data-table>
    <v-dialog v-model="isShowingDetail" width="75vw" scrollable>
      <v-card>
        <v-toolbar color="blue-grey" height="48px" card>
          <v-toolbar-title class="white--text">
            <v-btn icon v-bind:href="linkToPredicao(detailed.id)" target="_blank" @click="" class="mt-1"><v-icon color="white">link</v-icon></v-btn>{{ detailed.materia }}
          </v-toolbar-title>
        </v-toolbar>
        <v-publicacao-viewer-body v-bind:publicacao="detailed.corpo"></v-publicacao-viewer-body>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import moment from 'moment'

import ApiService from '../common/api.service'
import ColorScheme from '../common/color.scheme'
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
    getValor(corpo) {
      var valores = corpo.match(/(?:[1-9]\d{0,2}(?:\.\d{3})*|0),\d{2}/i);
      return (valores) ? valores[0] : null;
    },
    linkToPredicao(id) {
      return `predicao/${id}`
    },
    showDetails(detailed) {
      this.detailed = detailed;

      // highlighting monetary values
      this.detailed.corpo = this.detailed.corpo.replace(/(?:[1-9]\d{0,2}(?:\.\d{3})*|0),\d{2}/g, function(match) {
        return '<b style="color:black;text-decoration:underline;">' + match + '</b>'
      });

      this.isShowingDetail = true;
    }
  }
}
</script>
