<!-- 微信授权登录全程代码实现 -->
<template>
	<view class="page-wrap">
		<view>
			<!-- isloding是用来记录当前用户是否是第一次授权使用的 -->
			<view>
				<view class='banner'>
					<image src='../static/banner.jpg'></image>
				</view>
				<view class="py-5"></view>
				<button class='bottom mb-5' type='primary' open-type="chooseAddress"  @click="getUserProfile"
					>
					教师登录
				</button>
				<button class='bottom' type='primary'  @click="getUserProfile"
					>
					巡堂员登录
				</button>
				<!-- <button class='bottom'  @click="userInfo">授权登录</button> -->
			</view>
			<view class="text-right reg my-3 pr-1" @click="onClickReg">注册账号</view>
		</view>
		<view class="mask" v-if="show" border-radius="14">
				<view class="borderBox p-2 font-28 info-box">
				    <view class="flex j-start a-center my-2">
				        <image class="logo mr-2" src="../static/logo.png" mode="aspectFit"></image>
				        <text>{{ appName }}</text>
				    </view>
				    <view class="flex j-start a-center my-2 pl-1">绑定手机号码</view>
				    <view class="flex j-start a-center py-2 van-hairline--top van-hairline--bottom">
				        <view class="avtar mr-2">
				            <open-data type="userAvatarUrl"></open-data>
				        </view>
				        <view>
				            <open-data type="userNickName" lang="zh_CN"></open-data>
				            <view>微信个人信息</view>
				        </view>
				    </view>
				    <view class="btn flex j-center a-center py-2">
				        <view class="btn-item cancle mr-3 flex a-center j-center" @click="cancleMobile"><text>拒绝</text></view>
				        <!--<label for="phone" class="btn-item confirm" wx:if="{{agreement}}" catchtap="colsePopup">
				            <view>允许</view>
				        </label>-->
				        <view >
							<button  class="btn-item confirm flex a-center j-center" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">允许</button>
				        </view>
				
				    </view>
				</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import {getPhone, loginAuth} from '../api/index.js'
	export default {
		data() {
			return {
				show: false,
				SessionKey: '',
				OpenId: '',
				phone: '',
				nickName: null,
				avatarUrl: null,
				isloading: uni.getStorageSync('isloading') || true //默认为true
			};
		},
		methods: {
			//第一授权获取用户信息===》按钮触发
			getUserProfile() {
				this.show = true
				let that = this;
				wx.getUserProfile({
					desc: '获取你的昵称、头像、地区及性别',
					success: (infoRes)=> {
						this.nickName = infoRes.userInfo.nickName; //获取用户登录昵称
						this.avatarUrl = infoRes.userInfo.avatarUrl; //获取用户头像
						console.log(infoRes.userInfo)
						try {
							uni.setStorageSync('isloading', false); //记录是否第一次授权  false:表示不是第一次授权
						} catch (e) {}
					},
					fail(res) {
					}
				});
			},
			async getPhoneNumber(e) {
				this.show =false
				try {
					const res = await getPhone({code: e.detail.code})
				} catch (e) {
					if (e.errcode === 0) {
						this._data.phone = e.phone_info.phoneNumber
						this.getSessionKey()
					} else {
						uni.showToast({
						  icon:'none',
						  title: '获取手机号失败'
						});
					}	    
				}
				
			},
			getSessionKey(){
				uni.showLoading({
					title: '请求中'
				})
				return new Promise((resolve, reject) => {
					wx.login({
						success: async res => {
							const { code } = res
							const  params = {
								code: code,
								phone: this.phone,
								username: this.nickName,
								avatar: this.avatarUrl
				
							}
							const loginRes = await loginAuth(params)
							uni.setStorage({key:'userInfo',data: loginRes.data})
							uni.showToast({
							  icon:'none',
							  title: '登录成功，跳转中。。。'
							});
							setTimeout(()=>{
								uni.switchTab({
									url: '/pages/course/index'
								})
							},300)
							
							// const { status:loginStatus, data } = loginRes
							// if(loginStatus) {
								
							// 	resolve(true)
							// } else {
							// 	reject(false)
							// }
						},
						fail: () => {
							reject(false)
						}
					})
				})
				uni.hideLoading()
	
			},
			// 拒绝授权手机
			cancleMobile() {
				this.show = false
			    // this.colsePopup()
			    // app.goBack()
			},
			onClickReg() {
				uni.navigateTo({
					url: '/pages/registration'
				})
			}
			//向后台更新信息
		},
		onLoad() { //默认加载
			
		}
	}
</script>

<style scoped lang="scss">
	.page-wrap{
		height: 100vh;
		overflow: hidden;
	}
	.banner {
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 690rpx;
		margin: 60rpx auto;
		height: 300rpx;
		image {
			width: 100%;
			height: 345rpx
		}
	}
	.reg{
		font-family: Poppins-Medium;
		font-size: 16px;
		font-weight: 500;
		line-height: 24px;
		letter-spacing: 0px;
		color: #303030;
	}
	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.bottom {
		width: 100%;
		background: #303030;
		color: #fff;
		font-size: 32rpx;
	}
	.mask{
		position: fixed;
		width: 100vw;
		height:100vh;
		top: 0rpx;
		left: 0rpx;
		background-color: rgba(0, 0, 0, .5);
	}
	.login-box {
	    margin-top: 100rpx;
	}
	.logo-banner {
	    width: 100rpx;
	    height: 100rpx;
	    border-radius: 50%;
	    background-color: #f0f0f0;
	}
	.wechat-btn {
	    width: 650rpx;
	    color: #fff;
	    margin: 0 auto;
	    background-color: #2556F3;
	    border-radius: 12rpx;
	    animation: animated 1.1s ease infinite both;
	}
	.logo {
	    width: 72rpx;
	    height: 72rpx;
	    border-radius: 50%;
	}
	.avtar {
	    width: 98rpx;
	    height: 98rpx;
	}
	.btn-item {
	    width: 180rpx;
	    height: 60rpx;
	    min-width: 90px;
	    min-height: 30px;
	    box-sizing: border-box;
	    text-align: center;
	    font-size: 24rpx;
	    border-radius: 5rpx;
	}
	.btn .cancle {
	    background: rgb(242,242,242);
	    color: #07C160;
	}
	.btn .confirm {
	    background: rgb(7,193,96);
	    color: #fff;
	}
	.v-align{
	    vertical-align: middle;
	}
	.info-box{
		position: absolute;
		background: #fff;
		width: 100vw;
		bottom: 0rpx;
		left: 0rpx
	}
</style>
