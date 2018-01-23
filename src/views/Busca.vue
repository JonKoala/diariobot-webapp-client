<template>
    <v-container fluid grid-list-md class="mt-0">
      <v-card class="pa-1" color="white">
        <v-layout row justify-end class="pb-4">
          <v-flex xs4>
            <v-text-field append-icon="search" label="Busca" single-line hide-details v-model="search"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-data-table v-if="publicacoes.length > 0" v-bind:items="publicacoes" v-bind:headers="headers" v-bind:search="search" hide-actions>
            <template slot="items" slot-scope="props">
              <tr @click="showDetails(props.item)">
                <td class="text-xs-right">{{ props.item.materia }}</td>
                <td class="text-xs-right">{{ props.item.tipo }}</td>
                <td class="text-xs-right">{{ props.item.categoria }}</td>
                <td class="text-xs-right">{{ props.item.orgao }}</td>
                <td class="text-xs-right">{{ props.item.suborgao }}</td>
                <td class="text-xs-right">{{ props.item.valor }}</td>
                <td class="text-xs-center white--text" v-bind:style="{backgroundColor: colors[props.item.predicao.classe.ordem]}">{{ props.item.predicao.classe.nome }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-layout>
      </v-card>
      <v-dialog v-model="isShowingDetail" width="1235px" scrollable>
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
  name: 'Busca',
  components: {
    VPublicacaoViewerBody
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
        {text: 'VALOR', value: 'predicao.valor'},
        {text: 'PREDIÇÃO', value: 'predicao.classe.nome'}
      ],
      search: null,
      publicacoes: [],
      isShowingDetail: false,
      detailed: {}
    };
  },
  mounted () {
    ApiService.get('predicoes', {params: {data: moment().format('YYYY-MM-DD')}}).then(publicacoes => {

      publicacoes.forEach(publicacao => {
        publicacao.valor = publicacao.corpo.match(/(?:[1-9]\d{0,2}(?:\.\d{3})*|0),\d{2}/i);
        publicacao.valor = (publicacao.valor) ? publicacao.valor[0] : null;
      });

      this.publicacoes = publicacoes;
    });
  },
  methods: {
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
