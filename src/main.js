import Vue from "vue";
import vuetify from './plugins/vuetify'
import App from "./App.vue";
import store from "./store/store";
import Vuelidate from "vuelidate";
import "./registerServiceWorker";
import { VueSpinners } from '@saeris/vue-spinners'

export const eventBus = new Vue();

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(VueSpinners);

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
