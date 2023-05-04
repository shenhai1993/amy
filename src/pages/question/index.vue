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
			<view class="pl-3">
				<block v-for="(item,index) in list" :key="index">

					<view class="mb-5">
						<view class="mb-3 font-32 font-bold">{{index+1}}、{{item.name}}</view>
						<view class="pl-5">
							<block v-if="item.type===1">
								<u-radio-group  size="20px" iconSize="18px" placement="column">
									<u-radio labelSize="16px" :customStyle="{marginBottom: '8px'}"
										v-for="(subItem,subIndex) in item.answers" :key="subIndex" @change="groupChange($event,1,item.id)"
										:label="subItem.no +'    ' + subItem.name" :name="subItem.id">
									</u-radio>
								</u-radio-group>
							</block>
							<block v-else>
								<u-checkbox-group size="20px" iconSize="18px" placement="column">
									<u-checkbox labelSize="16px" shape="circle" :customStyle="{marginBottom: '8px'}"
										v-for="(subItem,subIndex) in item.answers" :key="subIndex" @change="groupChange($event,2,item.id,subItem.id)"
										:label="subItem.no +'    ' + subItem.name" :name="subItem.id">
									</u-checkbox>
								</u-checkbox-group>
							</block>
						</view>
					</view>
				</block>
			</view>
		</view>
		<button class='bottom' @click="submit">
			提交问卷
		</button>
	</view>
</template>

<script>
	import {
		getQuestions, postQuestionsRecord
	} from '../../api/index.js'
	export default {
		data() {
			return {
				list: [],
				answersForm: {} // 答案表
			};
		},
		onShow() {
			this.getQuestionsList()
		},
		methods: {
			async getQuestionsList() {
				const res = await getQuestions()
				this.list = res.data
				let arr = {}
				res.data.forEach((item)=>{
					if(item.type===1) {
						arr[item.id] = ''
					} else {
						arr[item.id] = []
					}
				})
				this.answersForm = arr
			},
			groupChange(e,type,key,id) {
			 if(type===1) {
				 this.answersForm[key] = e
			 } else {
				 if(e) {
					this.answersForm[key].push(id.toString())
				 } else {
					const index = this.answersForm[key].indexOf(id)
					this.answersForm[key].splice(index, 1)
				 }	  
			 }
			 console.log(this.answersForm)
			},
			async submit() {
				try{
					const params = {data:  JSON.stringify(this.answersForm)}
					console.log(params)
					const res = await postQuestionsRecord(params)
				}catch(e){
					if(typeof e  === 'number') {
						uni.showToast({
							icon: 'none',
							title: '提交成功'
						});
						setTimeout(()=>{
							uni.switchTab({
								url: '/pages/course/index'
							})
						},1000)
					} else {
						uni.showToast({
							icon: 'none',
							title: '提交失败'
						});
					}
					
					console.log(e)
					//TODO handle the exception
				}
			}
		}
	};
</script>

<style scoped>
	.content {
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