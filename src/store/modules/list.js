const state = {
  list: null,
  range: [1,5],
  filteredList: null
};

const mutations = {
    setRestaurantData: (state, data) => {
        state.list = data;
    },
    setRange: (state,  data) => {
      state.range = data;
    },
    setFilteredList: (state, data) => {
      state.filteredList = data;
    }
};

const actions = {
  updateRange: ({ commit }, data) => {
    commit('setRange', data);
  },
  updateFilteredList: ({ commit }, data) => {
    commit('setFilteredList', data);
  }
};

const getters = {
  getList: state => {
    return state.list;
  },
  getRange: state => {
    return state.range;
  },
  getFilteredList: state => {
    return state.filteredList;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
