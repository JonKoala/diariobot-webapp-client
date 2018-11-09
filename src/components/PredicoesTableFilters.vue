<template>
  <v-container>
    <v-layout row justify-space-around>
      <v-flex xs2>
        <base-date-picker v-model="startingDate" label="Data Inicial" hide-details></base-date-picker>
      </v-flex>
      <v-flex xs2>
        <base-date-picker v-model="endingDate" label="Data Final" hide-details></base-date-picker>
      </v-flex>
      <v-flex xs2>
        <base-debounce-input v-model="corpo" clearable label="Busca Interna" append-icon="search" hide-details></base-debounce-input>
      </v-flex>
      <v-flex xs2>
        <base-debounce-input v-model="valorMinimo" v-bind:mask="moneyMask" return-masked-value clearable label="Valor Mínimo" append-icon="attach_money" hide-details></base-debounce-input>
      </v-flex>
      <v-flex xs2>
        <base-debounce-input v-model="valorMaximo" v-bind:mask="moneyMask" return-masked-value clearable label="Valor Máximo" append-icon="attach_money" hide-details></base-debounce-input>
      </v-flex>
    </v-layout>
    <v-layout row justify-space-around>
      <v-flex xs2>
        <v-autocomplete v-bind:items="tipos" v-model="tipo" label="Tipo" clearable append-icon="tune" hide-details></v-autocomplete>
      </v-flex>
      <v-flex xs2>
        <v-autocomplete v-bind:items="orgaos" v-model="orgao" label="Orgão" clearable append-icon="tune" hide-details></v-autocomplete>
      </v-flex>
      <v-flex xs2>
        <v-autocomplete v-bind:items="suborgaos" v-model="suborgao" label="Jurisdicionado" clearable append-icon="tune" hide-details></v-autocomplete>
      </v-flex>
      <v-flex xs2>
        <v-autocomplete v-bind:items="macrorregioes" v-model="macrorregiao" item-text="nome" item-value="id" label="Macrorregião" clearable append-icon="tune" hide-details></v-autocomplete>
      </v-flex>
      <v-flex xs2>
        <v-autocomplete v-bind:items="classes" v-model="classe" item-text="nome" item-value="id" label="Tema" clearable append-icon="tune" hide-details></v-autocomplete>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import BaseDebounceInput from 'components/BaseDebounceInput'
import BaseDatePicker from 'components/BaseDatePicker'

import PredicoesTableFiltersBehaviour from 'mixins/PredicoesTableFiltersBehaviour'

export default {
  name: 'PredicoesTableFilters',
  components: {
    BaseDatePicker,
    BaseDebounceInput
  },
  mixins: [PredicoesTableFiltersBehaviour]
}
</script>
