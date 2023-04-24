<template>
	<view class="page-wrap pt-3">
		<block v-for="(item, index) in settledList" :key="index">
			<view class="flex a-center black-1 font-26 py-2 border-bottom">
				<view class="pt-1">
					<view class="font-28 font-bold">{{item.start_time | formatDatey}}</view>
				</view>
				<view class="flex-1 pl-3">
					<view class="mb-2">{{item.school.name}}-{{item.grade.name}}</view>
					<view class="font-20 black-2">{{item.subject.name}} | {{item.start_time | formatDatem}}-{{item.end_time | formatDatem}} | {{item.class_name}}</view>
				</view>
				<view class="text-center">
					<view class="mb-2">课程报酬</view>
					<view class="font-20 black-2">￥{{item.money}}</view>
				</view>
				<view class="flex flex-column a-center pl-3" @click="onClickSettled(item,index)">
					<view class="mb-1">结算状态</view>
					<u-icon name="checkmark-circle-fill" :color="item.settle_status===0?'#333':'#43CF7C'" size="40"></u-icon>
				</view>
			</view>
		</block>
		<u-popup :show="popupShow" :closeable="true" :closeOnClickOverlay ="false"
		 @close="onClosePopup" mode="center">
			<view class="p-3 popup">
				<view class="font-48 mb-5">
					<view class="ml-2">结算详情</view>
				</view>
				<view class="mb-3 flex">
					<view class="label">课程时间： </view>
					<view>{{popupData.start_time | formatDatey}}</view>
				</view>
				<view class="mb-3 flex">
					<view class="label">打卡时间：</view>
					<view class="">
						<view class="mb-1">
							<span class="mr-1">签到√</span> 
							<block>
								<span v-if="popupData.sign_time">{{popupData.sign_time | formatDateUnix}}</span>
								<span v-else></span>
							</block>
						</view>
						<view>
							<span class="mr-1">签退x</span>
							<block>
								<span v-if="popupData.sign_out_time">{{popupData.sign_out_time | formatDateUnix}}</span>
								<span v-else></span>
							</block>
						</view>
					</view>
				</view>
				<view class="mb-3 flex">
					<view  class="label">评分：</view>
					<view>{{popupData.comment_score <0 ? 0 : popupData.comment_score}} </view>
				</view>
				<view class="mb-3 flex">
					<view  class="label">结算状态：</view>
					<view>{{popupData.settle_status === 0 ? '未结算' : '已结算'}} </view>
				</view>
				<view class="mb-3 flex">
					<view  class="label">结算时间：</view>
					<view>{{popupData.settled_time}} </view>
				</view>
				<view class="mb-3 flex">
					<view  class="label">结算金额：</view>
					<view>{{popupData.money}} </view>
				</view>
				<view class="py-3 text-right">
					<button class="saveBtn" @click="onClickSaveSettled">确定</button>
				</view>
			</view>
		</u-popup>
		<navTab value="1"></navTab>
	</view>
</template>

<script>
	import navTab from '../../common/components/tabBar-nav/index'
	import { getSettledList, postClassesSettled } from '../../api/index.js'
	import dayjs from "dayjs"
	export default {
		data() {
			return {
				settledList: [],
				popupShow: false,
				popupData: {},
				index: 0
			}
		},
		components: {
			navTab
		},
		filters: {
			// 取年月日
			formatDatey(val){
				return dayjs(val).format('YYYY/MM/DD')
			},
			// 取时间
			formatDatem(val){
				return dayjs(val).format('h:mm')
			},
			// 时间戳转时间
			formatDateUnix(val){
				return dayjs.unix(val).format('YYYY/MM/DD HH:mm:ss') 
			}
		},
		
		onShow() {
			this.getSettledClassList()
		},
		methods: {
			async getSettledClassList() {
				try{
					uni.showLoading({
						title: "加载中",
						mask: true,
					});
					const res = await getSettledList()
					if(res.code===0) {
						this.settledList = res.data
					}
					uni.hideLoading()
				}catch(e){
					uni.showToast({
					  icon:'error',
					  title: '获取结算列表失败'
					});
					//TODO handle the exception
				}
				
			},
			onClosePopup() {
				this.popupShow = false
			},
			onClickSettled(item,index) {
				// if(item.sign_status===2) return false
				this.index = index
				this.popupData = item
				this.popupShow = true
			},
			async onClickSaveSettled() {
				try{
					uni.showLoading({
						title: "结算中",
						mask: true,
					});
					console.log(this.popupData.id)
					const res = await postClassesSettled({classId: this.popupData.id})
					uni.showToast({
					  icon:'success',
					  title: '签到成功'
					});
					this.coureList[this.index].settle_status = this.popupData.settle_status + 1
					this.popupShow = false
				}catch(e){
					if(e===1) {
						uni.showToast({
						  icon:'success',
						  title: '结算成功'
						})
						this.popupShow = false
					} else {
						uni.showToast({
						  icon:'error',
						  title: e.data.message || '失败'
						});
					}
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.saveBtn{
		background: #0256FF;
		color: #fff;
		font-size: 30rpx;
		display: inline-block;
		border-radius: 8rpx;
		min-width:180rpx
	}
	.popup{
		width: 580rpx;
		.label{
			width: 160rpx;
			text-align: left;
		}
	}
</style>