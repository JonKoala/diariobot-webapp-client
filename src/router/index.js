import Vue from 'vue'
import VueRouter from 'vue-router'

import ViewCrowdsourcerRandom from '../views/ViewCrowdsourcerRandom'
import ViewCrowdsourcer from '../views/ViewCrowdsourcer'

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
    }
  ],
  mode: 'history'
})
