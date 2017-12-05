<template>
  <div class="buttons-area" >
    <button v-for="(entry, index) in entries" :class="colors[index]" v-on:click="classify(entry.identity)" >{{entry.text}}</button>
  </div>
</template>

<script>
import ApiService from '../common/api.service'

export default {
  name: 'VPublicacaoClassButtonsArea',
  data() {
    return {
      colors: [
        'green', 'orange', 'purple', 'red', 'brown', 'teal',
        'blue', 'gray', 'lime', 'indigo', 'white', 'ember'
      ]
    };
  },
  props: {
    entries: { type: Array, required: true }
  },
  methods: {
    classify(classe) {
      this.$emit('classify', classe);
    }
  }
}
</script>

<style scoped>

  /* source: https://www.fourkitchens.com/blog/article/responsive-multi-column-lists-flexbox/ */

  .buttons-area {
    display: flex;
  	flex-wrap: wrap;
    margin-left: -10px;
  }

  button {
    /* positioning */
    flex: 1 0 300px;
    box-sizing: border-box;
    margin-left: 10px;

    /* styling */
    margin-top: 10px;
    height: 80px;
    outline: none;
    border: none;
    border-radius: 5px;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 15px;
  }

  @media (min-width: 410px) {
    button {
      max-width: calc(50% - 10px);
    }
  }
  @media (min-width: 620px) {
    button {
      max-width: calc(33.33333% - 10px);
    }
  }
  @media (min-width: 830px) {
    button {
      max-width: calc(25% - 10px);
    }
  }
  @media (min-width: 1040px) {
    button {
      max-width: calc(20% - 10px);
    }
  }
  @media (min-width: 1250px) {
    button {
      max-width: calc(16.66667% - 10px);
    }
  }
  @media (min-width: 1460px) {
    button {
      min-width: calc(14.28571% - 10px);
    }
  }

  .green { background-color: #4CAF50; }
  .orange { background-color: #FF9800; }
  .purple { background-color: #9C27B0; }
  .red { background-color: #F44336; }
  .brown { background-color: #795548; }
  .teal { background-color: #009688; }
  .blue { background-color: #2196F3; }
  .gray { background-color: #424242; }
  .lime { background-color: #827717; }
  .indigo { background-color: #3f51b5; }
  .white { background-color: #ffffff; color: black; border-width: thin; border-style: solid; }
  .ember { background-color: #ff6f00; }

  button:active {
    border-width: medium;
    border-style: solid;
  }

</style>
