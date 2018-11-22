<template>
    <v-text-field v-bind:value="value" v-on:input="updateValue" v-bind="{returnMaskedValue, mask, clearable, label, appendIcon, hideDetails}" ></v-text-field>
</template>

<script>

export default {
  name: 'BaseDebounceInput',
  props: {
    value: String,
    milliseconds: { type: Number, default: 500 },

    returnMaskedValue: { type: Boolean },
    clearable: { type: Boolean },
    label: { type: String },
    appendIcon: { type: String },
    mask: { type: String },
    hideDetails: { type: Boolean }
  },
  data () {
    return {
      timeout: null,
      inputValue: null
    }
  },
  methods: {
    updateValue (newValue) {
      window.clearTimeout(this.timeout)
      this.timeout = window.setTimeout(this.emitValue.bind(this, newValue), this.milliseconds)
    },
    emitValue (newValue) {
      this.$emit('input', newValue)
    }
  }
}

</script>
