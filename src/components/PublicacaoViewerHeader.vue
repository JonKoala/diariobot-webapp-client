<template>
  <v-container>
    <v-layout row wrap class="grey--text text--darken-2">
      <v-flex xs12>
        <span class="mr-3">tipo: <span class="content">{{publicacao.tipo}}</span></span>
        <span class="mr-3">data: <span class="content">{{dataString}}</span></span>
        <span class="mr-3">orgão: <span class="content">{{publicacao.orgao}}</span></span>
        <span>subórgão: <span class="content">{{publicacao.suborgao}}</span></span>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from 'moment'

export default {
  name: 'PublicacaoViewerHeader',
  props: {
    publicacao: { type: Object, required: true }
  },
  computed: {
    dataString () {
      return (this.publicacao.data) ? moment.utc(this.publicacao.data).format('DD/MM/YYYY') : null;
    }
  }
}
</script>

<style scoped>

  span {
    white-space:nowrap;
  }

  .container {
    font-family: 'Roboto', 'Noto', sans-serif;
    text-transform: uppercase;
  }

  .content {
    font-weight: bold;
    text-decoration: underline;
  }

</style>
