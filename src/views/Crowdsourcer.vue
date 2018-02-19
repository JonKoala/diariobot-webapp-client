<template>
  <v-container fluid grid-list-md v-if="publicacao">
    <v-slide-x-transition mode="out-in">
      <v-layout row wrap v-show="show">
        <v-flex xs12>
          <v-card color="white">
            <v-toolbar color="blue-grey" dense card>
              <v-toolbar-title class="white--text">
                <v-tooltip top>
                  <v-btn v-bind:href="linkToOriginal" target="_blank" @click="" slot="activator" class="mx-0" icon>
                    <v-icon color="white">link</v-icon>
                  </v-btn>
                  <span>Original</span>
                </v-tooltip>
                <v-tooltip top>
                  <v-btn v-bind:to="linkToPredicao" target="_blank" @click="" slot="activator" class="ml-0" icon>
                    <v-icon color="white">developer_board</v-icon>
                  </v-btn>
                  <span>Predição</span>
                </v-tooltip>
                <span class="ml-4" v-bind:title="publicacao.materia">{{ publicacao.materia }}</span>
              </v-toolbar-title>
            </v-toolbar>
            <v-publicacao-viewer-header class="fluid" v-bind:publicacao="publicacao"></v-publicacao-viewer-header>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-card>
            <v-toolbar color="blue-grey" dense card>
              <v-toolbar-title class="white--text">CORPO DA PUBLICAÇÃO</v-toolbar-title>
            </v-toolbar>
            <v-publicacao-viewer-body v-bind:publicacao="publicacao.corpo"></v-publicacao-viewer-body>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-dynamic-buttons-area v-bind:entries="computedClasses" v-on:click="classClicked" ></v-dynamic-buttons-area>
        </v-flex>
      </v-layout>
    </v-slide-x-transition>
  </v-container>
</template>

<script>
import ApiService from '../common/api.service'

import VPublicacaoViewerHeader from '../components/VPublicacaoViewerHeader'
import VPublicacaoViewerBody from '../components/VPublicacaoViewerBody'
import VDynamicButtonsArea from '../components/VDynamicButtonsArea'

export default {
  name: 'Crowdsourcer',
  components: {
    VPublicacaoViewerHeader,
    VPublicacaoViewerBody,
    VDynamicButtonsArea
  },
  data () {
    return {
      publicacao: null,
      classes: [],

      show: true
    };
  },
  created() {
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
        this.show = true;
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
      this.show = false;
    }
  },
  computed: {
    computedClasses() {

      //formating the classes object for usage on my dynamicButtonsArea
      var compClasses = this.classes.map(classe => {
        return {identity: classe.id, text: classe.nome}
      });
      compClasses.push({identity: null, text: 'NÃO SEI'});

      return compClasses;
    },
    linkToOriginal () {
      return `http://ioes.dio.es.gov.br/apifront/portal/edicoes/publicacoes_ver_conteudo/${this.publicacao.identificador}`
    },
    linkToPredicao () {
      return `/predicao/${this.publicacao.id}`
    }
  },
  watch: {
    '$route': 'managePublicacao'
  }
}
</script>
