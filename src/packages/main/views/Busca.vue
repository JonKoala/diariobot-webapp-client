<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card color="white">
          <v-toolbar color="blue-grey" dense card>
            <v-toolbar-title class="white--text">FILTROS</v-toolbar-title>
          </v-toolbar>
          <predicoes-table-filters class="fluid"
          v-bind:tipos="tipos"
          v-bind:orgaos="orgaos"
          v-bind:suborgaos="suborgaos"
          v-bind:macrorregioes="macrorregioes"
          v-bind:classes="classes"
          v-on:filterChanged="filterChanged">
        </predicoes-table-filters>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card class="pa-0" color="white">
          <v-toolbar color="blue-grey" dense card>
            <v-toolbar-title class="white--text">PREDIÇÕES</v-toolbar-title>
          </v-toolbar>
          <predicoes-table-advanced class="fluid ma-0 pa-0"
            v-bind:predicoes="predicoes"
            v-bind:totalItems="totalItems"
            v-bind:isLoading="!isReady"
            v-on:paginationChanged="paginationChanged">
          </predicoes-table-advanced>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import PredicoesTableAdvanced from 'components/PredicoesTableAdvanced'
import PredicoesTableFilters from 'components/PredicoesTableFilters'

import PredicoesTableFilteringBehaviour from 'mixins/PredicoesTableFilteringBehaviour'

export default {
  name: 'Busca',
  components: {
    PredicoesTableAdvanced,
    PredicoesTableFilters
  },
  mixins: [PredicoesTableFilteringBehaviour]
}
</script>
