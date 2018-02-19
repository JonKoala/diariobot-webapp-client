<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs2>
        <v-menu v-model="menuStartingDate" lazy v-bind:close-on-content-click="false" transition="scale-transition" offset-y full-width v-bind:nudge-right="40" max-width="290px" min-width="290px">
          <v-text-field slot="activator" label="Data Inicial" v-model="formattedStartingDate" prepend-icon="event" readonly></v-text-field>
          <v-date-picker v-model="startingDate" actions locale="pt-br" no-title scrollable>
            <template slot-scope="{ save, cancel }">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" v-on:click="cancel">Cancelar</v-btn>
                <v-btn flat color="primary" v-on:click="save">Salvar</v-btn>
              </v-card-actions>
            </template>
          </v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex xs2 class="ml-4">
        <v-menu v-model="menuEndingDate" lazy v-bind:close-on-content-click="false" transition="scale-transition" offset-y full-width v-bind:nudge-right="40" max-width="290px" min-width="290px">
          <v-text-field slot="activator" label="Data Final" v-model="formattedEndingDate" prepend-icon="event" readonly></v-text-field>
          <v-date-picker v-model="endingDate" actions locale="pt-br" no-title scrollable>
            <template slot-scope="{ save, cancel }">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" v-on:click="cancel">Cancelar</v-btn>
                <v-btn flat color="primary" v-on:click="save">Salvar</v-btn>
              </v-card-actions>
            </template>
          </v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex xs2 class="ml-4">
        <v-text-field v-model="inputValorMinimo" v-bind:mask="mask" return-masked-value clearable label="Valor Mínimo" prepend-icon="attach_money"></v-text-field>
      </v-flex>
      <v-flex xs2 class="ml-4">
        <v-text-field v-model="inputValorMaximo" v-bind:mask="mask" return-masked-value clearable label="Valor Máximo" prepend-icon="attach_money"></v-text-field>
      </v-flex>
      <v-flex xs2 class="ml-4">
        <v-text-field v-model="inputCorpo" clearable label="Busca Interna" prepend-icon="search"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs2>
        <v-select v-bind:items="tipos" v-model="tipo" label="Tipo" autocomplete clearable class="select" prepend-icon="tune"></v-select>
      </v-flex>
      <v-flex xs2 class="ml-4">
        <v-select v-bind:items="categorias" v-model="categoria" label="Categoria" autocomplete clearable class="select" prepend-icon="tune"></v-select>
      </v-flex>
      <v-flex xs2 class="ml-4">
        <v-select v-bind:items="orgaos" v-model="orgao" label="Orgão" autocomplete clearable class="select" prepend-icon="tune"></v-select>
      </v-flex>
      <v-flex xs2 class="ml-4">
        <v-select v-bind:items="suborgaos" v-model="suborgao" label="Suborgão" autocomplete clearable class="select" prepend-icon="tune"></v-select>
      </v-flex>
      <v-flex xs2 class="ml-4">
        <v-select v-bind:items="classes" v-model="classe" item-text="nome" item-value="id" label="Tema" autocomplete clearable class="select" prepend-icon="tune"></v-select>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from 'moment'

export default {
  name: 'VPredicoesTableFilter',
  props: {
    tipos: { type: Array },
    categorias: { type: Array },
    orgaos: { type: Array },
    suborgaos: { type: Array },
    classes: { type: Array }
  },
  data () {
    return {
      mask: '############',
      menuStartingDate: false,
      menuEndingDate: false,

      // used for debounce logic
      timeoutValorMinimo: null,
      timeoutValorMaximo: null,
      timeoutCorpo: null,
      inputValorMinimo: null,
      inputValorMaximo: null,
      inputCorpo: null,

      startingDate: null,
      endingDate: null,
      valorMinimo: null,
      valorMaximo: null,
      corpo: null,
      tipo: null,
      categoria: null,
      orgao: null,
      suborgao: null,
      classe: null
    };
  },
  methods: {
    formatDate (date) {
      return (date) ? moment.utc(date).format('DD/MM/YYYY') : null;
    },
    unformatNumber (value) {
      return (value) ? Number(value) : null;
    }
  },
  computed: {
    filterArguments () {
      return {
        startingDate: this.startingDate,
        endingDate: this.endingDate,
        valorMinimo: this.unformatNumber(this.valorMinimo),
        valorMaximo: this.unformatNumber(this.valorMaximo),
        corpo: this.corpo,
        tipo: this.tipo,
        categoria: this.categoria,
        orgao: this.orgao,
        suborgao: this.suborgao,
        classe: this.classe
      }
    },
    formattedStartingDate () {
      return this.formatDate(this.startingDate)
    },
    formattedEndingDate () {
      return this.formatDate(this.endingDate)
    }
  },
  watch: {
    filterArguments (newValue) {
      this.$emit('filterChanged', this.filterArguments);
    },

    // debounce logic
    inputValorMinimo (newValue) {
      window.clearTimeout(this.timeoutValorMinimo);
      this.timeoutValorMinimo = window.setTimeout(() => {this.valorMinimo = newValue}, 500);
    },
    inputValorMaximo (newValue) {
      window.clearTimeout(this.timeoutValorMaximo);
      this.timeoutValorMaximo = window.setTimeout(() => {this.valorMaximo = newValue}, 500);
    },
    inputCorpo (newValue) {
      window.clearTimeout(this.timeoutCorpo);
      this.timeoutCorpo = window.setTimeout(() => {this.corpo = newValue}, 500);
    }
  }
}

</script>

<style scoped>

  .select >>> .input-group__selections__comma {
    white-space: nowrap;

    overflow:hidden !important;
    text-overflow: ellipsis;
  }

</style>
