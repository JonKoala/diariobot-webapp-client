import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './views/Home'


Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home
    }
  ],
  mode: 'history'
})
