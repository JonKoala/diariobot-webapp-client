<template>
    <div>
      <v-publicacao-viewer v-bind:publicacao="publicacao"></v-publicacao-viewer>
      <v-publicacao-button-big v-bind:text="'É TI'" v-on:click="classifyAsTi"></v-publicacao-button-big>
      <v-publicacao-button-big v-bind:text="'Não é TI'" v-on:click="classifyAsNotTi"></v-publicacao-button-big>
      <v-publicacao-button-big v-bind:text="'Não sei'" v-on:click="jumpToNext"></v-publicacao-button-big>
    </div>
</template>

<script>
import ApiService from '../common/api.service'
import VPublicacaoViewer from '../components/VPublicacaoViewer'
import VPublicacaoButtonBig from '../components/VPublicacaoButtonBig'

export default {
  name: 'TheClassifier',
  components: {
    VPublicacaoViewer,
    VPublicacaoButtonBig
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
    classifyAsTi() {
      console.log('é TI');
      this.jumpToNext()
    },
    classifyAsNotTi() {
      console.log('Não é TI');
      this.jumpToNext()
    },
    jumpToNext() {
      console.log('redireciona para proxima');
    }
  }
}
</script>
