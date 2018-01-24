<template>
  <v-container fluid grid-list-md class="mt-0">
    <v-layout row wrap>
      <v-flex xs12>
        <v-card class="pa-1" color="white">
          <v-layout row justify-start>
            <v-flex xs2>
              <v-menu lazy v-model="menu" transition="scale-transition" offset-y full-width v-bind:nudge-right="40" max-width="290px" min-width="290px">
                <v-text-field slot="activator" label="Data" v-model="formattedDate" prepend-icon="event" readonly></v-text-field>
                <v-date-picker v-model="date" locale="pt-br" no-title scrollable actions></v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs12 class="mt-1">
        <v-card class="pa-0" color="white">
          <v-layout row justify-end class="pb-4">
            <v-flex xs4>
              <v-text-field append-icon="search" label="Busca" single-line hide-details v-model="search"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout v-if="predicoes.length > 0" row wrap>
            <v-predicoes-table v-bind:predicoes="predicoes" v-bind:search="search"></v-predicoes-table>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from 'moment'

import ApiService from '../common/api.service'
import VPredicoesTable from '../components/VPredicoesTable'

export default {
  name: 'Busca',
  components: {
    VPredicoesTable
  },
  data () {
    return {
      predicoes: [],
      date: null,
      search: null,

      menu: false
    };
  },
  created () {
    this.date = moment().format('YYYY-MM-DD');
  },
  computed: {
    formattedDate () {
      return moment.utc(this.date).format('DD/MM/YYYY')
    }
  },
  watch: {
    date (date) {
      ApiService.get('predicoes', {params: {data: date}}).then(predicoes => {
        this.predicoes = predicoes;
      });
    }
  }
}
</script>
