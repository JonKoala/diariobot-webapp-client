<template>
  <div>
    <p>
      tipo: <span>{{publicacao.tipo}}</span>
      data: <span>{{dataString}}</span>
    </p>
    <p>
      orgão: <span>{{publicacao.orgao}}</span>
      subórgão: <span>{{publicacao.suborgao}}</span>
    </p>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'VPublicacaoViewerHeader',
  props: {
    publicacao: { type: Object, required: true }
  },
  computed: {
    dataString () {
      return (this.publicacao.data) ? moment(this.publicacao.data).format('DD/MM/YYYY') : null;
    }
  }
}
</script>

<style scoped>

div {
  display: inline-block;

  font-family: 'Roboto', 'Noto', sans-serif;
  text-transform: uppercase;
  color: #757575;
  line-height: 20px;
}

span {
  font-weight: bold;
  text-decoration: underline;
  margin-right: 20px
}

</style>
