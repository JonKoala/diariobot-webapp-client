<template>
  <v-container fluid fill-height grid-list-md>
    <v-layout column>

      <v-flex xs12>
        <v-card>

          <v-toolbar color="blue-grey" dense card>
            <v-toolbar-title class="white--text">
              <base-icon-button v-bind:href="linkToOriginal" target="_blank" tooltip="Original" top color="white">link</base-icon-button>
              <span class="ml-4" v-bind:title="materia">{{ materia }}</span>
            </v-toolbar-title>
          </v-toolbar>

          <v-container fluid grid-list-md>
            <v-layout row wrap>

              <v-flex shrink v-for="item in headerItems" v-bind:key="item.title">
                <div class="infobox px-3 py-2">
                  <div class="caption text-uppercase primary--text">{{ item.title }}</div>
                  <div class="infobox-text">{{ item.value }}</div>
                </div>
              </v-flex>

            </v-layout>
          </v-container>

          <v-divider class="mt-1"></v-divider>

          <base-scrollable-text v-bind:text="highlightedCorpo"></base-scrollable-text>

        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card class="pa-1" v-bind:style="{backgroundColor: colors[classe.ordem]}" style="height:80px;width:200px">
          <v-card-text class="class-card white--text">{{ classe.nome }}</v-card-text>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'

import ColorScheme from 'services/color.scheme'
import RegexCollection from 'services/regex.collection'

import { PREDICAO, VIEW_PREDICAO } from 'store/namespaces'
import { FETCH_PREDICAO } from 'store/action.types'

import BaseIconButton from 'components/BaseIconButton'
import BaseScrollableText from 'components/BaseScrollableText'

export default {
  name: 'ViewPredicao',
  components: {
    BaseIconButton,
    BaseScrollableText
  },
  data () {
    return {
      colors: ColorScheme.classes
    }
  },
  computed: {
    ...mapGetters(`${VIEW_PREDICAO}/${PREDICAO}`, [
      'corpo',
      'classe',
      'data',
      'fonte',
      'identificador',
      'materia',
      'orgao',
      'suborgao',
      'tipo'
    ]),
    headerItems () {
      return [
        { title: 'tipo', value: this.tipo },
        { title: 'data', value: moment.utc(this.data).format('DD/MM/YYYY') },
        { title: 'orgão', value: this.orgao },
        { title: 'jurisdicionado', value: this.suborgao }
      ]
    },
    highlightedCorpo () {
      return (this.corpo) ? this.corpo.replace(RegexCollection.monetaryGlobal, (match) => { return '<span class="highlighted">' + match + '</span>' }) : null
    },
    linkToOriginal () {
      switch (this.fonte) {
        case 'amunes':
          return `https://www.diariomunicipal.es.gov.br/?q=id:${this.identificador}`
        case 'ioes':
          return `http://ioes.dio.es.gov.br/apifront/portal/edicoes/publicacoes_ver_conteudo/${this.identificador}`
      }
    }
  },
  created () {
    this.$store.dispatch(`${VIEW_PREDICAO}/${FETCH_PREDICAO}`)
  }
}
</script>

<style scoped>

  .infobox {
    background: rgba(0,0,0,0.06);
    border-radius: 4px 4px 0px 0px;
    border-bottom: thin solid;
  }

  .infobox-text {
    font-size: 16px;
  }

  .content-block >>> .highlighted {
    color: black;
    font-weight: 700;
    text-decoration: underline;
  }

  .class-card {
    display: flex;
    align-items: center;
    text-align: center;
    width: fit-content;
    white-space: normal;
    margin: auto;
    height: 100%;

    text-transform: uppercase;
    font-weight: 500;
  }

</style>
