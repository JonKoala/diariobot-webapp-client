<template>
  <div>
    <v-publicacao-viewer v-bind:publicacao="publicacao"></v-publicacao-viewer>
    <v-publicacao-class-buttons-area v-on:classify="classify" ></v-publicacao-class-buttons-area>
  </div>
</template>

<script>
import ApiService from '../common/api.service'
import VPublicacaoViewer from '../components/VPublicacaoViewer'
import VPublicacaoClassButtonsArea from '../components/VPublicacaoClassButtonsArea'

export default {
  name: 'TheClassifier',
  components: {
    VPublicacaoViewer,
    VPublicacaoClassButtonsArea
  },
  data () {
    return {
      publicacao: {}
    }
  },
  mounted() {
    ApiService.get(`publicacoes/${this.$route.params.id}`).then(publicacao => {
      this.publicacao = publicacao;
    });
  },
  methods: {
    classify(classe) {
      ApiService.post(`classificacoes`, { publicacao: this.publicacao, classe: classe })
        .then(() => {
          //jump to next
          window.location.href = "/";
        });
    }
  }
}
</script>
