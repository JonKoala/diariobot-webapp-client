import Vue from 'vue'
import VueRouter from 'vue-router'

import ViewCrowdsourcerRandom from '../views/ViewCrowdsourcerRandom'
import ViewCrowdsourcer from '../views/ViewCrowdsourcer'
import ViewKeywords from '../views/ViewKeywords'
import ViewPredicao from '../views/ViewPredicao'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
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
    }
  ],
  mode: 'history'
})
