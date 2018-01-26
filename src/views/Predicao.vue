<template>
  <div v-if="isReady">
    <v-publicacao-viewer v-bind:publicacao="predicao"></v-publicacao-viewer>
    <v-flex xs2 class="ml-2">
      <v-card class="pa-1" v-bind:style="{backgroundColor: colors[predicao.classe_ordem]}" style="height:80px">
        <v-card-text class="white--text card-text btn__content">{{ predicao.classe }}</v-card-text>
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
      predicao: null
    };
  },
  created() {
    ApiService.get(`predicoes/${this.$route.params.id}`).then(predicao => {
      this.predicao = predicao;
    });
  },
  computed: {
    isReady () {
      return this.predicao !== null;
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
