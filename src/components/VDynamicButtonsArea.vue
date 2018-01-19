<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs2 v-for="(entry, index) in entries" v-bind:key="entry.identity" >
        <v-btn block v-on:click="buttonClicked(entry.identity)" class="button" v-bind:style="{backgroundColor: colors[index]}" >{{ entry.text }}</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
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
    buttonClicked(entity) {
      this.$emit('click', entity);
    }
  }
}
</script>

<style scoped>

  .button {
    height: 80px;
  }

  .button >>> .btn__content {
    width: fit-content;
    white-space: normal;
  }

</style>
