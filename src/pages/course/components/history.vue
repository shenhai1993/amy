<template>
	<view>
		<block  v-for="(item, index) in coureList" :key="index">
			<view class="flex a-center font-26 py-2 border-bottom">
				<view class="flex-2">
					<view class="mb-1 btn">{{item.start_time | formatDate}}</view>
					<view class="font-20 black-3 ml-2">{{item.start_time | formatDatey}}</view>
				</view>
				<view class="flex-3 px-3">
					<view class="mb-2">{{item.school.name}}-{{item.grade.name}}</view>
					<view class="font-20 black-2">{{item.subject.name}} | {{item.start_time | formatDatem}}-{{item.end_time | formatDatem}} | {{item.class_name}}</view>
				</view>
				<view class="flex-2">
					<view class="black-1 mb-1 ml-2">课程评分</view>
					<u-rate :count="count" size="48" inactiveColor="#C1D6FF" v-model="item.comment_score"></u-rate>
				</view>
			</view>
		</block>
		<view v-if="coureList.length===0" class="text-center py-2 font-36 black-1">
			暂无历史课程
		</view>
		<view class="mt-3" v-if="coureList.length>20">
			<ljs-pagination
				:total="total"
				:pageNum.sync="pageNum"
				:pageSize="pageSize"
				@num-change="onChangePageNum">
			</ljs-pagination>
		</view>
	</view>
</template>

<script>
	import {getClassesList} from '../../../api/index.js'
	import dayjs from "dayjs";
	export default {
		data() {
			return {
				 count: 5,
				 value: 5,
				 total: 0,
				 pageNum: 0, // 当前页
				 pageSize: 20, // 分页条数
				 coureList: [],
			}
		},
		filters: {
			// 取年月日
			formatDatey(val){
				return dayjs(val).format('YYYY/MM/DD')
			},
			// 取时间上午下午
			formatDate(val){
				return dayjs(val).format('hh:mmA')
			},
			// 取时间
			formatDatem(val){
				return dayjs(val).format('h:mm')
			}
		},
		created() {
			this.getList()
		},
		methods: {
			async getList() {
				try{
					uni.showLoading({
						title: "加载中",
						mask: true,
					});
					const res = await getClassesList({type: 2,pageNum: this.pageNum})
					if(res.code===0) {
						this.coureList = res.data
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
</style>
