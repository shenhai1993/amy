<template>
	<view class="content pt-3">
		<view class="mb-3">
			<view class="flex a-center mb-4 flex j-between">
				<view class="">
					<view class="font-32 mb-1 black-1">{{authInfo.user.username}}</view>
					<view class="font-24 black-3">
						<block v-if="authInfo.school">{{authInfo.school.name}}-{{authInfo.user.type===1?'教师':'巡堂员'}}</block>
						<block v-else>暂未绑定学校</block>
					</view>
				</view>
				<view class="mr-3">
					<image class="picture-img" :src="authInfo.user.avatar"></image>
				</view>
			</view>
			<block>
				<view class="flex text-center  a-center j-center" v-if="authInfo.user.type===1">
					<view class="statistics flex-1 bg-">
						<view class="font-32 font-bold">{{authInfo.teacherInfo.totalClassDuration}}</view>
						<view class="font-24 ">课时总数</view>
					</view>
					<view class="statistics flex-1">
						<view class="font-32 font-bold">{{authInfo.teacherInfo.settleMoney}}</view>
						<view class="font-24">已得报酬</view>
					</view>
					<view class="statistics flex-1 bg-">
						<view class="font-32 font-bold">{{authInfo.teacherInfo.unSettleMoney}}</view>
						<view class="font-24">未结报酬</view>
					</view>
				</view>
				<view class="flex text-center  a-center j-center" v-else>
					<view class="statistics flex-1 bg-">
						<view class="font-32 font-bold">{{authInfo.inspectionInfo.gradesNums}}</view>
						<view class="font-24 ">班级数量</view>
					</view>
					<view class="statistics flex-1">
						<view class="font-32 font-bold">{{authInfo.inspectionInfo.teacherInfo}}</view>
						<view class="font-24">教师数量</view>
					</view>
					<view class="statistics flex-1 bg-">
						<view class="font-32 font-bold">{{authInfo.inspectionInfo.inspectNums}}</view>
						<view class="font-24">巡堂次数</view>
					</view>
				</view>
			</block>
		</view>
		<view class="menu">
			<view class="py-5">其他服务</view>
			<view class="flex j-between a-center font-20 black-3">
				<block v-for="(item, index) in menu" :key="index">
					<view class="text-center"  @click="onClickMenu(item)">
						<uni-icons :type="item.icon" size="28"></uni-icons>
						<view class="mt-3">{{item.title}}</view>
					</view>
				</block>
			</view>
		</view>
		<view class="p-5 text-center">
			<button class="logout " @click="onClickLogout()">退出登录</button>
		</view>
		<navTab value="2"></navTab>
	</view>
</template>

<script>
	// import store from "../../store";
	import navTab from '../../common/components/tabBar-nav/index'
	import {getBaseUser,getAuthMe, getBaseSchool, logout} from '../../api/index.js'
	const actions = {}
	export default {
		data() {
			return {
				authInfo: {},
				baseUserInfo: {},
				menu: [
					{path: '', icon: 'staff', title: '会员服务'},
					{path: '', icon: 'mail-open', title: '问题反馈'},
					{path: '', icon: 'phone', title: '联系我们'},
					{path: '/pages/registration?type=1', icon: 'compose', title: '修改信息'},
				]
			};
		},
		components: {
			navTab
		},
		onLoad() {
			// this.userData = store.state.auth.user
		},
		onShow() {
			this.getAuthMe()
		},
		methods: {
			async getAuthMe() {
				const res = await getAuthMe()
				if(res.code ===0) {
					this.authInfo = res.data
				}
				
			},
			async onClickLogout() {
				const res = await logout()
				if (res.code == 0) {
					uni.clearStorageSync();
					uni.reLaunch({
						url: "/pages/login"
					});
				}
				console.log(res, '开始')
			},
			async getUserBaseInfo() {
				try {
					const res = await getBaseUser()
					this.baseUserInfo = res.data
					const schoolres = await getBaseSchool()
				} catch (e) {
					console.log(e)
				}
			
			},
			onClickMenu(item) {
				if(item.path) {
					uni.navigateTo({
						url: item.path
					})
				}
			}
		},
	};
</script>

<style lang="scss" scoped>
	.content {
		width: 650rpx;
		margin: auto;
		.picture-img {
			width: 70rpx;
			height: 70rpx;
			border-radius: 50%;
			background-color: black;
		}

		.logout {
			position: fixed;
			bottom: 200rpx;
			left: 50rpx;
			width: 650rpx;
			height: 88rpx;
			line-height: 88rpx;
			box-sizing: border-box;
			background: #303030;
			border: 1px solid #303030;
			border-radius: 10px;
			text-align: center;
			font-size: 32rpx;
			color: #fff;
		}
		.statistics{
			border-top: 1rpx solid #D8D8D8;
			height: 250rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-flow: column;
		}
		.bg-{
			background-color: #ECF5FC;
		}
	}
</style>