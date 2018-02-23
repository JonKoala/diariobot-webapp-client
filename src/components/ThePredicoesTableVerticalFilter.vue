<template>
  <v-list dense>
    <v-menu v-model="menuStartingDate" lazy v-bind:close-on-content-click="false" transition="scale-transition" offset-y full-width v-bind:nudge-right="40" max-width="290px" min-width="290px">
      <v-text-field slot="activator" label="Data Inicial" v-model="formattedStartingDate" append-icon="event" readonly></v-text-field>
      <v-date-picker v-model="startingDate" actions locale="pt-br" no-title scrollable>
        <template slot-scope="{ save, cancel }">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" v-on:click="startingDate = null; menuStartingDate = false;">Cancelar</v-btn>
            <v-btn flat color="primary" v-on:click="menuStartingDate = false;">Salvar</v-btn>
          </v-card-actions>
        </template>
      </v-date-picker>
    </v-menu>
    <v-menu v-model="menuEndingDate" lazy v-bind:close-on-content-click="false" transition="scale-transition" offset-y full-width v-bind:nudge-right="40" max-width="290px" min-width="290px">
      <v-text-field slot="activator" label="Data Final" v-model="formattedEndingDate" append-icon="event" readonly></v-text-field>
      <v-date-picker v-model="endingDate" actions locale="pt-br" no-title scrollable>
        <template slot-scope="{ save, cancel }">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" v-on:click="endingDate = null; menuEndingDate = false;">Cancelar</v-btn>
            <v-btn flat color="primary" v-on:click="menuEndingDate = false;">Salvar</v-btn>
          </v-card-actions>
        </template>
      </v-date-picker>
    </v-menu>
    <v-text-field v-model="inputValorMinimo" v-bind:mask="mask" return-masked-value clearable label="Valor Mínimo" append-icon="attach_money"></v-text-field>
    <v-text-field v-model="inputValorMaximo" v-bind:mask="mask" return-masked-value clearable label="Valor Máximo" append-icon="attach_money"></v-text-field>
    <v-text-field v-model="inputCorpo" clearable label="Busca Interna" append-icon="search"></v-text-field>
    <v-select v-bind:items="tipos" v-model="tipo" label="Tipo" autocomplete clearable class="select" append-icon="tune"></v-select>
    <v-select v-bind:items="orgaos" v-model="orgao" label="Orgão" autocomplete clearable class="select" append-icon="tune"></v-select>
    <v-select v-bind:items="suborgaos" v-model="suborgao" label="Jurisdicionado" autocomplete clearable class="select" append-icon="tune"></v-select>
    <v-select v-bind:items="macrorregioes" v-model="macrorregiao" item-text="nome" item-value="id" label="Macrorregião" autocomplete clearable class="select" append-icon="tune"></v-select>
    <v-select v-bind:items="classes" v-model="classe" item-text="nome" item-value="id" label="Tema" autocomplete clearable class="select" append-icon="tune"></v-select>
  </v-list>
</template>

<script>
import moment from 'moment'

export default {
  name: 'ThePredicoesTableVerticalFilter',
  props: {
    tipos: { type: Array },
    orgaos: { type: Array },
    suborgaos: { type: Array },
    macrorregioes: { type: Array },
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

      startingDate: moment.utc().format('YYYY-MM-DD'),
      endingDate: null,
      valorMinimo: null,
      valorMaximo: null,
      corpo: null,
      tipo: null,
      orgao: null,
      suborgao: null,
      macrorregiao: null,
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
        orgao: this.orgao,
        suborgao: this.suborgao,
        macrorregiao: this.macrorregiao,
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
