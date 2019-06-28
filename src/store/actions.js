import data from "../data/data.js";

export const loadData = ({ commit }) => {
      commit("setRestaurantData", data);
};
