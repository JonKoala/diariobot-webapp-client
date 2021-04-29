<template>
  <v-container fluid fill-height grid-list-md class="pt-0">
    <v-layout column>

      <v-flex>
        <v-expansion-panel v-model="expansionPanelModel" expand class="elevation-0">
          <v-expansion-panel-content class="grey lighten-5">
            <home-filters v-on:input="filterChanged" class="fluid pa-0"></home-filters>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>

      <v-layout row justify-space-between>
        <base-icon-button v-on:click.stop="toggleFilter" flat>{{ isShowingFilters ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</base-icon-button>
        <home-button-download></home-button-download>
      </v-layout>

      <v-flex xs12>
        <home-results v-show="isShowingTable" v-bind:bus="bus" v-on:sort-change="updateResults" v-on:page-change="updateResults"></home-results>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import Vue from 'vue'

import { QUERY, VIEW_HOME } from 'store/namespaces'
import { SET_PAGE } from 'store/mutation.types'
import { FETCH_PREDICOES } from 'store/action.types'

import BaseIconButton from 'components/BaseIconButton'
import HomeButtonDownload from 'components/HomeButtonDownload'
import HomeFilters from 'components/HomeFilters'
import HomeResults from 'components/HomeResults'

export default {
  name: 'ViewHome',
  components: {
    BaseIconButton,
    HomeButtonDownload,
    HomeFilters,
    HomeResults
  },
  data () {
    return {
      bus: new Vue(),
      isShowingFilters: true,
      isShowingTable: false
    }
  },
  computed: {
    expansionPanelModel () {
      return [this.isShowingFilters]
    }
  },
  methods: {
    filterChanged () {
      this.$store.commit(`${VIEW_HOME}/${QUERY}/${SET_PAGE}`, 0)
      this.updateResults()
    },
    toggleFilter () {
      this.isShowingFilters = !this.isShowingFilters
    },
    async updateResults () {
      this.bus.$emit('reset-results-scroll')
      await this.$store.dispatch(`${VIEW_HOME}/${FETCH_PREDICOES}`)
      this.isShowingTable = true
    }
  }
}
</script>
