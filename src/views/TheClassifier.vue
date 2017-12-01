<template>
  <div>
    <div>
      <v-publicacao-viewer v-bind:publicacao="publicacao"></v-publicacao-viewer>
    </div>
    <div class="buttons-area" >
      <button class="button green" v-on:click="classify(true)">É TI</button>
      <button class="button red" v-on:click="classify(false)">Não é TI</button>
      <button class="button orange" v-on:click="classify(null)">Não sei</button>
    </div>
  </div>
</template>

<script>
import ApiService from '../common/api.service'
import VPublicacaoViewer from '../components/VPublicacaoViewer'

export default {
  name: 'TheClassifier',
  components: { VPublicacaoViewer },
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
    classify(isTi) {
      ApiService.post(`classificacoes`, { publicacao: this.publicacao, isTi: isTi })
        .then(() => {
          //jump to next
          window.location.href = "/";
        });
    }
  }
}
</script>

<style scoped>

  .buttons-area {
    display: flex;
    justify-content: center;
    height: 200px
  }

  .buttons-area .button {
    margin: 40px;
    flex-grow: 1;
  }

  .button {
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 2vw;
  }

  .green { background-color: #4CAF50; }
  .red { background-color: #F44336; }
  .orange { background-color: #FF9800; }

</style>
