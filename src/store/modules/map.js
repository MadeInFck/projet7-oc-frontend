const state = {
  currentLat: 48.852937,
  currentLong: 2.35005,
  bounds: {
      north: 0,
      south: 0,
      east: 0,
      west: 0
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
    }
};

const actions = {

    updateCurrentLat: ({ commit }, lat) => {
        commit('setCurrentLat', lat);
    },
    updateCurrentLong: ({ commit }, long) => {
        commit('setCurrentLong', long);
    },
    updateBounds: ({ commit }, bounds) => {
        commit('setBounds', bounds);
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
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}