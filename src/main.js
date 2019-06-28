import Vue from "vue";
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import App from "./App.vue";
import router from "./routes/router";
import store from "./store/store";
import axios from 'axios';

import "./registerServiceWorker";

Vue.config.productionTip = false;
Vue.use(Vuetify);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
