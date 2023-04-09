<template>
	<view class="bg-white content">
		<view class="page-wrap">
			<view class="p-3"></view>
			<view class="py-2 p1-2 ">
				<view class="flex a-center">
					<view>
						<image class='logo mr-5' src='../static/logo.png'></image>
					</view>
					<view class="font-48 font-bold">JOIN US</view>
				</view>
			</view>
			<u--form labelPosition="left" :model="model1" :rules="rules" ref="uForm">
				<u-form-item label="注册类型:" labelWidth='160rpx'  borderBottom
					@click="showSex = true; hideKeyboard()">
					<u--input v-model="model1.userInfo.typeName" placeholder="请选择注册类型" border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="姓名:" labelWidth='160rpx' prop="userInfo.username" borderBottom >
					<u--input v-model="model1.userInfo.username" border="none"></u--input>
				</u-form-item>
				<u-form-item label="手机号:" labelWidth='160rpx' prop="userInfo.phone" borderBottom >
					<u--input v-model="model1.userInfo.phone" border="none"></u--input>
				</u-form-item>
				<u-form-item label="密码:" labelWidth='160rpx' prop="userInfo.password" borderBottom>
					<u--input v-model="model1.userInfo.password" type="password" border="none"></u--input>
				</u-form-item>
			</u--form>
			<u-action-sheet :show="showSex" :actions="actions" title="请选择注册类型" @close="showSex = false"
				@select="sexSelect">
			</u-action-sheet>
		</view>
		<button class='bottom' @click="submit">
			{{editStatus?'提交修改' : '提交注册'}}
		</button>
	</view>
</template>

<script>
	import { getBaseUser, register, editUsers } from '../api/index.js'
	export default {
		data() {
			return {
				showSex: false,
				model1: {
					userInfo: {
						typeName: '',
						username: '',
						type: '',
						phone: '',
						password: ''
					},
				},
				editStatus: false,
				actions: [{
						type: 1,
						name: '教师',
					},
					{
						type: 2,	
						name: '巡检员',
					},
				],
				rules: {
					'userInfo.username': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					'userInfo.phone': {
						type: 'string',
						required: true,
						message: '请填写手机号',
						trigger: ['blur', 'change']
					},
					'userInfo.password': {
						type: 'string',
						required: true,
						message: '请填写密码',
						trigger: ['blur', 'change']
					},
					'userInfo.typeName': {
						type: 'string',
						max: 1,
						required: true,
						message: '请选择注册类型',
						trigger: ['blur', 'change']
					},
				},
				radio: '',
				switchVal: false
			};
		},
		onLoad(options) {
			if (options.type) {
				this.editStatus = true
				this.getUser()
			}
		},
		methods: {
			async getUser(){
				uni.showLoading({
					title: "加载中",
					mask: true,
				});
				const res = await getBaseUser()
				if(res.code ===0) {
					const {type,username,phone,password,id} =  res.data
					const name =  type===1?'教师' : '巡检员'
					this.$set(this.model1.userInfo, 'id', id)
					this.$set(this.model1.userInfo, 'type', type)
					this.$set(this.model1.userInfo, 'typeName', name)
					this.$set(this.model1.userInfo, 'username', username)
					this.$set(this.model1.userInfo, 'phone', phone)
					this.$set(this.model1.userInfo, 'password', password)
				}
				uni.hideLoading()
			},
			sexSelect(e) {
				this.model1.userInfo.typeName = e.name
				this.model1.userInfo.type = e.type
				this.$refs.uForm.validateField('userInfo.type')
			},
			hideKeyboard(){
			},
			async submit() {
				// delete this.model1.userInfo.typeName
				const res = this.editStatus ? await editUsers( this.model1.userInfo) : await register( this.model1.userInfo)
				if(res.code == 0){
					  uni.showToast({
						icon: 'none',
						title: this.editStatus? '修改成功' : '注册成功'
					  });
					  this.editStatus = false
					 setTimeout(()=>{
					 		uni.navigateBack()
					 },1000) 
					  
				}
			}
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.uForm.setRules(this.rules)
		},
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
		bottom: 20%;
		width: 690rpx;
		background: #303030;
		color: #fff;
		font-size: 32rpx;
	}
</style>