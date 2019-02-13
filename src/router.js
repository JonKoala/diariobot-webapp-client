import Vue from 'vue'
import VueRouter from 'vue-router'

import ViewPredicao from 'views/ViewPredicao'
import ViewHome from 'views/ViewHome'
import ViewLogin from 'views/ViewLogin'


Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      name: 'home',
      path: '/',
      component: ViewHome
    },
    {
      name: 'login',
      path: '/login',
      component: ViewLogin
    },
    {
      name: 'predicao',
      path: '/predicao/:id',
      component: ViewPredicao
    },
  ],
  mode: 'history'
})
