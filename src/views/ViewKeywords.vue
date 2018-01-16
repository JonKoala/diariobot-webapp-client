<template>
  <div id="container">
    <div class="classe" v-for="(classe, index) in classes">
      <p class="classe-header" v-bind:style="{backgroundColor: colors[index]}">{{ classe.nome }}</p>
      <p class="classe-keyword" v-bind:style="{color: colors[index]}" v-for="keyword in classe.keywords">{{ keyword.palavra }}</p>
    </div>
  </div>
</template>

<script>
import ApiService from '../common/api.service'
import ColorScheme from '../common/color.scheme'

export default {
  name: 'ViewKeywords',
  data() {
    return {
      classes: [],
      colors: ColorScheme.classes
    };
  },
  mounted() {
    ApiService.get(`classes/keywords`).then(classes => {
      this.classes = classes.filter(classe => classe.keywords.length > 0).sort((a, b) => { return a.ordem - b.ordem });
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
    flex-grow: 1;
    margin: 0px 2px;
  }

  .classe-header {
    padding: 10px 0px 10px;

    text-align: center;
    color: white;
  }

  .classe-keyword {
    padding-left: 5px;
    border-bottom-style: solid;
    border-bottom-width: thin;
  }

</style>
