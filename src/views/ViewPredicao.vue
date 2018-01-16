<template>
  <div>
    <v-publicacao-viewer v-if="isReady" v-bind:publicacao="publicacao"></v-publicacao-viewer>
    <span v-if="isReady" v-bind:style="{backgroundColor: colors[publicacao.predicao.classe.ordem]}">
      {{publicacao.predicao.classe.nome}}
    </span>
  </div>
</template>

<script>
import ApiService from '../common/api.service'
import ColorScheme from '../common/color.scheme'

import VPublicacaoViewer from '../components/VPublicacaoViewer'

export default {
  name: 'ViewPredicao',
  components: {
    VPublicacaoViewer
  },
  data () {
    return {
      colors: ColorScheme.classes,
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

  span {
    display: inline-block;
    padding: 15px;
    margin-top: 40px;

    font-family: 'Roboto', 'Noto', sans-serif;
    text-transform: uppercase;
    color: white;
  }

</style>
