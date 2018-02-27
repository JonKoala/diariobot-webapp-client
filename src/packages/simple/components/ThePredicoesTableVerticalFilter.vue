<template>
  <v-list dense>
    <base-date-picker label="Data Inicial" v-model="startingDate"></base-date-picker>
    <base-date-picker label="Data Final" v-model="endingDate"></base-date-picker>
    <base-debounce-input v-model="valorMinimo" v-bind:mask="mask" return-masked-value clearable label="Valor Mínimo" append-icon="attach_money"></base-debounce-input>
    <base-debounce-input v-model="valorMaximo" v-bind:mask="mask" return-masked-value clearable label="Valor Máximo" append-icon="attach_money"></base-debounce-input>
    <base-debounce-input v-model="corpo" clearable label="Busca Interna" append-icon="search"></base-debounce-input>
    <v-select v-bind:items="tipos" v-model="tipo" label="Tipo" autocomplete clearable class="select" append-icon="tune"></v-select>
    <v-select v-bind:items="orgaos" v-model="orgao" label="Orgão" autocomplete clearable class="select" append-icon="tune"></v-select>
    <v-select v-bind:items="suborgaos" v-model="suborgao" label="Jurisdicionado" autocomplete clearable class="select" append-icon="tune"></v-select>
    <v-select v-bind:items="macrorregioes" v-model="macrorregiao" item-text="nome" item-value="id" label="Macrorregião" autocomplete clearable class="select" append-icon="tune"></v-select>
    <v-select v-bind:items="classes" v-model="classe" item-text="nome" item-value="id" label="Tema" autocomplete clearable class="select" append-icon="tune"></v-select>
  </v-list>
</template>

<script>
import moment from 'moment'

import BaseDebounceInput from 'components/BaseDebounceInput'
import BaseDatePicker from 'components/BaseDatePicker'

export default {
  name: 'ThePredicoesTableVerticalFilter',
  components: {
    BaseDatePicker,
    BaseDebounceInput
  },
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
    }
  },
  watch: {
    filterArguments (newValue) {
      this.$emit('filterChanged', this.filterArguments);
    }
  }
}

</script>
