<template>
  <div>
    <v-publicacao-viewer v-if="isReady" v-bind:publicacao="publicacao"></v-publicacao-viewer>
    <p v-if="isReady">
      classe: <span>{{publicacao.predicao.classe.nome}}</span>
    </p>
  </div>
</template>

<script>
import ApiService from '../common/api.service'
import VPublicacaoViewer from '../components/VPublicacaoViewer'

export default {
  name: 'ViewPredicao',
  components: {
    VPublicacaoViewer
  },
  data () {
    return {
      publicacao: null
    };
  },
  mounted() {
    ApiService.get(`predicoes/${this.$route.params.id}`).then(publicacao => {

      // highlighting monetary values
      publicacao.corpo = publicacao.corpo.replace(/(?:[1-9]\d{0,2}(?:\.\d{3})*|0),\d{2}/g, function(match) {
        return '<b style="color:black;text-decoration:underline;">' + match + '</b>'
      });

      this.publicacao = publicacao;
    });
  },
  computed: {
    isReady () {
      return this.publicacao !== null;
    }
  }
}
</script>

<style scoped>

  p {
    font-family: 'Roboto', 'Noto', sans-serif;
    text-transform: uppercase;
    color: #757575;
    line-height: 20px;

    margin-top: 40px;
  }

  span {
    font-weight: bold;
    text-decoration: underline;
    margin-right: 20px
  }

</style>
