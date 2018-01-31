<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-toolbar color="blue-grey" dense card>
          <v-toolbar-title class="white--text">
            <v-btn icon v-bind:href="publicacaoLink" target="_blank" @click="" class="mt-1"><v-icon color="white">link</v-icon></v-btn>{{ publicacao.materia }}
          </v-toolbar-title>
        </v-toolbar>
        <v-card class="pa-1" color="white">
          <v-publicacao-viewer-header v-bind:publicacao="publicacao"></v-publicacao-viewer-header>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-toolbar color="blue-grey" dense card>
          <v-toolbar-title class="white--text">CORPO DA PUBLICAÇÃO</v-toolbar-title>
        </v-toolbar>
        <v-card>
          <v-publicacao-viewer-body v-bind:publicacao="publicacao.corpo" v-bind:highlight-monetary-value="highlightMonetaryValue"></v-publicacao-viewer-body>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from 'moment'

import VPublicacaoViewerHeader from './VPublicacaoViewerHeader'
import VPublicacaoViewerBody from './VPublicacaoViewerBody'

export default {
  name: 'VPublicacaoViewer',
  components: {
    VPublicacaoViewerHeader,
    VPublicacaoViewerBody
  },
  props: {
    publicacao: { type: Object, required: true },
    highlightMonetaryValue: { type: Boolean }
  },
  computed: {
    publicacaoLink () {
      return `http://ioes.dio.es.gov.br/apifront/portal/edicoes/publicacoes_ver_conteudo/${this.publicacao.identificador}`
    }
  }
}
</script>
