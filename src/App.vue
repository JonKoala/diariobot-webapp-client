<template>
  <div id="app">
      <publicacao-viewer v-bind:publicacao="publicacao"></publicacao-viewer>
  </div>
</template>

<script>
import ApiService from './common/api.service'
import PublicacaoViewer from './components/publicacaoViewer'

export default {
  name: 'app',
  components: {PublicacaoViewer},
  data () {
    return {
      publicacao: {}
    }
  },
  mounted() {
    ApiService.get('publicacoes/rand').then(publicacao => {
      this.publicacao = publicacao;
    });
  }
}
</script>

<style>
#app {
  margin: 10px;
}
</style>
