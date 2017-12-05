<template>
  <div>
    <v-publicacao-viewer v-bind:publicacao="publicacao"></v-publicacao-viewer>
    <v-publicacao-class-buttons-area v-bind:entries="computedClasses" v-on:classify="classify" ></v-publicacao-class-buttons-area>
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
      publicacao: {},
      classes: [],

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

      var compClasses = this.classes.map(classe => {
        return {identity: classe.id, text: classe.nome};
      });
      compClasses.push({identity: null, text: 'NÃO SEI'});

      return compClasses;
    }
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
