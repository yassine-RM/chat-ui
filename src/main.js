import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
// import VueRecord from '@codekraft-studio/vue-record'

// import isMobile from "./helper.js"

const socket = io('http://localhost:5000');

Vue.use(VueSocketIOExt, socket);
Vue.use(PerfectScrollbar);
// Vue.use(VueRecord)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
