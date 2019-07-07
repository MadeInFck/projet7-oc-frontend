const state = {
  list: null,
  range: [1,5]
};

const mutations = {
    setRestaurantData: (state, data) => {
        state.list = data;
    },
    setRange: (state,data) => {
      state.range = data;
    }
};

const actions = {
  updateRange: ({ commit }, data) => {
    commit('setRange', data);
  }
};

const getters = {
  getList: state => {
    return state.list;
  },
  getRange: state => {
    return state.range;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
