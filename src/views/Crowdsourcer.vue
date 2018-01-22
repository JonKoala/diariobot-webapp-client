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
  name: 'Crowdsourcer',
  components: {
    VPublicacaoViewer,
    VDynamicButtonsArea
  },
  data () {
    return {
      publicacao: {},
      classes: []
    };
  },
  mounted() {
    ApiService.get(`classes`).then(classes => {
      this.classes = classes.sort((a, b) => { return a.ordem - b.ordem });
    });

    this.managePublicacao();
  },
  methods: {
    managePublicacao () {
      if (this.$route.params.id)
        this.getPublicacao();
      else
        this.getRandomPublicacao();
    },
    getPublicacao () {
      ApiService.get(`publicacoes/${this.$route.params.id}`).then(publicacao => {
        this.publicacao = publicacao;
      });
    },
    getRandomPublicacao (isFirst) {
      ApiService.get('publicacoes/rand').then(publicacao => {
        if (this.$route.params.id)
          this.$router.push({name: 'crowdsourcer', params: {id: publicacao.id}});
        else
          this.$router.replace({name: 'crowdsourcer', params: {id: publicacao.id}});
      });
    },

    classClicked(classe) {
      ApiService.post(`classificacoes`, { publicacao: this.publicacao.id, classe: classe }).then(this.getRandomPublicacao);
    }
  },
  watch: {
    '$route': 'managePublicacao'
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
  }
}
</script>
