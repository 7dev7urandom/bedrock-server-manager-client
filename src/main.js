import Vue from 'vue'
import App from './App.vue'
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io-extended';

const SocketInstance = socketio('http://localhost:3000');

Vue.use(VueSocketIO, SocketInstance);

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
}).$mount('#app')
