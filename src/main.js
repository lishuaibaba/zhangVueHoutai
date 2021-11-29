
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入静态资源
import './assets/css/reset.css'
// ui库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 导入仓库21312312312312312313
import store from './store/index'

//引入echarts
import * as echarts from "echarts";
Vue.prototype.$echarts = echarts;


Vue.prototype.$preImg = 'http://localhost:3000'

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
