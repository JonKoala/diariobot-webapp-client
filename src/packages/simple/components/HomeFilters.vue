<template>
  <v-container>
    <v-layout row justify-space-around>
      <v-flex xs2>
        <base-date-picker v-model="dataStart" label="Data Inicial" hide-details></base-date-picker>
      </v-flex>
      <v-flex xs2>
        <base-date-picker v-model="dataEnd" label="Data Final" hide-details></base-date-picker>
      </v-flex>
      <v-flex xs2>
        <base-debounce-input v-model="corpo" clearable label="Busca Interna" append-icon="search" hide-details></base-debounce-input>
      </v-flex>
      <v-flex xs2>
        <base-debounce-input v-model="valorMin" v-bind:mask="moneyMask" return-masked-value clearable label="Valor Mínimo" append-icon="attach_money" hide-details></base-debounce-input>
      </v-flex>
      <v-flex xs2>
        <base-debounce-input v-model="valorMax" v-bind:mask="moneyMask" return-masked-value clearable label="Valor Máximo" append-icon="attach_money" hide-details></base-debounce-input>
      </v-flex>
    </v-layout>
    <v-layout row justify-space-around>
      <v-flex xs2>
        <v-autocomplete v-model="tipo" v-bind:items="tipos" label="Tipo" clearable append-icon="tune" hide-details></v-autocomplete>
      </v-flex>
      <v-flex xs2>
        <v-autocomplete v-model="orgao" v-bind:items="orgaos" label="Orgão" clearable append-icon="tune" hide-details></v-autocomplete>
      </v-flex>
      <v-flex xs2>
        <v-autocomplete v-model="suborgao" v-bind:items="suborgaos" label="Jurisdicionado" clearable append-icon="tune" hide-details></v-autocomplete>
      </v-flex>
      <v-flex xs2>
        <v-autocomplete v-model="macrorregiao" v-bind:items="macrorregioes" item-text="nome" item-value="id" label="Macrorregião" clearable append-icon="tune" hide-details></v-autocomplete>
      </v-flex>
      <v-flex xs2>
        <v-autocomplete v-model="classe" v-bind:items="classes" item-text="nome" item-value="id" label="Tema" clearable append-icon="tune" hide-details></v-autocomplete>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import { QUERY, VIEW_HOME } from 'store/namespaces'
import {
  SET_CLASSE, SET_CORPO, SET_DATA_END, SET_DATA_START, SET_MACRORREGIAO,
  SET_ORGAO, SET_SUBORGAO, SET_TIPO, SET_VALOR_MAX, SET_VALOR_MIN
} from 'store/mutation.types'

import BaseDebounceInput from 'components/BaseDebounceInput'
import BaseDatePicker from 'components/BaseDatePicker'

export default {
  name: 'HomeFilters',
  components: {
    BaseDatePicker,
    BaseDebounceInput
  },
  data () {
    return {
      moneyMask: '############'
    }
  },
  computed: {
    ...mapGetters([
      'classes',
      'macrorregioes',
      'orgaos',
      'suborgaos',
      'tipos'
    ]),
    classe: {
      get () { return this.getValue('classe') },
      set (value) { this.setValue(SET_CLASSE, value) }
    },
    corpo: {
      get () { return this.getValue('corpo') },
      set (value) { this.setValue(SET_CORPO, value) }
    },
    dataEnd: {
      get () { return this.getValue('dataEn') },
      set (value) { this.setValue(SET_DATA_END, value) }
    },
    dataStart: {
      get () { return this.getValue('dataStart') },
      set (value) { this.setValue(SET_DATA_START, value) }
    },
    macrorregiao: {
      get () { return this.getValue('macrorregiao') },
      set (value) { this.setValue(SET_MACRORREGIAO, value) }
    },
    orgao: {
      get () { return this.getValue('orgao') },
      set (value) { this.setValue(SET_ORGAO, value) }
    },
    suborgao: {
      get () { return this.getValue('suborgao') },
      set (value) { this.setValue(SET_SUBORGAO, value) }
    },
    tipo: {
      get () { return this.getValue('tipo') },
      set (value) { this.setValue(SET_TIPO, value) }
    },
    valorMax: {
      get () { return this.castString(this.getValue('valorMax')) },
      set (value) { this.setValue(SET_VALOR_MAX, this.castNumber(value)) }
    },
    valorMin: {
      get () { return this.castString(this.getValue('valorMin')) },
      set (value) { this.setValue(SET_VALOR_MIN, this.castNumber(value)) }
    }
  },
  methods: {
    castNumber (value) {
      return (value) ? Number(value) : null
    },
    castString (value) {
      return (value) ? '' + value : null
    },
    getValue (getter) {
      return this.$store.getters[`${VIEW_HOME}/${QUERY}/${getter}`]
    },
    setValue (mutation, value) {
      this.$store.commit(`${VIEW_HOME}/${QUERY}/${mutation}`, value)
      this.$emit('input')
    }
  }
}
</script>
