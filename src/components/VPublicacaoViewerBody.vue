<template>
  <div class="content-block white blue-grey--text text--darken-3">
    <div class="centered">
      <pre v-html="publicacao"></pre>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'VPublicacaoViewerBody',
    props: {
      publicacao: { type: String }
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
