import Vue from 'vue'
import VueRouter from 'vue-router'

import TheRandom from '../views/TheRandom'
import TheClassifier from '../views/TheClassifier'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      name: 'random',
      path: '/',
      component: TheRandom
    },
    {
      name: 'classifier',
      path: '/:id',
      component: TheClassifier,
    }
  ],
  mode: 'history'
})
