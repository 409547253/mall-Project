import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';

import Fastclick from 'fastclick';
import VueLazyLoad from 'vue-lazyload';

import toast from 'components/common/toast';
Vue.config.productionTip = false

/* 将$bus 生成一个vue实例 */
Vue.prototype.$bus = new Vue()

Vue.use(toast)
/* 使用fastClick */
Fastclick.attach(document.body)

/* 使用懒加载技术 */
Vue.use(VueLazyLoad,{
    loading:require('./assets/img/common/placeholder.png')
    

})

new Vue({

  render: h => h(App),
  router,
  store,
  
}).$mount('#app') 
