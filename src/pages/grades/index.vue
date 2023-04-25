<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view>
      <text class="title">功能开发中</text>
    </view>
	<navTab value="1"></navTab>
  </view>
</template>

<script>
import store from "../../store";
import navTab from '../../common/components/tabBar-nav/index'
const actions = {
  add: () => {
    store.dispatch("loading/addAction");
  },
  sub: () => {
    store.dispatch("loading/subAction");
  },
};

export default {
  data() {
    return {
      title: "Hello",
    };
  },
  components: {
  	navTab
  },
  onLoad() {},
  methods: {
    addLoading() {
      actions.add();
    },
  },
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
