<script>
import store from "./store";
export default {globalData: {
    user: undefined,
    user_account: undefined,
    userSubsidyAccount: undefined,
	  type: 1,
  },
  onLaunch: function () {
	 uni.hideTabBar()
	this.type = uni.getStorageSync('userInfo').user.type || 1
	if(this.type===2) {
		setTimeout(() => {
		      uni.switchTab({
		          url: '/pages/inspector/index'
		      })
		  }, 80)
		// uni.switchTab({
		//     url: "/pages/inspector/index",
		// });
	}
    console.log("App Launch");
    // store
    //     .dispatch("auth/meAction")
    //     .then((res) => {
    //       // store.dispatch("loading/onAppLaunchedAction");
    //     })
    //     .catch((err) => {
    //       let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
    //       let curRoute = routes[routes.length - 1].route
    //       if (curRoute==='pages/login') return false
    //       uni.showModal({
    //         title: "未登录",
    //         content: "跳转到微信进行登录？",
    //         showCancel: false,
    //         confirmText: "点击前往",
    //         success: function () {
    //           uni.reLaunch({
    //             url: "/pages/login",
    //           });
    //         },
    //       });
    //     });
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
