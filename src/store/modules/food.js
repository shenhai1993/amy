const state = {
    foodBills: {}, // app是否加载完
};

const getters = {
    foodList: (state) => state.foodBills,
};

const actions = {
    foodAction({ commit },data) {
        commit("setFoodList", data);
    },
};

const mutations = {
    setFoodList(state,data) {
        state.foodBills = data
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
