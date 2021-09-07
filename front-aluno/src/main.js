import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import io from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import 'animate.css';
import router from './router/index.js'

Vue.config.productionTip = false;

const connection = io.connect('https://ensinometro-back.herokuapp.com', {
  transports: ['websocket'],
  upgrade: false
});

Vue.use(new VueSocketIO({
  connection,
  debug: true
}));

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');