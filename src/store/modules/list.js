const state = {
  list: [],
  range: [1, 5]
};

const mutations = {
  setRestaurantData: (state, data) => {
    state.list = data;
  },
  setRange: (state, data) => {
    state.range = data;
  },
  setNewRestaurant: (state, data) => {
    state.list.push(data);
  },
  mutateRatingRestaurant: (state, data) => {
    state.list.forEach((restaurant, index) => {
      if (restaurant.restaurantName == data.restaurantName) {
        state.list[index] = data;
      }
    });
  }
};

const actions = {
  updateRange: ({ commit }, data) => {
    commit("setRange", data);
  },
  updateWithNewRestaurant: ({ commit }, data) => {
    commit("setNewRestaurant", data);
  },
  updateRating: ({ commit }, data) => {
    commit("mutateRatingRestaurant", data);
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
