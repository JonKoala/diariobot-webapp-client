import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home'
import Crowdsourcer from '../views/Crowdsourcer'
import Keywords from '../views/Keywords'
import Predicao from '../views/Predicao'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home
    },
    {
      name: 'crowdsourcerRandom',
      path: '/crowdsourcer',
      component: Crowdsourcer
    },
    {
      name: 'crowdsourcer',
      path: '/crowdsourcer/:id',
      component: Crowdsourcer
    },
    {
      name: 'keywords',
      path: '/keywords',
      component: Keywords
    },
    {
      name: 'predicao',
      path: '/predicao/:id',
      component: Predicao
    }
  ],
  mode: 'history'
})
