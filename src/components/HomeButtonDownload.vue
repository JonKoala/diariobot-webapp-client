<template>
  <json-excel v-bind:fetch="requestFetchData" v-bind:fields="template" name="DIARIOBOT" >
    <base-icon-button v-bind="{ disabled }" tooltip="Exportar em Excel" left flat>{{ icon }}</base-icon-button>
  </json-excel>
</template>

<script>
import JsonExcel from "vue-json-excel"
import moment from 'moment'

import ApiService from 'services/api.service'
import PublicacaoFonteSchema from 'services/publicacao.fonte.schema'

import { QUERY, VIEW_HOME } from 'store/namespaces'

import BaseIconButton from 'components/BaseIconButton'

export default {
  name: 'HomeButtonDownload',
  components: {
    BaseIconButton,
    JsonExcel
  },
  data () {
    return {
      disabled: false,
      template: {
        'Matéria': 'materia',
        'Tipo': 'tipo',
        'Orgão': 'orgao',
        'Jurisdicionado': 'suborgao',
        'Data': 'data',
        'Valor (R$)': 'valor',
        'Fonte': 'fonte',
        'Tema': 'classe',
        'Corpo': 'corpo'
      },
    }
  },
  computed: {
    icon () {
      return this.disabled ? 'pending' : 'get_app'
    }
  },
  methods: {
    async requestFetchData () {
      if (!this.disabled)
        return this.fetchData() 
    },
    async fetchData () {
      this.disabled = true
      try {
        let params = this.$store.getters[`${VIEW_HOME}/${QUERY}/params`]
        let response = await ApiService.get('predicoes/paginable', { params })
        if (response != null) {
          return response['rows'].map(predicao => {
            return {
              ...predicao,
              data: moment.utc(predicao.data).format('DD/MM/YYYY'),
              valor: (predicao.valor) ? predicao.valor.toLocaleString('pt-br', { minimumFractionDigits: 2 }) : null,
              fonte: PublicacaoFonteSchema[predicao.fonte]
            }
          })
        }
      } catch (err) {
        console.log(err)
      } finally {
        this.disabled = false
      }
    }
  }
}
</script>