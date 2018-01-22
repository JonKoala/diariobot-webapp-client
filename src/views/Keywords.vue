<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs4 v-for="(classe, index) in classes" v-bind:key="classe.id">
        <v-toolbar v-bind:style="{backgroundColor: colors[index]}" height="48px" card>
          <v-toolbar-title style="margin:auto" class="white--text">{{ classe.nome }}</v-toolbar-title>
        </v-toolbar>
        <v-card class="pt-3 px-1" color="white" transition="slide-y-transition">
          <p class="classe-keyword" v-bind:style="{color: colors[index]}" v-for="keyword in classe.keywords">{{ keyword.palavra }}</p>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import ApiService from '../common/api.service'
  import ColorScheme from '../common/color.scheme'

  export default {
    name: 'Keywords',
    data() {
      return {
        classes: [],
        colors: ColorScheme.classes
      };
    },
    mounted() {
      ApiService.get(`classes/keywords`).then(classes => {
        this.classes = classes.filter(classe => classe.keywords.length > 0).sort((a, b) => { return a.ordem - b.ordem });
        for (let classe of this.classes)
          classe.show = false;
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
