<template>
  <div v-if="isReady">
    <v-publicacao-viewer v-bind:publicacao="publicacao"></v-publicacao-viewer>
    <v-flex xs2 class="ml-2">
      <v-card class="pa-1" v-bind:style="{backgroundColor: colors[publicacao.predicao.classe.ordem]}" style="height:80px">
        <v-card-text class="white--text card-text btn__content">{{ publicacao.predicao.classe.nome }}</v-card-text>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
import ApiService from '../common/api.service'
import ColorScheme from '../common/color.scheme'

import VPublicacaoViewer from '../components/VPublicacaoViewer'

export default {
  name: 'Predicao',
  components: {
    VPublicacaoViewer
  },
  data () {
    return {
      colors: ColorScheme.classes,
      publicacao: null
    };
  },
  created() {
    ApiService.get(`predicoes/${this.$route.params.id}`).then(publicacao => {
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

  .card-text {
    text-align: center;
    text-transform: uppercase;
    font-weight: 500;

    width: fit-content;
    white-space: normal;
  }

</style>
