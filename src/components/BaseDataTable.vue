<template>
  <v-container>
    <v-data-table
      v-show="showTable"
      v-bind:loading="showLoadingBar"
      v-bind:items="_lines"
      v-bind:headers="_headers"
      v-bind:total-items="_lines.length"
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
    headers: { type: Array },
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

    _lines () {
      return (this.isNull) ? [] : this.lines
    },
    _headers () {
      if (this.isNull || this.isEmpty)
        return []
      if (this.headers)
        return this.headers

      var sample = this.lines[0]
      return Object.keys(sample).map(label => {
        return { text: label.toUpperCase(), value: label }
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
