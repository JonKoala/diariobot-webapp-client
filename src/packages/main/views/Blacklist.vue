<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap justify-center>
      <v-flex xs4>
        <v-card color="white">
          <v-toolbar dense card color="blue-grey">
            <v-toolbar-title class="white--text">BLACKLIST</v-toolbar-title>
          </v-toolbar>
          <v-layout column class="px-1">
            <v-flex xs9 offset-md3 class="mt-2 mb-3">
              <v-text-field append-icon="search" label="Busca" single-line hide-details v-model="search"></v-text-field>
            </v-flex>
            <v-flex xs12 class="pb-0">
              <v-list class="pb-0">
                <v-list-tile v-for="entry in filteredList" v-bind:key="entry.id" class="line">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ entry.palavra }}</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-tooltip top>
                      <v-btn icon ripple @click="removePalavra(entry.palavra)" slot="activator">
                        <v-icon color="grey">delete_sweep</v-icon>
                      </v-btn>
                      <span>Remover</span>
                    </v-tooltip>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </v-flex>
          </v-layout>
        </v-card>
        <v-snackbar v-model="snackbar" v-bind:timeout="5000" bottom right>{{ snackbarMessage }}</v-snackbar>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ApiService from 'common/api.service'

export default {
  name: 'Blacklist',
  data () {
    return {
      blacklist: [],
      search: '',

      snackbar: false,
      snackbarMessage: ''
    };
  },
  created () {
    this.getBlacklist();
  },
  computed: {
    filteredList () {
      return this.blacklist.filter(entry => entry.palavra.includes(this.search))
    }
  },
  methods: {
    getBlacklist () {
      ApiService.get('blacklist/').then(blacklist => this.blacklist = blacklist);
    },
    removePalavra (palavra) {
      ApiService.delete('blacklist', { params: { palavra: palavra } })
      .then(() => {

        this.snackbarMessage = `Palavra '${palavra}' Removida da Blacklist`;
        this.snackbar = true;

        this.getBlacklist();
      });
    }
  }
}
</script>

<style scoped>

  .line {
    border-bottom-style: solid;
    border-bottom-width: thin;
  }

</style>
