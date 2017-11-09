<template>
  <div id="app">
    <pre>{{msg}}</pre>
  </div>
</template>

<script>
import getConfig from './common/appconfig'

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export default {
  name: 'app',
  data () {
    return {
      msg: ''
    }
  },
  mounted() {
    getConfig.then(config => {
      Vue.axios.get(`${config['api']['url']}/publicacoes/rand`)
        .then(response => {
          this.msg = response.data.texto;
        });
    })
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
