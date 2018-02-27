<template>
  <v-container fluid grid-list-md v-if="isReady">
    <v-layout row wrap>
      <v-flex xs12>
        <v-card color="white">
          <v-toolbar color="blue-grey" dense card>
            <v-toolbar-title class="white--text">
              <v-tooltip top>
                <v-btn v-bind:href="linkToOriginal" target="_blank" @click="" slot="activator" class="mx-0" icon>
                  <v-icon color="white">link</v-icon>
                </v-btn>
                <span>Original</span>
              </v-tooltip>
              <v-tooltip top>
                <v-btn v-bind:to="linkToCrowdsourcer" @click="" slot="activator" class="ml-0" icon>
                  <v-icon color="white">edit</v-icon>
                </v-btn>
                <span>Corrigir</span>
              </v-tooltip>
              <span class="ml-4">{{ predicao.materia }}</span>
            </v-toolbar-title>
          </v-toolbar>
          <v-publicacao-viewer-header class="fluid" v-bind:publicacao="predicao"></v-publicacao-viewer-header>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-toolbar color="blue-grey" dense card>
            <v-toolbar-title class="white--text">CORPO DA PUBLICAÇÃO</v-toolbar-title>
          </v-toolbar>
          <v-publicacao-viewer-body v-bind:publicacao="predicao.corpo" highlight-monetary-value></v-publicacao-viewer-body>
        </v-card>
      </v-flex>
      <v-flex xs2>
        <v-card class="pa-1" v-bind:style="{backgroundColor: colors[predicao.classe_ordem]}" style="height:80px">
          <v-card-text class="white--text card-text btn__content">{{ predicao.classe }}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ApiService from 'common/api.service'
import ColorScheme from 'common/color.scheme'
import RegexCollection from 'common/regex.collection'

import VPublicacaoViewerHeader from 'components/VPublicacaoViewerHeader'
import VPublicacaoViewerBody from 'components/VPublicacaoViewerBody'

export default {
  name: 'Predicao',
  components: {
    VPublicacaoViewerHeader,
    VPublicacaoViewerBody
  },
  data () {
    return {
      colors: ColorScheme.classes,
      predicao: null
    };
  },
  created() {
    ApiService.get(`predicoes/${this.$route.params.id}`).then(predicao => this.predicao = predicao);
  },
  computed: {
    isReady () {
      return this.predicao !== null;
    },
    linkToOriginal () {
      return `http://ioes.dio.es.gov.br/apifront/portal/edicoes/publicacoes_ver_conteudo/${this.predicao.identificador}`
    },
    linkToCrowdsourcer () {
      return `/crowdsourcer/${this.predicao.id}`
    }
  }
}
</script>

<style scoped>

  .card-text {
    text-align: center;
    text-transform: uppercase;
    font-weight: 500;

    width: fit-content;
    white-space: normal;
  }

</style>
