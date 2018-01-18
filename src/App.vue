<template>
  <v-app id="app" dark>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>DIOES</v-toolbar-title>
    </v-toolbar>
    <the-navigation-bar></the-navigation-bar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-fade-transition mode="out-in">
            <router-view></router-view>
          </v-fade-transition>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2017</span>
    </v-footer>
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
