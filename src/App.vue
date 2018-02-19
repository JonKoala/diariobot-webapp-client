<template>
  <v-app id="app" light>
    <v-toolbar app fixed clipped-left>
      <v-tooltip bottom>
        <v-btn to="/" @click="" slot="activator" class="ml-0" active-class="" icon>
          <v-icon>home</v-icon>
        </v-btn>
        <span>Home</span>
      </v-tooltip>
      <v-toolbar-title>DIOES</v-toolbar-title>
    </v-toolbar>
    <the-navigation-bar></the-navigation-bar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-start style="width:100%">
          <v-slide-x-transition mode="out-in">
            <router-view class="mt-0"></router-view>
          </v-slide-x-transition>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import TheNavigationBar from './components/TheNavigationBar'

  export default {
    name: 'App',
    components: {
      TheNavigationBar
    },
  }
</script>
