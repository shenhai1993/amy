<template>
	<view>
		<view v-if="meta && meta.total > 0">
			<uni-load-more :contentText="{ contentnomore: '-- 到底了--' }" :status="meta.current_page >= meta.last_page ? 'no-more' : 'loading'"></uni-load-more>
		</view>
		<view class="noData" v-else>
			<image src="/static/no-msg-new.png" mode="aspectFill"></image>
			<view class="text">{{ describe }}</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		meta: {
			type: Object,
			default: null
		},
		describe: {
			type: String,
			default: '没有搜索到信息哦～'
		}
	}
};
</script>

<style lang="scss">
.noData {
	text-align: center;
	color: rgba(51, 51, 51, 1);
	font-size: 28rpx;
	padding-top: 20%;

	image {
		display: block;
		width: 590rpx;
		height: 268rpx;
		margin: 0 auto;
	}
}
</style>
