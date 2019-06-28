const state = {
  currentLat: 48.852937,
  currentLong: 2.35005
};

const mutations = {

    setCurrentLat: (state, lat) => {
        state.currentLat = lat;
    },
    setCurrentLong: (state, long) => {
        state.currentLong = long;
    }
};

const actions = {

    updateCurrentLat: ({commit}, lat) => {
        commit('setCurrentLat', lat);
    },
    updateCurrentLong: ({commit}, long) => {
        commit('setCurrentLong', long);
    }
};

const getters = {
    getCurrentLat: state => {
        return state.currentLat;
    },
    getCurrentLong: state => {
        return state.currentLong;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}