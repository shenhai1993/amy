import Vue from "vue";
import App from "./App";

Vue.config.productionTip = false;

App.mpType = "app";

// add store
import store from "./store/index.js";

// add uviewui
import uView from "uview-ui";
Vue.use(uView);

// setup
import "./common/setup/http";
import "./common/setup/uviewui";
import "./common/setup/launch";

const app = new Vue({
  store,
  ...App,
});
app.$mount();
