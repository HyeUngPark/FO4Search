import Vue from 'vue'
import Vuex from 'vuex'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './App'
import router from './router'
import 'es6-promise/auto'
import store from './store/index'

Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(Vuex)
/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  router,
  store,
  components: { App },
}).$mount("#app")
