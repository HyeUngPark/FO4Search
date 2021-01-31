import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/layouts/IndexLayout'
import store from './store/index'

Vue.use(Router)

const router = new Router({
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
        {
          name : 'userRank',
          path : '/user/match',
          component : () => import('@/routes/User/UserMatch')
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
});
router.beforeEach((to, from, next) => {
  store.commit('startSpinner');
  setTimeout(() => {
      next();
  }, 1);
});

router.afterEach((to, from) => {
  store.commit('endSpinner');
});
export default router;