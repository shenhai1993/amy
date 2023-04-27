<template>
	<view>
		<block v-for="(item, index) in coureList" :key="index">
			<view class="flex a-center font-26 py-2 border-bottom">
				<view class="">
					<view class="mb-1 btn">{{item.start_time | formatDate}}</view>
					<view class="font-20 black-3  ml-2">Today</view>
				</view>
				<view class="flex-1 px-3">
					<view class="mb-2">{{item.school.name}}-{{item.grade.name}}</view>
					<view class="font-20 black-2">{{item.subject.name}} | {{item.start_time | formatDatem}}-{{item.end_time | formatDatem}} | {{item.class_name}}</view>
				</view>
				<view class="pr-3">
					<view class="mb-1">课程进度</view>
					<progress :percent="item.start_time | progressData(item.end_time)" stroke-width="10" activeColor="#0d0d0d" border-radius="5" />
				</view>
				<view class="flex a-center" @click="onClickSign(item,index)">
					<uni-icons type="calendar"  :color="item.sign_status===2?'#d8d8d8':'#000'" size="28"></uni-icons>
					<view class="black-1 ml-1" :class="item.sign_status===2?'black-3':'black-1'">打卡</view>
				</view>
			</view>
		</block>
		<view v-if="coureList.length===0" class="text-center py-2 font-36 black-1">
			今日暂无课程
		</view>
		<view class="mt-3" v-if="coureList.length>20">
			<ljs-pagination
				:total="total"
				:pageNum.sync="pageNum"
				:pageSize="pageSize"
				@num-change="onChangePageNum">
			</ljs-pagination>
		</view>
		<u-popup :show="popupShow" :closeable="true" :closeOnClickOverlay ="false"
		 @close="onClosePopup" mode="center">
			<view class="p-3 popup">
				<view class="flex a-center font-48 mb-5">
					<u-icon name="info-circle" color="#000" size="60"></u-icon>
					<view class="ml-2">打卡</view>
				</view>
				<view class="mb-3">
					打卡时间： {{popupData.start_time || sign_time}} 
				</view>
				<view class="mb-3">
					打卡类型：{{popupData.sign_status===0?'签到':'签退'}}
				</view>
				<view class="py-3 text-right">
					<button class="saveBtn" @click="onClickSignTime">确定</button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {getClassesList, onSign} from '../../../api/index.js'
	import dayjs from "dayjs";
	export default {
			props:{
			},
			data() {
				return {
					pageNum: 0,
					pageSize: 20,
					total: 0,
	                coureList: [],
					popupShow: false,
					popupData: {},
					index: 0,
					sign_time:  dayjs().format('YYYY-MM-DD HH:mm:ss')
				}
			},
			filters: {
				// 取时间上午下午
				formatDate(val){
					return dayjs(val).format('hh:mmA')
				},
				// 取时间
				formatDatem(val){
					return dayjs(val).format('h:mm')
				},
				progressData(t1,t2) {
					let progress = 0 // 进度条
					const d = dayjs().unix() // 当前时间戳
					const s = dayjs(t1).unix() // 课程开始时间戳
					const e = dayjs(t2).unix() // 课程结束时间戳
					if(d>e) {
						progress = 100
					}
					if (s<d && d<e) {
						const f = d-s 
						const m = e-s
						progress = (f/m).toFixed(2) * 100
					}
					return progress
				}
			},
			mounted() {
				// this.getList()
			},
			methods:{
				async getList() {
					try{
						uni.showLoading({
							title: "加载中",
							mask: true,
						});
						const res = await getClassesList({type: 1,pageNum: this.pageNum})
						if(res.code===0) {
							this.coureList = res.data
							this.pageNum = res.meta.current_page
							this.pageSize = res.meta.per_page
							this.total = res.meta.total
						}
						uni.hideLoading()
					}catch(e){
						uni.showToast({
						  icon:'error',
						  title: '获取课程失败'
						});
						//TODO handle the exception
					}
					
				},
				onClosePopup() {
					this.popupShow = false
				},
				onClickSign(item,index) {
					if(item.sign_status===2) return false
					this.popupData = item
					this.index = index
					this.popupShow = true
				},
				async onClickSignTime() {
					try{
						uni.showLoading({
							title: "签到中",
							mask: true,
						});
						const res = await onSign({classId: this.popupData.id})
						uni.showToast({
						  icon:'success',
						  title: '签到成功'
						});
						this.coureList[this.index].sign_status = this.popupData.sign_status + 1
						this.popupShow = false
					}catch(e){
						if(e===1) {
							uni.showToast({
							  icon:'success',
							  title: '签到成功'
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
					
				},
				onChangePageNum(num){
					 this.pageNum = num
					 this.getList()
				}
			}
	}		
</script>

<style scoped>
	.btn {
		background: rgba(0, 0, 0, .87);
		color: #fff;
		display: inline-block;
		border-radius: 8rpx;
		padding:13rpx 15rpx;
		
	}
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
	}
</style>
