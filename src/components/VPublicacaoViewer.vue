<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs6>
        <v-card class="pa-1" color="white">
          <v-publicacao-viewer-header v-bind:publicacao="publicacao"></v-publicacao-viewer-header>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <div class="content-block white blue-grey--text text--darken-3">
          <div class="centered">
            <pre v-html="publicacao.corpo"></pre>
          </div>
        </div>
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
