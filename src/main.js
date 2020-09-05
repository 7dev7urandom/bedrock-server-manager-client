import Vue from 'vue'
import App from './App.vue'
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io-extended';
import Vuex from 'vuex';

const SocketInstance = socketio('http://localhost:3000');

Vue.use(VueSocketIO, SocketInstance);
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    selectedServer: {},
    loggedIn: false
  },
  mutations: {

  }
})
Vue.config.productionTip = false
Vue.mixin({
  data: () => {
    return {
      get globalMCVersions() {
        return [ '1.16.0'];
      }
    }
  }
})
new Vue({
  render: h => h(App),
  store: store
}).$mount('#app')
