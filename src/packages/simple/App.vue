<template>
  <v-app id="app" light>

    <v-toolbar app fixed clipped-left>
      <v-toolbar-title>DIARIOBOT</v-toolbar-title>
      <v-spacer></v-spacer>
      <div>
        <p class="mb-0">O <b>DIARIOBOT</b> é um robô que usa inteligência artificial para classificar publicações feitas no Diário Oficial do Espírito Santo.</p>
        <p class="mb-0">Quer saber mais sobre ele?<v-btn @click.stop="showDialog = true" flat small class="ma-0 pb-1">clique aqui</v-btn></p>
      </div>
    </v-toolbar>

    <v-content>
      <v-container fluid fill-height grid-list-md class="pt-0">
        <v-layout column>
          <v-flex>
            <v-expansion-panel v-model="showingFilter" expand class="elevation-0">
              <v-expansion-panel-content class="grey lighten-5">
                <predicoes-table-filters class="fluid pa-0"
                v-bind:tipos="tipos"
                v-bind:orgaos="orgaos"
                v-bind:suborgaos="suborgaos"
                v-bind:macrorregioes="macrorregioes"
                v-bind:classes="classes"
                v-on:filterChanged="filterChanged">
                </predicoes-table-filters>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-flex>
          <v-btn @click.stop="toggleFilter" flat fab small>
            <v-icon>{{ filterButtonIcon }}</v-icon>
          </v-btn>
          <v-flex xs12>
            <v-card color="white" class="scrollable-container elevation-10">
              <div class="scrollable-content">
                <predicoes-table-advanced class="fluid ma-0 pa-0" strip-internal-links
                v-bind:predicoes="predicoes"
                v-bind:totalItems="totalItems"
                v-bind:isLoading="!isReady"
                v-on:paginationChanged="paginationChanged">
                </predicoes-table-advanced>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-dialog v-model="showDialog" width="45vw" scrollable>
      <informativo-dialog-content v-bind:temas="classes"></informativo-dialog-content>
    </v-dialog>

  </v-app>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'

import InformativoDialogContent from './components/InformativoDialogContent'
import PredicoesTableAdvanced from 'components/PredicoesTableAdvanced'
import PredicoesTableFilters from 'components/PredicoesTableFilters'

import PredicoesTableFilteringBehaviour from 'mixins/PredicoesTableFilteringBehaviour'

export default {
  name: 'App',
  components: {
    InformativoDialogContent,
    PredicoesTableAdvanced,
    PredicoesTableFilters
  },
  mixins: [PredicoesTableFilteringBehaviour],
  data () {
    return {
      showDialog: false,
      showingFilter: [true],
      filter: { startingDate: moment.utc().format('YYYY-MM-DD') }
    }
  },
  computed: {
    filterButtonIcon () {
      return (this.showingFilter[0] == true) ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
    }
  },
  methods: {
    toggleFilter () {
      Vue.set(this.showingFilter, 0, !this.showingFilter[0])
    }
  }
}
</script>

<style>

  html {
    overflow: hidden;
  }

  .scrollable-container {
    position: relative;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .scrollable-content {
    position: absolute;
    width: 100%;
  }

</style>
