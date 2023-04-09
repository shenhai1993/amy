<template>
	<view class="bg-white content">
		<view class="page-wrap">
			<view class="p-3"></view>
			<view class="py-2 p1-2 ">
				<view class="flex a-center">
					<view>
						<image class='logo mr-5' src='../../static/logo.png'></image>
					</view>
					<view class="font-48 font-bold">JOIN US</view>
				</view>
			</view>
		</view>
		<button class='bottom' @click="submit">
			提交注册
		</button>
	</view>
</template>

<script>
	import { getQuestions } from '../../api/index.js'
	export default {
		data() {
			return {
				showSex: false,
				switchVal: false
			};
		},
		created() {
			this.getQuestionsList()
		},
		methods: {
			async getQuestionsList() {
				const res = await getQuestions()
			},
			submit() {
				delete this.model1.userInfo.typeName
				uni.$u.http.post('/users/register', this.model1.userInfo).then(() => {
				  if(res.code == 0){
					  uni.showToast({
					    icon: 'none',
					    title: '注册成功'
					  });
					  setTimeout(()=>{
						  uni.navigateTo({
						  	url: '/pages/login'
						  },1000)
					  })
				  }
				  console.log(res,'开始')
				});
			}
		}
	};
</script>

<style scoped>
	.content{
		position: relative;
		height: 100vh
	}
	.logo {
		width: 80rpx;
		height: 80rpx;
	}
	.bottom {
		position: absolute;
		left: 30rpx;
		bottom: 100rpx;
		width: 690rpx;
		background: #303030;
		color: #fff;
		font-size: 32rpx;
	}
</style>