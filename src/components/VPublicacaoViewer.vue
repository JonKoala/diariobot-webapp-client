<template>
  <div>
    <v-publicacao-viewer-header v-bind:publicacao="publicacao"></v-publicacao-viewer-header>
    <p class="materia-line"><a v-bind:href="publicacaoLink" target="_blank">{{publicacao.materia}}</a></p>
    <div class="content-block">
      <div class="centered">
        <pre v-html="publicacao.corpo"></pre>
      </div>
    </div>
  </div>
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
  color: #455a64;
  line-height: 18px;
  white-space: pre-wrap;
}

.materia-line {
  margin-top: 30px;
  margin-bottom: 0px;

  font-family: 'Roboto', 'Noto', sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  line-height: 20px;
}

.content-block {
  height: 300px;
  width: 100%;
  overflow: auto;

  border-radius: 10px;
  background-color: #eff0f1;
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
