import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home'
import ViewCrowdsourcerRandom from '../views/ViewCrowdsourcerRandom'
import ViewCrowdsourcer from '../views/ViewCrowdsourcer'
import ViewKeywords from '../views/ViewKeywords'
import ViewPredicao from '../views/ViewPredicao'
import ViewBusca from '../views/ViewBusca'

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
      component: ViewCrowdsourcerRandom
    },
    {
      name: 'crowdsourcer',
      path: '/crowdsourcer/:id',
      component: ViewCrowdsourcer
    },
    {
      name: 'keywords',
      path: '/keywords',
      component: ViewKeywords
    },
    {
      name: 'predicao',
      path: '/predicao/:id',
      component: ViewPredicao
    },
    {
      name: 'busca',
      path: '/busca',
      component: ViewBusca
    }
  ],
  mode: 'history'
})
