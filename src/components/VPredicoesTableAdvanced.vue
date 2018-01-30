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
          <td class="text-xs-right">{{ getValor(props.item.corpo) }}</td>
          <td class="text-xs-center white--text" v-bind:style="{backgroundColor: colors[props.item.classe_ordem]}">{{ props.item.classe }}</td>
        </tr>
      </template>
    </v-data-table>
    <v-dialog v-model="isShowingDetail" width="75vw" scrollable>
      <v-card>
        <v-toolbar color="pink" height="48px" card>
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
  computed: {
    formattedDate () {
      return moment.utc(this.date).format('DD/MM/YYYY')
    }
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
