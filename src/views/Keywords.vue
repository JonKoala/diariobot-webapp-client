<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs4 v-for="(classe, index) in classes" v-bind:key="classe.id">
        <v-toolbar v-bind:style="{backgroundColor: colors[index]}" dense card>
          <v-toolbar-title style="margin:auto" class="white--text">{{ classe.nome }}</v-toolbar-title>
        </v-toolbar>
        <v-card class="pt-3 px-1" color="white" transition="slide-y-transition">
          <v-list class="pb-0">
            <v-list-tile v-for="(keyword, kIndex) in classe.keywords" v-bind:key="keyword.id" class="line" v-bind:style="{color: colors[index]}">
              <v-list-tile-action>
                <v-tooltip top>
                  <v-btn icon ripple @click="toggleBlacklistWord(keyword)" slot="activator">
                    <v-icon v-if="keyword.isBlacklisted" color="grey">cancel</v-icon>
                    <v-icon v-else color="grey">done</v-icon>
                  </v-btn>
                  <span>{{ (keyword.isBlacklisted) ? 'Remover da Blacklist' : 'Adicionar na Blacklist' }}</span>
                </v-tooltip>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-bind:style="{color: colors[index], 'text-decoration': (keyword.isBlacklisted) ? 'line-through' : 'none' }">
                  {{ keyword.palavra }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
        <v-snackbar v-model="snackbar" v-bind:timeout="5000" bottom right>{{ snackbarMessage }}</v-snackbar>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import ApiService from '../common/api.service'
  import ColorScheme from '../common/color.scheme'

  export default {
    name: 'Keywords',
    data() {
      return {
        classes: [],
        colors: ColorScheme.classes,

        snackbar: false,
        snackbarMessage: 'teste'
      };
    },
    created() {

      var classes = [];
      ApiService.get(`classes/keywords`)
      .then(result => {
        classes = result.filter(classe => classe.keywords.length > 0).sort((a, b) => { return a.ordem - b.ordem });
        return ApiService.get('blacklist');
      }).then(blacklist => {

        // mark keywords as blacklisted
        blacklist = blacklist.map(blacklisted => blacklisted.palavra);
        classes.forEach(classe => {
          classe.keywords.forEach(keyword => {
            keyword.isBlacklisted = blacklist.includes(keyword.palavra);
          });
        });

        this.classes = classes;
      });
    },
    methods: {
      toggleBlacklistWord(keyword) {

        keyword.isBlacklisted = !keyword.isBlacklisted

        // add or remove word from blacklist
        var methodToCall = (keyword.isBlacklisted) ? this.blacklistWord : this.unblacklistWord;
        methodToCall.call(this, keyword.palavra);

        this.snackbarMessage = `Palavra '${keyword.palavra}' ${keyword.isBlacklisted ? 'Adicionada na' : 'Removida da'} Blacklist`;
        this.snackbar = true;
      },
      blacklistWord(word) {
        ApiService.post('blacklist', { palavra: word });
      },
      unblacklistWord(word) {
        ApiService.delete('blacklist', { params: { palavra: word } });
      }
    }
  }
</script>

<style scoped>

  .line {
    border-bottom-style: solid;
    border-bottom-width: thin;
  }

  .line >>> .list__tile {
    padding-right: 0px;
  }

</style>
