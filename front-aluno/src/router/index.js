import Vue from 'vue'
import VueRouter from 'vue-router'

import EHome from '@/components/EHome'
import EFriends from '@/components/EFriends'
import EConfigurations from '@/components/EConfigurations'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: EHome
    },
    {
      path: '/friends',
      name: 'friends',
      component: EFriends
    },
    {
      path: '/configurations',
      name: 'configurations',
      component: EConfigurations
    }
  ]
})
