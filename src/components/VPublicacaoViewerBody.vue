<template>
  <div class="content-block white blue-grey--text text--darken-3">
    <div class="centered">
      <pre v-html="formattedPublicacao"></pre>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

import RegexCollection from 'common/regex.collection'

export default {
  name: 'VPublicacaoViewerBody',
  props: {
    publicacao: { type: String },
    highlightMonetaryValue: { type: Boolean }
  },
  computed: {
    formattedPublicacao () {
      if (this.highlightMonetaryValue && this.publicacao)
        return this.publicacao.replace(RegexCollection.monetaryGlobal, function(match) {
          return '<b style="color:black;text-decoration:underline;">' + match + '</b>'
        });
      return this.publicacao;
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
    line-height: 18px;
    white-space: pre-wrap;
  }

  .content-block {
    height: 300px;
    width: 100%;
    overflow: auto;

    border-radius: 2px;
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
