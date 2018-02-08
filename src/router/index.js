import Vue from 'vue'
import VueRouter from 'vue-router'

import Blacklist from '../views/Blacklist'
import Busca from '../views/Busca'
import Crowdsourcer from '../views/Crowdsourcer'
import Home from '../views/Home'
import Keywords from '../views/Keywords'
import Predicao from '../views/Predicao'


Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      name: 'blacklist',
      path: '/blacklist',
      component: Blacklist
    },
    {
      name: 'busca',
      path: '/busca',
      component: Busca
    },
    {
      name: 'crowdsourcer',
      path: '/crowdsourcer/:id',
      component: Crowdsourcer
    },
    {
      name: 'crowdsourcerRandom',
      path: '/crowdsourcer',
      component: Crowdsourcer
    },
    {
      name: 'home',
      path: '/',
      component: Home
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
