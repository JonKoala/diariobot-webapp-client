<template>
  <div>
    <div class="header-block" >
      <p>
        tipo: <span class="entry">{{publicacao.tipo}}</span>
        data: <span class="entry">{{dataString}}</span>
      </p>
      <p>
        orgão: <span class="entry">{{publicacao.orgao}}</span>
        subórgão: <span class="entry">{{publicacao.suborgao}}</span>
      </p>
      <p class="materia-line"><a v-bind:href="publicacaoLink" target="_blank">{{publicacao.materia}}</a></p>
    </div>
    <div class="content-block">
      <div class="centered">
        <pre v-html="publicacao.corpo"></pre>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'VPublicacaoViewer',
  props: {
    publicacao: { type: Object, required: true }
  },
  computed: {
    dataString () {
      return (this.publicacao.data) ? moment(this.publicacao.data).format('DD/MM/YYYY') : null;
    },
    publicacaoLink () {
      return `http://ioes.dio.es.gov.br/apifront/portal/edicoes/publicacoes_ver_conteudo/${this.publicacao.identificador}`
    }
  }
}
</script>

<style scoped>

pre {
  margin: unset;
  padding: 10px;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: justify;
  color: #455a64;
  line-height: 18px;
  white-space: pre-wrap;
}

.header-block {
  font-family: 'Roboto', 'Noto', sans-serif;
  text-transform: uppercase;
  color: #757575;
  line-height: 20px;
}

.entry {
  font-weight: bold;
  text-decoration: underline;
  margin-right: 20px
}

.materia-line {
  margin-top: 40px;
  margin-bottom: 0px;

  font-weight: bold;
  color: #455a64;
}

.content-block {
  height: 300px;
  width: 100%;
  overflow: auto;

  border-radius: 10px;
  background-color: #eff0f1;
}

.content-block:before {
  content: '';

  height: 100%;
  display: inline-block;
  vertical-align: middle;
}

.centered {
  display: inline-block;
  vertical-align: middle;
}

</style>
