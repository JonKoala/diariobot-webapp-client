<template>
    <v-navigation-drawer clipped fixed app>
      <v-list dense>
        <template v-for="item in items">
          <v-list-group v-if="item.items" v-bind:key="item.text">
            <v-list-tile slot="item" @click="">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.text }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
	              <v-icon>keyboard_arrow_down</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile v-for="subItem in item.items" v-bind:key="subItem.text" v-bind:to="subItem.href" @click="">
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else v-bind:to="item.href" @click="">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
  export default {
    name: 'TheNavigationBar',
    data () {
      return {
        items: [
          { text: 'Crowdsourcer', icon: 'people', href: '/crowdsourcer' },
          { text: 'Resultados', icon: 'dashboard', items: [
            { text: 'Busca', href: '/busca' },
            { text: 'Keywords', href: '/keywords' }
          ]}
        ]
      }
    }
  }
</script>
