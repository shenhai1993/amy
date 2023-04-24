const state = {
  user: {},
  company: {},
};

const getters = {
  user: (state) => state.user,
  company: (state) => state.company,
};

const actions = {
  loginAction({ commit }, params) {
    return uni.$u.http
      .post("auth/mp_code", params)
      .then((res) => {
        commit("setLogin", res.data);
        uni.setStorageSync(process.env.WECHAT_LAST_CODE_KEY, params.code);
        uni.setStorageSync(
          process.env.ACCESS_TOKEN_KEY,
          res.data.token.access_token
        );
        return Promise.resolve(res);
      })
      .catch(() => {
        return Promise.reject();
      });
  },
  meAction({ commit }) {
    return uni.$u.http
      .post("auth/me")
      .then((res) => {
        console.log(res, "测试");
        if (res.code == 0) {
           commit("setLogin", res.data);
		   getApp().globalData.type = res.data.user.type || 1
          if (!res.data.employee) {
           /* uni.setStorageSync("WEBURL", window.location.href);
            setTimeout(() => {
              uni.redirectTo({
                url: "/pages/login",
              });
            }, 300);*/
            return false;
          }
          return Promise.resolve();
        }
      })
      .catch(() => {
        return Promise.reject();
      });
  },
};

const mutations = {
  setLogin(state, data) {
    state.userSubsidyAccount = getApp().globalData.userSubsidyAccount = data.userSubsidyAccount;
    state.user_account = getApp().globalData.user_account = data.user_account;
    state.user = getApp().globalData.user = data.user;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
