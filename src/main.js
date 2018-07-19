import Vue from 'vue';
import App from './App';
import router from './router';
import 'components/global';
import ElementUI from 'element-ui';
import 'assets/style/normalize.css';
import 'element-ui/lib/theme-chalk/index.css';
import 'utils/filters';


Vue.config.productionTip = false;

Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
