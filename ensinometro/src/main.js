import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import io from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import 'animate.css';


Vue.config.productionTip = false

const connection = io.connect('http://localhost:3000', {
  transports: ['websocket'],
  upgrade: false
});

Vue.use(new VueSocketIO({
  connection,
  debug: true
}));

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')