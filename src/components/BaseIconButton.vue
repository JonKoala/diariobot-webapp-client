<template>
  <v-tooltip v-bind="{top, right, bottom, left}" v-bind:disabled="!hasTooltip">
    <v-btn v-on="$listeners" v-bind="{disabled, flat, href, target, to}" slot="activator" class="ma-0" v-bind:style="{ cursor: cursor }" icon>
      <v-icon v-bind="{color}"><slot></slot></v-icon>
    </v-btn>
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'BaseIconButton',
  props: {
    cursor: { type: String, default: 'pointer' },
    disabled: { type: Boolean },
    color: { type: String },
    flat: { type: Boolean },
    tooltip: { type: String },

    // Link
    href: { type: String },
    target: { type: String },
    to: { type: String },

    // Position
    top: { type: String },
    right: { type: String },
    bottom: { type: String },
    left: { type: String },
  },
  computed: {
    hasTooltip () {
      return Boolean(this.tooltip)
    },
    style () {
      return { cursor: this.cursor }
    }
  }
}
</script>
