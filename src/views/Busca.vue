<template>
  <v-predicoes-table-advanced
    v-bind:predicoes="predicoes"
    v-bind:totalItems="totalItems"
    v-bind:isLoading="!isReady"
    v-on:paginationChanged="paginationChanged">
  </v-predicoes-table-advanced>
</template>

<script>
import moment from 'moment'

import ApiService from '../common/api.service'
import VPredicoesTableAdvanced from '../components/VPredicoesTableAdvanced'

export default {
  name: 'Busca',
  components: {
    VPredicoesTableAdvanced
  },
  data () {
    return {
      predicoes: [],
      pagination: {},
      totalItems: 0,
      isReady: false,
    };
  },
  methods: {
    paginationChanged (pagination) {
      this.pagination = pagination;
      this.queryPredicoes();
    },
    queryPredicoes () {
      this.isReady = false;
      this.predicoes = [];
      window.scrollTo(0, 0);

      var queryOptions = {
        itemsPerPage: this.pagination.rowsPerPage,
        page: this.pagination.page - 1,
        sortBy: this.pagination.sortBy,
        sortOrder: (this.pagination.descending) ? 'DESC' : 'ASC'
      }

      ApiService.get('predicoes/paginable', {params: queryOptions}).then(result => {

        this.totalItems = result.count;
        var predicoes = result.rows;

        predicoes.forEach(publicacao => {
          publicacao.valor = publicacao.corpo.match(/(?:[1-9]\d{0,2}(?:\.\d{3})*|0),\d{2}/i);
          publicacao.valor = (publicacao.valor) ? parseInt(publicacao.valor[0].replace(/[\.,]/g, '')) : null;
        });

        this.predicoes = predicoes;
        this.isReady = true;
      });
    }
  }
}
</script>
