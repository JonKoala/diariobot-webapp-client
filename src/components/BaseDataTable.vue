<template>
  <v-container>
    <v-data-table
      v-show="showTable"
      v-bind:loading="showLoadingBar"
      v-bind:items="items"
      v-bind:headers="headers"
      v-bind:total-items="items.length"
      v-bind:disable-initial-sort="true"
      v-on:update:pagination="onChangePagination"
      hide-actions>
      <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <slot name="items" v-bind="props">
          <tr>
            <td v-for="prop in Object.keys(props.item)" >{{ props.item[prop] }}</td>
          </tr>
        </slot>
      </template>
    </v-data-table>
    <v-alert v-bind:value="showEmptyDataAlert" class="my-0" color="warning" icon="priority_high">Nenhum dado encontrado</v-alert>
    <v-alert v-bind:value="showErrorAlert" class="my-0" color="error" icon="warning">{{ error }}</v-alert>
  </v-container>
</template>

<script>

export default {
  name: 'BaseDataTable',
  props: {
    error: { type: String },
    isLoading: { type: Boolean },
    lines: { type: Array },
    value: { type: Object }
  },
  computed: {
    isNull () {
      return this.lines == null
    },
    isEmpty () {
      return this.lines instanceof Array && this.lines.length === 0
    },

    showTable () {
      return !this.error && !this.isNull && !this.isEmpty
    },
    showLoadingBar () {
      return this.isLoading
    },
    showErrorAlert () {
      return Boolean(this.error)
    },
    showEmptyDataAlert () {
      return !this.error && this.isEmpty
    },

    items () {
      return (this.isNull) ? [] : this.lines
    },
    headers () {
      if (this.isNull || this.isEmpty)
        return []

      var sample = this.lines[0]
      return Object.keys(sample).map(label => {
        return { text: label.toUpperCase(), value: label, align: 'center' }
      });
    }
  },
  methods: {
    onChangePagination (pagination) {
      var newSortObj = { descending: pagination.descending, sortBy: pagination.sortBy }
      if (JSON.stringify(newSortObj) != JSON.stringify(this.value))
        this.$emit('input', newSortObj)
    }
  }
}
</script>
