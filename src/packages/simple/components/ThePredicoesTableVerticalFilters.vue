<template>
  <v-container fluid class="pb-0">
    <v-layout column>
      <base-date-picker v-model="startingDate" label="Data Inicial"></base-date-picker>
      <base-date-picker v-model="endingDate" label="Data Final"></base-date-picker>
      <base-debounce-input v-model="corpo" clearable label="Busca Interna" append-icon="search"></base-debounce-input>
      <base-debounce-input v-model="valorMinimo" v-bind:mask="moneyMask" return-masked-value clearable label="Valor Mínimo" append-icon="attach_money"></base-debounce-input>
      <base-debounce-input v-model="valorMaximo" v-bind:mask="moneyMask" return-masked-value clearable label="Valor Máximo" append-icon="attach_money"></base-debounce-input>
      <v-autocomplete v-bind:items="tipos" v-model="tipo" label="Tipo" clearable append-icon="tune"></v-autocomplete>
      <v-autocomplete v-bind:items="orgaos" v-model="orgao" label="Orgão" clearable append-icon="tune"></v-autocomplete>
      <v-autocomplete v-bind:items="suborgaos" v-model="suborgao" label="Jurisdicionado" clearable append-icon="tune"></v-autocomplete>
      <v-autocomplete v-bind:items="macrorregioes" v-model="macrorregiao" item-text="nome" item-value="id" label="Macrorregião" clearable append-icon="tune"></v-autocomplete>
      <v-autocomplete v-bind:items="classes" v-model="classe" item-text="nome" item-value="id" label="Tema" clearable append-icon="tune"></v-autocomplete>
    </v-layout>
  </v-container>
</template>

<script>
import BaseDebounceInput from 'components/BaseDebounceInput'
import BaseDatePicker from 'components/BaseDatePicker'

import PredicoesTableFiltersBehaviour from 'mixins/PredicoesTableFiltersBehaviour'

export default {
  name: 'ThePredicoesTableVerticalFilters',
  components: {
    BaseDatePicker,
    BaseDebounceInput
  },
  mixins: [PredicoesTableFiltersBehaviour],
  props: {
    defaultStartingDate: { type: String, default: null }
  },
  data () {
    return {
      startingDate: this.defaultStartingDate
    };
  }
}

</script>
