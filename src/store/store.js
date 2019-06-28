import Vue from "vue";
import Vuex from "vuex";

import map from './modules/map';
import list from './modules/list';

import * as actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  modules: {
    map,
    list
  }
});
