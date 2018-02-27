<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card color="white">
          <v-toolbar color="blue-grey" dense card>
            <v-toolbar-title class="white--text">PREDIÇÕES</v-toolbar-title>
          </v-toolbar>
          <v-container fluid class="mb-4">
            <v-layout row justify-space-between>
              <v-flex xs2>
                <v-menu lazy v-model="menu" transition="scale-transition" offset-y full-width v-bind:nudge-right="40" max-width="290px" min-width="290px">
                  <v-text-field slot="activator" label="Data" v-model="formattedDate" append-icon="event" readonly></v-text-field>
                  <v-date-picker v-model="date" locale="pt-br" no-title scrollable actions></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs4>
                <v-text-field append-icon="search" label="Busca" single-line hide-details v-model="search"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <predicoes-table class="fluid ma-0 pa-0" v-bind:predicoes="predicoes" v-bind:search="search" v-bind:isLoading="!isReady"></predicoes-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from 'moment'

import ApiService from 'common/api.service'

import PredicoesTable from 'components/PredicoesTable'

export default {
  name: 'Home',
  components: {
    PredicoesTable
  },
  data () {
    return {
      predicoes: [],
      date: null,
      search: null,
      isReady: false,

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
      this.isReady = false;
      ApiService.get(`predicoes/data/${date}`).then(predicoes => {

        predicoes.forEach(predicao => {
          predicao.formattedValor = (predicao.valor) ? predicao.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL'}).substr(2) : null;
        });

        this.predicoes = predicoes;
        this.isReady = true;
      });
    }
  }
}
</script>
