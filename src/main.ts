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
    selectedServer: 0,
    servers: [],
    loggedIn: false,
    ready: false,
  },
  getters: {
    currentServer: state => {
      // if(state.selectedServer) return null;
      if(state.servers.length < 1) return null;
      if(state.selectedServer >= state.servers.length) return null;
      return state.servers[state.selectedServer];
    }
  }
})
Vue.config.productionTip = false
Vue.mixin({
  data: () => {
    return {
      get globalMCVersions() {
        return ['1.16.0'];
      }
    }
  }
})
new Vue({
  render: h => h(App),
  store: store
}).$mount('#app')
