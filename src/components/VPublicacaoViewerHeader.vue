<template>
  <v-container class="container" fluid grid-list>
    <v-layout row wrap class="grey--text text--darken-2">
      <v-flex xs12>
        <a v-bind:href="publicacaoLink" target="_blank">{{publicacao.materia}}</a>
      </v-flex>
      <v-flex xs12>
        <span>tipo: <span class="content-text">{{publicacao.tipo}}</span></span>
        <span>data: <span class="content-text">{{dataString}}</span></span>
      </v-flex>
      <v-flex xs12>
        <span>orgão: <span class="content-text">{{publicacao.orgao}}</span></span>
      </v-flex>
      <v-flex xs12>
        <span>subórgão: <span class="content-text">{{publicacao.suborgao}}</span></span>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from 'moment'

export default {
  name: 'VPublicacaoViewerHeader',
  props: {
    publicacao: { type: Object, required: true }
  },
  computed: {
    dataString () {
      return (this.publicacao.data) ? moment(this.publicacao.data).format('DD/MM/YYYY') : null;
    },
    publicacaoLink () {
      return `http://ioes.dio.es.gov.br/apifront/portal/edicoes/publicacoes_ver_conteudo/${this.publicacao.identificador}`
    }
  }
}
</script>

<style scoped>

a {
  font-weight: bold;
}

.container {
  font-family: 'Roboto', 'Noto', sans-serif;
  text-transform: uppercase;
}

.content-text {
  font-weight: bold;
  text-decoration: underline;
  margin-right: 20px
}

</style>
