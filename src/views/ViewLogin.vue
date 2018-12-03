<template>
  <v-container fluid fill-height>
    <v-layout justify-center align-center>
      <v-flex xs3>
        <v-card>
          <v-toolbar color="blue" dense card>
            <v-toolbar-title class="white--text">LOGIN</v-toolbar-title>
          </v-toolbar>
          <v-progress-linear v-bind:active="isLoading" class="my-0" color="blue" indeterminate></v-progress-linear>
          <v-layout row wrap class="pa-2">
            <v-flex xs12>
              <v-text-field v-model="username" v-bind:disabled="isLoading" label="Usuário"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="password" v-bind:disabled="isLoading" type="password" label="Senha"></v-text-field>
            </v-flex>
            <v-btn v-on:click="login" v-bind:disabled="isLoading" color="blue" class="ml-0 mt-2 white--text">
              <v-icon left>vpn_key</v-icon>entrar
            </v-btn>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import { VIEW_LOGIN } from 'store/namespaces'
import { SET_PASSWORD, SET_USERNAME } from 'store/mutation.types'
import { LOGIN } from 'store/action.types'

export default {
  name: 'ViewLogin',
  computed: {
    ...mapGetters(VIEW_LOGIN, [
      'isLoading'
    ]),
    password: {
      get () { return this.$store.getters[`${VIEW_LOGIN}/password`] },
      set (value) { this.$store.commit(`${VIEW_LOGIN}/${SET_PASSWORD}`, value) }
    },
    username: {
      get () { return this.$store.getters[`${VIEW_LOGIN}/username`] },
      set (value) { this.$store.commit(`${VIEW_LOGIN}/${SET_USERNAME}`, value) }
    }
  },
  methods: {
    login () {
      this.$store.dispatch(`${VIEW_LOGIN}/${LOGIN}`)
    }
  }
}
</script>
