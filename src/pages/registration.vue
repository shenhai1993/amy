<template>
	<view class="bg-white content">
		<view class="page-wrap">
			<view class="p-2"></view>
			<view class="py-2 p1-2 ">
				<view class="flex a-center">
					<view>
						<image class='logo mr-5' src='../static/logo.png'></image>
					</view>
					<view class="font-48 font-bold">JOIN US</view>
				</view>
			</view>
			<u--form labelPosition="left" :model="model1" :rules="rules" ref="uForm">
				<u-form-item label="注册类型:" labelWidth='180rpx'  borderBottom
					@click="showSex = true; hideKeyboard()">
					<u--input v-model="model1.userInfo.typeName" custom-style="background-color:#fff"  :type="type" disabled placeholder="请选择注册类型" border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="姓名:" labelWidth='180rpx' prop="userInfo.username" borderBottom >
					<u--input v-model="model1.userInfo.username" border="none" placeholder="请填写姓名"></u--input>
				</u-form-item>
				<u-form-item label="手机号:" labelWidth='180rpx' prop="userInfo.phone" borderBottom >
					<u--input v-model="model1.userInfo.phone" border="none" placeholder="请填写手机号"></u--input>
				</u-form-item>
				<u-form-item label="密码:" labelWidth='180rpx' prop="userInfo.password" borderBottom>
					<u--input v-model="model1.userInfo.password" type="password" border="none" placeholder="请填写密码"></u--input>
				</u-form-item>
				<u-form-item label="身份证:" labelWidth='180rpx' prop="userInfo.id_card" borderBottom>
					<u--input v-model="model1.userInfo.id_card" type="idcard"  border="none" placeholder="请填写身份证"></u--input>
				</u-form-item>
				<u-form-item label="地址:" labelWidth='180rpx' prop="userInfo.address" borderBottom>
					<u--input v-model="model1.userInfo.address" placeholder="请填写地址"  border="none"></u--input>
				</u-form-item>
				<u-form-item label="紧急联系人:" labelWidth='180rpx' prop="userInfo.exigency_contact" borderBottom>
					<u--input v-model="model1.userInfo.exigency_contact" placeholder="请填写紧急联系人"  border="none"></u--input>
				</u-form-item>
				<u-form-item label="个人描述:" labelWidth='180rpx' borderBottom>
					<u--input v-model="model1.userInfo.desc"  border="none" placeholder="请输入个人描述" ></u--input>
				</u-form-item>
				<u-form-item label="学历:" labelWidth='180rpx' borderBottom>
					<u--input v-model="model1.userInfo.education" placeholder="学历"  border="none"></u--input>
				</u-form-item>
				<u-form-item label="来源:" labelWidth='180rpx' borderBottom>
					<u--input v-model="model1.userInfo.source" placeholder="来源" border="none"></u--input>
				</u-form-item>
				<u-form-item label="曾任职:" labelWidth='180rpx' borderBottom>
					<u--input v-model="model1.userInfo.previous_job" placeholder="曾任职" border="none"></u--input>
				</u-form-item>
				<u-form-item label="资质:" labelWidth='180rpx' borderBottom>
					<u--input v-model="model1.userInfo.certification" placeholder="资质" border="none"></u--input>
				</u-form-item>
				<u-form-item label="获奖:" labelWidth='180rpx' borderBottom>
					<u--input v-model="model1.userInfo.prize" placeholder="获奖" border="none"></u--input>
				</u-form-item>
				<u-form-item label="头像地址:" labelWidth='180rpx' borderBottom>
					<!-- <u--input v-model="model1.userInfo.avatar"  ttouxaing="none"></u--input> -->
					<u-upload
							:fileList="fileList"
							@afterRead="afterRead"
							@delete="deletePic"
							name="1"
							:maxCount="1"
						></u-upload>
				</u-form-item>
			</u--form>
			<u-action-sheet :show="showSex" :actions="actions" title="请选择注册类型" @close="showSex = false"
				@select="sexSelect">
			</u-action-sheet>
		</view>
		<view class="py-3">
			<button class='bottom' @click="submit">
				{{editStatus?'提交修改' : '提交注册'}}
			</button>
		</view>
	</view>
</template>

<script>
	import { getBaseUser, register, editUsers, upload } from '../api/index.js'
	export default {
		data() {
			return {
				type: 'select',
				showSex: false,
				model1: {
					userInfo: {
						typeName: '',
						username: '',
						type: '',
						phone: '',
						password: '',
						desc: '', // 个人描述
						id_card: '', // 身份证
						education: '', // 学历
						source: '', // 来源
						previous_job: '', // 曾任职
						certification: '', // 资质
						address: '', // 地址
						exigency_contact: '', // 紧急联系人
						prize: '' , // 获奖
						avatar: '', // 头像地址
						code: '' , // 小程序登录code
						img: '' 
					},
				},
				fileList: [],
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
					'userInfo.id_card': {
						type: 'string',
						required: true,
						message: '请填写身份证',
						trigger: ['blur', 'change']
					},
					'userInfo.address': {
						type: 'string',
						required: true,
						message: '请填写地址',
						trigger: ['blur', 'change']
					},
					'userInfo.exigency_contact': {
						type: 'string',
						required: true,
						message: '请填写紧急联系人',
						trigger: ['change']
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
			this.getCode()
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
					const {type,username,phone,password,id,desc,id_card,education,source,previous_job,certification,address,exigency_contact,prize,avatar} =  res.data
					const name =  type===1?'教师' : '巡检员'
					this.$set(this.model1.userInfo, 'id', id)
					this.$set(this.model1.userInfo, 'type', type)
					this.$set(this.model1.userInfo, 'typeName', name)
					this.$set(this.model1.userInfo, 'username', username)
					this.$set(this.model1.userInfo, 'phone', phone)
					this.$set(this.model1.userInfo, 'password', password)
					
					this.$set(this.model1.userInfo, 'desc', desc)
					this.$set(this.model1.userInfo, 'id_card', id_card)
					this.$set(this.model1.userInfo, 'education', education)
					this.$set(this.model1.userInfo, 'source', source)
					this.$set(this.model1.userInfo, 'previous_job', previous_job)
					this.$set(this.model1.userInfo, 'certification', certification)
					this.$set(this.model1.userInfo, 'address', address)
					
					this.$set(this.model1.userInfo, 'exigency_contact', exigency_contact)
					this.$set(this.model1.userInfo, 'prize', prize)
					// this.$set(this.model1.userInfo, 'avatar', avatar)
					this.fileList = [{name: '',url: avatar}]
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
				let wxReq = await wx.login({})
				// delete this.model1.userInfo.typeName
				try{
					const res = this.editStatus ? await editUsers( this.model1.userInfo) : await register( this.model1.userInfo)
					if(res.code === 0){
						  uni.showToast({
							icon: 'none',
							title: this.editStatus? '修改成功' : '注册成功'
						  });
						   this.editStatus = false
						 setTimeout(()=>{
						 	uni.navigateBack()	
						 },1000) 
						  
					}
				}catch(e){
					uni.showToast({
						icon: 'none',
						title: e.data.message || '注册失败'
					});
					setTimeout(()=>{
						uni.navigateBack()	
					},1000) 
				}
			},
			// 删除图片
			deletePic(event) {
				this.fileList = []
			},
			// 新增图片
			async afterRead(event) {
				if (event.file.size> 51200) return uni.showToast({title:'头像不能超过50k',duration:1500,icon:'none'})
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				// let lists = [].concat(event.file)
				// let fileListLen = this[`fileList${event.name}`].length
				this.fileList = [{name: '',url: event.file.url}]
				uni.getImageInfo({
					src: event.file.url,
					success: (image)=> {
						// 做png/jpeg的类型判断————对不同类型的图像添加不同的转换头信息
						if(image.type=='png'||image.type=='jpeg'){
							// 对符合类型的图片转换为base64类型
							uni.getFileSystemManager().readFile({// 【重点来啦】人家自提供的转码API
								filePath:image.path,// 所需转码图像路径
								encoding:"base64",// 转码类型
								success: async(req)=>{
									// 生成base64
									let imageBase64='data:image/'+image.type+';base64,'+req.data;
									console.log('转base64后：',imageBase64);
									this.model1.userInfo.img = imageBase64
									// if(this.model1.userInfo.id) {
									// 	const params  = {
									// 		avatar: imageBase64,
									// 		id: 4
									// 	}
									// 	const res = await upload(params)
									// }
								}
							})
						}else{// 友好一点，不是以上类型做出提醒
							uni.showToast({
								title:'当前只支持png/jpeg格式',
								duration:2500,
								icon:'none'
							})
						}
					}
				})
			},
			getCode() {
				wx.login({
					success: async res => {
						const { code } = res
						this.$set(this.model1.userInfo, 'code', code)
					},
					fail: () => {
						reject(false)
					}
				})
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules)
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			
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
		width: 690rpx;
		margin: 30rpx auto;
		background: #303030;
		color: #fff;
		font-size: 32rpx;
	}
</style>