<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-toolbar color="pink" height="48px" card>
          <v-toolbar-title class="white--text">
            <v-btn icon v-bind:href="publicacaoLink" target="_blank" @click="" class="mt-1"><v-icon color="white">link</v-icon></v-btn>{{ publicacao.materia }}
          </v-toolbar-title>
        </v-toolbar>
        <v-card class="pa-1" color="white">
          <v-publicacao-viewer-header v-bind:publicacao="publicacao"></v-publicacao-viewer-header>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-toolbar color="pink" height="48px" card>
            <v-toolbar-title class="white--text">CORPO DA PUBLICAÇÃO</v-toolbar-title>
          </v-toolbar>
          <div class="content-block white blue-grey--text text--darken-3">
            <div class="centered">
              <pre v-html="publicacao.corpo"></pre>
            </div>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from 'moment'

import VPublicacaoViewerHeader from './VPublicacaoViewerHeader'

export default {
  name: 'VPublicacaoViewer',
  components: {
    VPublicacaoViewerHeader
  },
  props: {
    publicacao: { type: Object, required: true }
  },
  computed: {
    publicacaoLink () {
      return `http://ioes.dio.es.gov.br/apifront/portal/edicoes/publicacoes_ver_conteudo/${this.publicacao.identificador}`
    }
  }
}
</script>

<style scoped>

  pre {
    margin: unset;
    padding: 10px;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: justify;
    line-height: 18px;
    white-space: pre-wrap;
  }

  .content-block {
    height: 300px;
    width: 100%;
    overflow: auto;

    border-radius: 2px;
  }

  .content-block:before {
    content: '';

    height: 100%;
    display: inline-block;
    vertical-align: middle;
  }

  .centered {
    display: inline-block;
    vertical-align: middle;
  }

</style>
