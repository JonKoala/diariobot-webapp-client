import moment from 'moment'

import ApiService from 'common/api.service'

export default {
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

      pagination: {},
      filter: {}
    };
  },
  created () {
    ApiService.get('publicacoes/list/tipo').then(result => this.tipos = result.sort());
    ApiService.get('publicacoes/list/orgao').then(result => this.orgaos = result.sort());
    ApiService.get('publicacoes/list/suborgao').then(result => this.suborgaos = result.sort());
    ApiService.get('macrorregioes').then(result => this.macrorregioes = result.sort());
    ApiService.get('classes/predictable').then(result => this.classes = result.sort());
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
