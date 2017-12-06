<template>
  <div>
    <v-publicacao-viewer v-bind:publicacao="publicacao"></v-publicacao-viewer>
    <v-dynamic-buttons-area v-bind:entries="computedClasses" v-on:click="classClicked" ></v-dynamic-buttons-area>
  </div>
</template>

<script>
import ApiService from '../common/api.service'
import VPublicacaoViewer from '../components/VPublicacaoViewer'
import VDynamicButtonsArea from '../components/VDynamicButtonsArea'

export default {
  name: 'TheClassifier',
  components: {
    VPublicacaoViewer,
    VDynamicButtonsArea
  },
  data () {
    return {
      publicacao: {},
      classes: []
    }
  },
  mounted() {
    ApiService.get(`publicacoes/${this.$route.params.id}`).then(publicacao => {
      this.publicacao = publicacao;
    });
    ApiService.get(`classes`).then(classes => {
      this.classes = classes;
    });
  },
  computed: {
    computedClasses() {

      //formating the classes object for usage on my dynamicButtonsArea
      var compClasses = this.classes.map(classe => {
        return {identity: classe.id, text: classe.nome};
      });
      compClasses.push({identity: null, text: 'NÃO SEI'});

      return compClasses;
    }
  },
  methods: {
    classClicked(classe) {

      //post new classificacao
      ApiService.post(`classificacoes`, { publicacao: this.publicacao, classe: classe })
        .then(() => {

          //jump to next publicacao
          window.location.href = "/";
        });
    }
  }
}
</script>
