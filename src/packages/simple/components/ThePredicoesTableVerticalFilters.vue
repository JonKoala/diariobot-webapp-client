<template>
  <v-list dense>
    <base-date-picker label="Data Inicial" v-model="startingDate"></base-date-picker>
    <base-date-picker label="Data Final" v-model="endingDate"></base-date-picker>
    <base-debounce-input v-model="valorMinimo" v-bind:mask="moneyMask" return-masked-value clearable label="Valor Mínimo" append-icon="attach_money"></base-debounce-input>
    <base-debounce-input v-model="valorMaximo" v-bind:mask="moneyMask" return-masked-value clearable label="Valor Máximo" append-icon="attach_money"></base-debounce-input>
    <base-debounce-input v-model="corpo" clearable label="Busca Interna" append-icon="search"></base-debounce-input>
    <v-select v-bind:items="tipos" v-model="tipo" label="Tipo" autocomplete clearable class="select" append-icon="tune"></v-select>
    <v-select v-bind:items="orgaos" v-model="orgao" label="Orgão" autocomplete clearable class="select" append-icon="tune"></v-select>
    <v-select v-bind:items="suborgaos" v-model="suborgao" label="Jurisdicionado" autocomplete clearable class="select" append-icon="tune"></v-select>
    <v-select v-bind:items="macrorregioes" v-model="macrorregiao" item-text="nome" item-value="id" label="Macrorregião" autocomplete clearable class="select" append-icon="tune"></v-select>
    <v-select v-bind:items="classes" v-model="classe" item-text="nome" item-value="id" label="Tema" autocomplete clearable class="select" append-icon="tune"></v-select>
  </v-list>
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
