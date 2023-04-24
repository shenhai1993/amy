import store from "../../store";
import wxConfig from "../../../config/wxIndex.js";
const baseUrl = wxConfig.baseUrl || 'https://amy.lccc1991.cn/api/api';
const timeOut = wxConfig.timeOut || 10000
const actions = {
  add: () => {
    store.dispatch("loading/addAction");
  },
  sub: () => {
    store.dispatch("loading/subAction");
  },
};
uni.$u.http.setConfig((config) => {
  return {
    ...config,
    ...{
      // baseURL: process.env.HTTP_BASE_URL,
	  baseURL: baseUrl,
      // #ifdef H5 || APP-PLUS || MP-ALIPAY || MP-WEIXIN
      timeout: timeOut,
      // #endif
      // #ifdef APP-PLUS
      sslVerify: false,
      // #endif
      // #ifdef H5
      // 跨域请求时是否携带凭证（cookies）仅H5支持（HBuilderX 2.6.15+）
      withCredentials: false,
      // #endif
      // #ifdef APP-PLUS
      firstIpv4: false, // DNS解析时优先使用ipv4 仅 App-Android 支持 (HBuilderX 2.8.0+)
      // #endif
      // 局部优先级高于全局，返回当前请求的task,options。请勿在此处修改options。非必填
      // getTask: (task, options) => {
      // 相当于设置了请求超时时间500ms
      //   setTimeout(() => {
      //     task.abort()
      //   }, 500)
      // },
      // 全局自定义验证器。参数为statusCode 且必存在，不用判断空情况。
      validateStatus: (statusCode) => {
        // statusCode 必存在。此处示例为全局默认配置
        return statusCode >= 200 && statusCode < 300;
      },
    },
  };
});

uni.$u.http.interceptors.request.use(
  (config) => {
  const info = uni.getStorageSync('userInfo') || {}
  const token = info.token? info.token.access_token : ''
    actions.add();
    config.header = {
      ...config.header,
      Authorization:
        // "Bearer " + uni.getStorageSync(process.env.ACCESS_TOKEN_KEY),
		"Bearer " +  token
    };
    return config;
  },
  (config) => {
    uni.showToast({ title: "error", config });
    actions.sub();
    return Promise.reject(config);
  }
);

uni.$u.http.interceptors.response.use(
  (response) => {
    actions.sub();
    const { code,message} = response.data;
    console.log("interceptors response:::", response.data);
	
	if(code != 0){
		uni.showToast({ title: message, duration: 2000, icon: 'none' });
		return Promise.reject(response.data);
	} else {
		return response.data;
	}
  },
  (response) => {
	if(response.data.code===10000){
		uni.navigateTo({
			url: '/pages/login'
		})
	}
    actions.sub();
    return Promise.reject(response);
  }
);
