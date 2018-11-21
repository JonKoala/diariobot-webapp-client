<template>
  <div class="content-block white blue-grey--text text--darken-3">
    <div class="centered">
      <pre v-html="text"></pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseScrollableText',
  props: {
    text: { type: String, required: true }
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
