import '@babel/polyfill';
import Vue from "vue";
import './plugins/vuetify';
import Vuetify from 'vuetify';
import 'vuetify/src/stylus/app.styl';
import App from "./App.vue";
import router from "./routes/router";
import store from "./store/store";
import Vuelidate from "vuelidate";
import "./registerServiceWorker";

export const eventBus = new Vue();

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(Vuelidate);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
