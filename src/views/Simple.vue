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
      <the-predicoes-table-vertical-filter
        v-bind:tipos="tipos"
        v-bind:orgaos="orgaos"
        v-bind:suborgaos="suborgaos"
        v-bind:macrorregioes="macrorregioes"
        v-bind:classes="classes"
        v-on:filterChanged="filterChanged">
      </the-predicoes-table-vertical-filter>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-start>
          <v-flex xs12>
            <v-card color="white">
              <v-predicoes-table-advanced class="fluid ma-0 pa-0" strip-internal-links
                v-bind:predicoes="predicoes"
                v-bind:totalItems="totalItems"
                v-bind:isLoading="!isReady"
                v-on:paginationChanged="paginationChanged">
              </v-predicoes-table-advanced>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import moment from 'moment'

import ApiService from '../common/api.service'

import ThePredicoesTableVerticalFilter from '../components/ThePredicoesTableVerticalFilter'
import VPredicoesTableAdvanced from '../components/VPredicoesTableAdvanced'

export default {
  name: 'Simple',
  components: {
    ThePredicoesTableVerticalFilter,
    VPredicoesTableAdvanced
  },
  data () {
    return {
      predicoes: [],
      tipos: [],
      orgaos: [],
      suborgaos: [],
      macrorregioes: [],
      classes: [],

      totalItems: 0,
      isReady: false,
      showFilter: false,

      pagination: {},
      filter: { startingDate: moment.utc().format('YYYY-MM-DD')}
    };
  },
  created () {
    ApiService.get('publicacoes/list/tipo').then(result => this.tipos = result);
    ApiService.get('publicacoes/list/orgao').then(result => this.orgaos = result);
    ApiService.get('publicacoes/list/suborgao').then(result => this.suborgaos = result);
    ApiService.get('macrorregioes').then(result => this.macrorregioes = result);
    ApiService.get('classes/predictable').then(result => this.classes = result);
  },
  methods: {
    paginationChanged (pagination) {
      this.pagination = pagination;
    },
    filterChanged (filter) {
      this.filter = filter;
    },
    queryPredicoes (queryArguments) {
      this.isReady = false;
      this.predicoes = [];
      window.scrollTo(0, 0);

      ApiService.get('predicoes/paginable', {params: queryArguments}).then(result => {

        this.totalItems = result.count;
        var predicoes = result.rows;

        predicoes.forEach(predicao => {
          predicao.formattedValor = (predicao.valor) ? predicao.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL'}).substr(2) : null;
          predicao.formattedData = moment.utc(predicao.data).format('DD/MM/YYYY');
        });

        this.predicoes = predicoes;
        this.isReady = true;
      });
    }
  },
  computed: {
    queryArguments () {
      return {
        itemsPerPage: this.pagination.rowsPerPage,
        page: this.pagination.page - 1,
        sortBy: this.pagination.sortBy,
        sortOrder: (this.pagination.descending) ? 'DESC' : 'ASC',
        filterStartingDate: this.filter.startingDate,
        filterEndingDate: this.filter.endingDate,
        filterMinValor: this.filter.valorMinimo,
        filterMaxValor: this.filter.valorMaximo,
        filterCorpo: this.filter.corpo,
        filterTipo: this.filter.tipo,
        filterOrgao: this.filter.orgao,
        filterSuborgao: this.filter.suborgao,
        filterMacrorregiao: this.filter.macrorregiao,
        filterClasse: this.filter.classe
      };
    }
  },
  watch: {
    queryArguments (args) {
      this.queryPredicoes(args);
    }
  }
}
</script>
