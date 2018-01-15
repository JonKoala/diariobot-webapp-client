<template>
  <div id="container">
    <div class="classe" v-for="(classe, index) in classes">
      <p class="classe-header" v-bind:style="{backgroundColor: colors[index]}">{{ classe.nome }}</p>
      <p v-bind:style="{color: colors[index]}" v-for="keyword in classe.keywords">{{ keyword.palavra }}</p>
    </div>
  </div>
</template>

<script>
import ApiService from '../common/api.service'

export default {
  name: 'ViewKeywords',
  data() {
    return {
      classes: [],
      colors: [
        '#4CAF50', '#FF9800', '#9C27B0', '#F44336', '#795548', '#009688',
        '#2196F3', '#424242', '#827717', '#3f51b5'
      ]
    };
  },
  mounted() {
    ApiService.get(`classes/keywords`).then(classes => {
      this.classes = classes.filter(classe => classe.keywords.length > 0)
    });
  },
}
</script>

<style scoped>
  #container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }

  .classe {
    width: 23vw;
    display: flex;
  	flex-wrap: wrap;
    flex-direction: column;

    margin: 2px;
  }

  .classe-header {
    padding: 10px 0px 10px;

    text-align: center;
    font-size: 15px;
    color: white;
  }

</style>
