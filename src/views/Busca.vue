<template>

  <v-card class="pa-1" color="white">
    <v-data-table v-if="publicacoes.length > 0" v-bind:items="publicacoes" v-bind:headers="headers" hide-actions>
      <template slot="items" slot-scope="props">
        <td class="text-xs-right">{{ props.item.materia }}</td>
        <td class="text-xs-right">{{ props.item.tipo }}</td>
        <td class="text-xs-right">{{ props.item.categoria }}</td>
        <td class="text-xs-right">{{ props.item.orgao }}</td>
        <td class="text-xs-right">{{ props.item.suborgao }}</td>
        <td class="text-xs-right" v-bind:style="{color: colors[props.item.predicao.classe.ordem]}">{{ props.item.predicao.classe.nome }}</td>
        <td><v-btn icon @click="linkClicked(props.item.id)"><v-icon>link</v-icon></v-btn></td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import moment from 'moment'

import ApiService from '../common/api.service'
import ColorScheme from '../common/color.scheme'

export default {
  name: 'Busca',
  data () {
    return {
      colors: ColorScheme.classes,
      publicacoes: [],
      headers: [
        {text: 'MATÉRIA', value: 'materia'},
        {text: 'TIPO', value: 'tipo'},
        {text: 'CATEGORIA', value: 'categoria'},
        {text: 'ORGÃO', value: 'orgao'},
        {text: 'SUBÓRGÃO/JURISDICIONADO', value: 'suborgao'},
        {text: 'PREDIÇÃO', value: 'predicao.classe.nome'},
        {text: '', value: '', sortable: false}
      ]
    };
  },
  mounted () {
    ApiService.get('predicoes', {params: {data: moment().format('YYYY-MM-DD')}}).then(publicacoes => {
      this.publicacoes = publicacoes;
    });
  },
  methods: {
    linkClicked(id) {
      this.$router.push({name: 'predicao', params: {id: id}});
    }
  }
}
</script>
