<template>
    <publicacao-viewer v-bind:publicacao="publicacao"></publicacao-viewer>
</template>

<script>
import ApiService from '../common/api.service'
import PublicacaoViewer from '../components/PublicacaoViewer'

export default {
  name: 'TheClassifier',
  components: {PublicacaoViewer},
  data () {
    return {
      publicacao: {}
    }
  },
  mounted() {
    ApiService.get(`publicacoes/${this.$route.params.id}`).then(publicacao => {
      this.publicacao = publicacao;
    });
  }
}
</script>
