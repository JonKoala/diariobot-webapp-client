<template>
  <v-menu v-model="isExpanded" lazy v-bind:close-on-content-click="false" transition="scale-transition" offset-y full-width v-bind:nudge-right="40" max-width="290px" min-width="290px">
    <v-text-field slot="activator" v-bind:label="label" v-model="presentableDate" append-icon="event" readonly></v-text-field>
    <v-date-picker v-bind:value="value" v-on:input="updateValue" actions locale="pt-br" no-title scrollable>
      <template slot-scope="{ save, cancel }">
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" v-on:click="cancelPicker">Cancelar</v-btn>
          <v-btn flat color="primary" v-on:click="closePicker">Salvar</v-btn>
        </v-card-actions>
      </template>
    </v-date-picker>
  </v-menu>
</template>

<script>
import moment from 'moment'

export default {
  name: 'BaseDatePicker',
  props: {
    value: { type: String },
    label: { type: String }
  },
  data () {
    return {
      isExpanded: false
    }
  },
  methods: {
    updateValue (newValue) {
      this.$emit('input', newValue);
    },
    cancelPicker () {
      this.updateValue(null);
      this.closePicker();
    },
    closePicker() {
      this.isExpanded = false;
    },
  },
  computed: {
    presentableDate () {
      return (this.value) ? moment.utc(this.value).format('DD/MM/YYYY') : null;
    }
  }
}

</script>
