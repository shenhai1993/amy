<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view>
      <text class="title">{{ title }}</text>
      <u-button @click="addLoading">123</u-button>
    </view>
  </view>
</template>

<script>
import store from "../../store";
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
