<template>
  <v-container>
    <v-layout row wrap justify-space-around>
      <v-flex xs2>
        <base-date-picker label="Data Inicial" v-model="startingDate"></base-date-picker>
      </v-flex>
      <v-flex xs2>
        <base-date-picker label="Data Final" v-model="endingDate"></base-date-picker>
      </v-flex>
      <v-flex xs2>
        <base-debounce-input v-model="valorMinimo" v-bind:mask="moneyMask" return-masked-value clearable label="Valor Mínimo" append-icon="attach_money"></base-debounce-input>
      </v-flex>
      <v-flex xs2>
        <base-debounce-input v-model="valorMaximo" v-bind:mask="moneyMask" return-masked-value clearable label="Valor Máximo" append-icon="attach_money"></base-debounce-input>
      </v-flex>
      <v-flex xs2>
        <base-debounce-input v-model="corpo" clearable label="Busca Interna" append-icon="search"></base-debounce-input>
      </v-flex>
    </v-layout>
    <v-layout justify-space-around row wrap>
      <v-flex xs2>
        <v-select v-bind:items="tipos" v-model="tipo" label="Tipo" autocomplete clearable class="select" append-icon="tune"></v-select>
      </v-flex>
      <v-flex xs2>
        <v-select v-bind:items="orgaos" v-model="orgao" label="Orgão" autocomplete clearable class="select" append-icon="tune"></v-select>
      </v-flex>
      <v-flex xs2>
        <v-select v-bind:items="suborgaos" v-model="suborgao" label="Jurisdicionado" autocomplete clearable class="select" append-icon="tune"></v-select>
      </v-flex>
      <v-flex xs2>
        <v-select v-bind:items="macrorregioes" v-model="macrorregiao" item-text="nome" item-value="id" label="Macrorregião" autocomplete clearable class="select" append-icon="tune"></v-select>
      </v-flex>
      <v-flex xs2>
        <v-select v-bind:items="classes" v-model="classe" item-text="nome" item-value="id" label="Tema" autocomplete clearable class="select" append-icon="tune"></v-select>
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

<style scoped>

  .select >>> .input-group__selections__comma {
    white-space: nowrap;

    overflow:hidden !important;
    text-overflow: ellipsis;
  }

</style>
