import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import loading from "./modules/loading";
import food from "./modules/food";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    loading,
    food
  },
});
