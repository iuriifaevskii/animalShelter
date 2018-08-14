import Vue from 'vue';
import io from 'socket.io-client';
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

const socket = io(`http://localhost:3000`)

export const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created() {
    socket.on('news', data => {
      console.log(data);
      socket.emit('my other event', { my: 'data' });
    });
  }
})
