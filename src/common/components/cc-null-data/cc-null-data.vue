<template>
	<view class="null_data">
		<image src="../../../static/no_data.png" mode="widthFix"></image>
		<view class="label">{{labels}}</view>
	</view>
</template>

<script>
	export default {
		props: {
			labels: {
				type: String,
				default: '暂无数据'
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.null_data {
		width: 100%;
		text-align: center;
		color: #727272;
		font-size: 30rpx;

		image {
			width: 220rpx;
			margin-bottom: 20rpx;
		}
	}
</style>
