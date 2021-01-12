import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/layouts/IndexLayout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name : 'Index',
      component : Index,
      children: [
        {
          path: '/',
          component: () => import("@/routes/Index/Index")
        }
      ]
    },
  ]
})
