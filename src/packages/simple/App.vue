<template>
  <v-app id="app" light>
    <v-toolbar app fixed clipped-left>
      <v-tooltip bottom>
        <v-btn @click.stop="showFilter = !showFilter" slot="activator" class="mx-0" icon>
          <v-icon>filter_list</v-icon>
        </v-btn>
        <span>Filtros</span>
      </v-tooltip>
      <v-toolbar-title>DIOES BOT</v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer clipped fixed app absolute temporary v-model="showFilter" class="px-3 pt-3 pb-0">
      <the-predicoes-table-vertical-filters
        v-bind:defaultStartingDate="filter.startingDate"
        v-bind:tipos="tipos"
        v-bind:orgaos="orgaos"
        v-bind:suborgaos="suborgaos"
        v-bind:macrorregioes="macrorregioes"
        v-bind:classes="classes"
        v-on:filterChanged="filterChanged">
      </the-predicoes-table-vertical-filters>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-start>
          <v-flex xs12>
            <v-card color="white">
              <predicoes-table-advanced class="fluid ma-0 pa-0" strip-internal-links
                v-bind:predicoes="predicoes"
                v-bind:totalItems="totalItems"
                v-bind:isLoading="!isReady"
                v-on:paginationChanged="paginationChanged">
              </predicoes-table-advanced>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import moment from 'moment'

import ThePredicoesTableVerticalFilters from './components/ThePredicoesTableVerticalFilters'
import PredicoesTableAdvanced from 'components/PredicoesTableAdvanced'

import PredicoesTableFilteringBehaviour from 'mixins/PredicoesTableFilteringBehaviour'

export default {
  name: 'App',
  components: {
    ThePredicoesTableVerticalFilters,
    PredicoesTableAdvanced
  },
  mixins: [PredicoesTableFilteringBehaviour],
  data () {
    return {
      showFilter: false,
      filter: { startingDate: moment.utc().format('YYYY-MM-DD') }
    };
  }
}
</script>
