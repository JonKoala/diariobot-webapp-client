<template>
  <div class="buttons-area">
    <button class="green" v-on:click="classify(1)">SAÚDE E ASSISTÊNCIA SOCIAL</button>
    <button class="red" v-on:click="classify(2)">EDUCAÇÃO E SEGURANÇA PÚBLICA</button>
    <button class="purple" v-on:click="classify(3)">ENGENHARIA E MEIO AMBIENTE</button>
    <button class="blue" v-on:click="classify(4)">TECNOLOGIA DA INFORMAÇÃO</button>
    <button class="gray" v-on:click="classify(5)">GERAL</button>
    <button class="teal" v-on:click="classify(6)">MULTIPLOS TIPOS</button>
    <button class="orange" v-on:click="classify(null)">Não sei</button>
  </div>
</template>

<script>
import ApiService from '../common/api.service'

export default {
  name: 'VPublicacaoClassButtonsArea',
  methods: {
    classify(classe) {
      this.$emit('classify', classe);
    }
  }
}
</script>

<style scoped>

  .buttons-area {
    display: flex;
    flex-wrap: wrap;
    height: 200px
  }

  button {
    margin: 20px;
    width: 12vw;
    height: 100px;

    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 15px;
  }

  .green { background-color: #4CAF50; }
  .red { background-color: #F44336; }
  .orange { background-color: #FF9800; }
  .purple { background-color: #9C27B0; }
  .blue { background-color: #2196F3; }
  .gray { background-color: #795548; }
  .teal { background-color: #009688; }

</style>
