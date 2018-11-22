<template>
  <v-app id="app" light>

    <v-toolbar app fixed clipped-left>
      <v-toolbar-title>DIARIOBOT</v-toolbar-title>
      <v-spacer></v-spacer>
      <div>
        <p class="mb-0">O <b>DIARIOBOT</b> é um robô que usa inteligência artificial para classificar publicações feitas no Diário Oficial do Espírito Santo.</p>
        <p class="mb-0">Quer saber mais sobre ele?<v-btn @click.stop="isShowingDialog = true" flat small class="ma-0 pb-1">clique aqui</v-btn></p>
      </div>
    </v-toolbar>

    <v-content>
      <v-slide-x-transition mode="out-in">
        <router-view></router-view>
      </v-slide-x-transition>
    </v-content>

    <v-dialog v-model="isShowingDialog" width="45vw" scrollable>
      <app-informativo-dialog-content></app-informativo-dialog-content>
    </v-dialog>

  </v-app>
</template>

<script>
import { FETCH_CONSTANTS } from 'store/action.types'

import AppInformativoDialogContent from 'components/AppInformativoDialogContent'

export default {
  name: 'App',
  components: {
    AppInformativoDialogContent
  },
  data () {
    return {
      isShowingDialog: false
    }
  },
  created () {
    this.$store.dispatch(FETCH_CONSTANTS)
  }
}
</script>

<style>

  html {
    overflow: hidden;
  }

  .scrollable-container {
    position: relative;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .scrollable-content {
    position: absolute;
    width: 100%;
  }

</style>
