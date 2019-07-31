const state = {
  currentLat: 48.852937,
  currentLong: 2.35005,
  bounds: {
    ga: {
      j: 0,
      l: 0
    },
    na: {
      j: 0,
      l: 0
    },
    google: null,
    map: null,
  }
};

const mutations = {
  setCurrentLat: (state, lat) => {
    state.currentLat = lat;
  },
  setCurrentLong: (state, long) => {
    state.currentLong = long;
  },
  setBounds: (state, bounds) => {
    state.bounds = bounds;
  },
  setGoogle: (state, google) => {
    state.google = google;
  },
  setMap: (state, map) => {
    state.map = map;
  }
};

const actions = {
  updateCurrentLat: ({ commit }, lat) => {
    commit("setCurrentLat", lat);
  },
  updateCurrentLong: ({ commit }, long) => {
    commit("setCurrentLong", long);
  },
  updateBounds: ({ commit }, bounds) => {
    commit("setBounds", bounds);
  },
  updateGoogle: ({ commit }, google) => {
    commit("setGoogle", google);
  },
  updateMap: ({ commit }, map) => {
    commit("setMap", map);
  }
};

const getters = {
  getCurrentLat: state => {
    return state.currentLat;
  },
  getCurrentLong: state => {
    return state.currentLong;
  },
  getBounds: state => {
    return state.bounds;
  },
  getGoogle: state => {
    return state.google;
  },
  getMap: state => {
    return state.map;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
