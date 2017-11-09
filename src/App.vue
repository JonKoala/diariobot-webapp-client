<template>
  <div id="app">
    <pre>{{msg}}</pre>
  </div>
</template>

<script>
import apiService from './common/api.service'

export default {
  name: 'app',
  data () {
    return {
      msg: ''
    }
  },
  mounted() {
    apiService.get('publicacoes/rand').then(publicaca => {
      this.msg = publicaca.texto;
    });
  }
}
</script>

<style>
#app {
  margin: 10px;
}

pre {
  margin: unset;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: justify;
  color: #2c3e50;
  white-space: pre-wrap;
}
</style>
