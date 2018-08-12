import Vue from 'vue';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate';
import App from './App.vue'

import './components';

import {routes} from './routes';
import {store} from './store';

require('./main.scss');

Vue.use(Element);
Vue.use(Vuelidate)
Vue.use(VueRouter);

export const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
