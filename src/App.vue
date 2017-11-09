<template>
  <div id="app">
    {{msg}}
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Testing 1 2 3'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
