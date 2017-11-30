<template>
    <button v-on:click="click" >{{text}}</button>
</template>

<script>

export default {
  name: 'VPublicacaoButtonBig',
  props: {
    text: { type: String, required: true }
  },
  methods: {
    click() {
      this.$emit('click')
    }
  }
}
</script>
