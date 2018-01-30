<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card color="white">
          <v-toolbar color="pink" dense card>
            <v-toolbar-title class="white--text">FILTROS</v-toolbar-title>
          </v-toolbar>
          <v-predicoes-table-filter class="mt-3 ml-4"
          v-bind:tipos="tipos"
          v-bind:categorias="categorias"
          v-bind:orgaos="orgaos"
          v-bind:suborgaos="suborgaos"
          v-bind:classes="classes"
          v-on:filterChanged="filterChanged">
        </v-predicoes-table-filter>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card class="pa-0" color="white">
          <v-toolbar color="pink" dense card>
            <v-toolbar-title class="white--text">PREDIÇÕES</v-toolbar-title>
          </v-toolbar>
          <v-predicoes-table-advanced
            v-bind:predicoes="predicoes"
            v-bind:totalItems="totalItems"
            v-bind:isLoading="!isReady"
            v-on:paginationChanged="paginationChanged">
          </v-predicoes-table-advanced>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from 'moment'

import ApiService from '../common/api.service'
import VPredicoesTableAdvanced from '../components/VPredicoesTableAdvanced'
import VPredicoesTableFilter from '../components/VPredicoesTableFilter'

export default {
  name: 'Busca',
  components: {
    VPredicoesTableAdvanced,
    VPredicoesTableFilter
  },
  data () {
    return {
      predicoes: [],
      tipos: [],
      categorias: [],
      orgaos: [],
      suborgaos: [],
      classes: [],

      totalItems: 0,
      isReady: false,

      pagination: {},
      filter: {}
    };
  },
  created () {
    ApiService.get('publicacoes/list/tipo').then(result => this.tipos = result);
    ApiService.get('publicacoes/list/categoria').then(result => this.categorias = result);
    ApiService.get('publicacoes/list/orgao').then(result => this.orgaos = result);
    ApiService.get('publicacoes/list/suborgao').then(result => this.suborgaos = result);
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

        predicoes.forEach(publicacao => {
          publicacao.valor = publicacao.corpo.match(/(?:[1-9]\d{0,2}(?:\.\d{3})*|0),\d{2}/i);
          publicacao.valor = (publicacao.valor) ? parseInt(publicacao.valor[0].replace(/[\.,]/g, '')) : null;
          publicacao.formattedData = moment.utc(publicacao.data).format('DD/MM/YYYY');
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
        filterTipo: this.filter.tipo,
        filterCategoria: this.filter.categoria,
        filterOrgao: this.filter.orgao,
        filterSuborgao: this.filter.suborgao,
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
