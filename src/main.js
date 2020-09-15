import Vue from 'vue'
import App from './App.vue'
import router from './router'


Vue.config.productionTip = false

/* 将$bus 生成一个vue实例 */
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
}).$mount('#app') 
