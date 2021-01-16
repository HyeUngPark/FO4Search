import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/layouts/IndexLayout'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      name : 'user',
      path: '/user',
      component : Index,
      redirect : '/user/rank',
      children:[
        {
          name : 'userRank',
          path : '/user/rank',
          component : () => import('@/routes/User/UserRank')
        },
      ]
    },
    {
      name : 'index',
      path: '/',
      redirect : '/index',
      component : Index,
      children: [
        {
          path: '/index',
          component: () => import("@/routes/Index/Index")
        },
      ]
    },
    {
      path : '*',
      redirect : '/'
    }
  ]
})
