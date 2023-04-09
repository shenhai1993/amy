<script>
import store from "./store";
export default {globalData: {
    user: undefined,
    user_account: undefined,
    userSubsidyAccount: undefined,
  },
  onLaunch: function () {
    console.log("App Launch");
    store
        .dispatch("auth/meAction")
        .then((res) => {
          // store.dispatch("loading/onAppLaunchedAction");
        })
        .catch((err) => {
          let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
          let curRoute = routes[routes.length - 1].route
          if (curRoute==='pages/login') return false
          uni.showModal({
            title: "未登录",
            content: "跳转到微信进行登录？",
            showCancel: false,
            confirmText: "点击前往",
            success: function () {
              uni.reLaunch({
                url: "/pages/login",
              });
            },
          });
        });
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
@import './static/layout.css';	
@import "uview-ui/index.scss";
</style>
