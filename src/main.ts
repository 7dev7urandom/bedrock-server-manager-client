import Vue from 'vue'
import App from './App.vue'
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io-extended';
import Vuex from 'vuex';
let SocketInstance;
if(process.env && process.env.NODE_ENV !== "production")
  SocketInstance = socketio('localhost:3000');
else 
  SocketInstance = socketio(window.location.host);

Vue.use(VueSocketIO, SocketInstance);
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    selectedServer: 0,
    servers: [],
    loggedIn: false,
    ready: false,
    tabReset: 0,
    currentUserData: {}
  },
  getters: {
    currentServer: state => {
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
        return ['1.16.201.02', '1.16.200.02', '1.16.210.05'];
      }
    }
  }
})
new Vue({
  render: h => h(App),
  store: store
}).$mount('#app')