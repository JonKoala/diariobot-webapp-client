<template>
  <div class="buttons-area" >
    <button v-for="(entry, index) in entries" v-bind:style="{backgroundColor: colors[index]}" v-on:click="buttonClicked(entry.identity)" >{{entry.text}}</button>
  </div>
</template>

<script>
import ApiService from '../common/api.service'
import ColorScheme from '../common/color.scheme'

export default {
  name: 'VDynamicButtonsArea',
  data() {
    return {
      colors: ColorScheme.classes
    };
  },
  props: {
    entries: { type: Array, required: true }
  },
  methods: {
    buttonClicked(classe) {
      this.$emit('click', classe);
    }
  }
}
</script>

<style scoped>

  /* source for the dynamic positioning behaviour: https://www.fourkitchens.com/blog/article/responsive-multi-column-lists-flexbox/ */

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

  button:active {
    border-width: medium;
    border-style: solid;
  }

</style>
