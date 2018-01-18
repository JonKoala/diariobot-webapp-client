<template>
  <div id="container">
    <div v-for="publicacao in publicacoes">
      <div class="entry">
        <v-publicacao-viewer-header v-bind:publicacao="publicacao"></v-publicacao-viewer-header>
        <p class="materia-line"><a v-bind:href="'/predicao/' + publicacao.id" target="_blank">{{publicacao.materia}}</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

import ApiService from '../common/api.service'
import VPublicacaoViewerHeader from '../components/VPublicacaoViewerHeader'

export default {
  name: 'ViewBusca',
  components: {
    VPublicacaoViewerHeader
  },
  data () {
    return {
      publicacoes: []
    };
  },
  mounted () {
    ApiService.get('predicoes', {params: {data: moment().format('YYYY-MM-DD')}}).then(publicacoes => {
      this.publicacoes = publicacoes;
    });
  }
}
</script>

<style scoped>

  #container {
    display: flex;
    flex-direction: column;
  }

  .entry {
    padding: 0px 10px;
    margin-bottom: 20px;
    border-style: solid;
    border-color: #757575;
    display: inline-block;
  }

  .materia-line {
    font-family: 'Roboto', 'Noto', sans-serif;
    font-weight: bold;
    text-transform: uppercase;
  }

</style>
