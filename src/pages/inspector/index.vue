<template>
	<view class="page-wrap">
		<u-sticky offset-top="0">
			<view class="pt-3 flex j-between">
				<view class="select-collapse">
					<picker mode = selector  @change="bindPickerChange1"
					 :value="index" :range="array" range-key="id" 
					  class="mr-1">班级列表</picker>
					<u-icon name="arrow-down" color="#000000" size="26"></u-icon>
				</view>
				<view class="select-collapse">
					<picker mode = selector  @change="bindPickerChange1"
					 :value="index" :range="array" range-key="id" 
					  class="mr-1">老师列表</picker>
					<u-icon  name="arrow-down" color="#000000" size="26"></u-icon>
				</view>
				<view class="select-collapse">
					<picker mode="date" :value="start_time" :start="startDate" :end="end_time" @change="bindDateChange($event, 'start_time')">
						<view class="uni-input">{{start_time}}</view>
					</picker>
				</view>
				<view class="select-collapse">
					<picker mode="date" :value="end_time" :start="start_time" :end="endDate" @change="bindDateChange($event,'end_time')">
						<view class="uni-input">{{end_time}}</view>
					</picker>
				</view>
			</view>
		</u-sticky>
		<view class="pt-3">
			<view class="flex a-center font-26 py-2 border-bottom">
				<view class="">
					<view class="btn">2020/05/05</view>
				</view>
				<view class="flex-1 px-3">
					<view class="mb-1">A学校-x班级-李老师</view>
					<view class="font-20 black-2">英语|8:00-10:00|课程信息</view>
				</view>
				<view class="pr-3">
					<view class="mb-1">课程进度</view>
					<u-line-progress :percent="70" :round="false" active-color="#ff9900"></u-line-progress>
				</view>
				<view class="flex a-center">
					<u-icon name="calendar" color="#000000" size="45"></u-icon>
					<view class="black-1 ml-1">考评</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import dayjs from "dayjs";
	import { getInspectorGradesList, getTeachersList} from '../../api/index.js'
	export default {
			data() {
				return {
					index: 1,
					grades_id: '', // 班级id
					users_id: '', // 教师id
					start_time: dayjs().subtract(1, 'day').format('YYYY/MM/DD'), // 开始日期
					end_time: dayjs().format('YYYY-MM-DD') // 结束日期
				}
			},
		
			created() {
				this.getGrades()
				this.getTeachers()
			},
			methods: {
				// 班级列表
				async getGrades() {
					const res = await getInspectorGradesList()
				},
				// 老师列表
				async getTeachers() {
					const res = await getTeachersList()
				},
				bindDateChange(e,r) {
					this[r] = e.detail.value
				},
				bindPickerChange1() {}
			}
		}
</script>

<style>
	.select-collapse{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 23%;
		border: 1rpx solid rgba(0, 0, 0, .87);
		border-radius: 10rpx;
		font-size: 24rpx;
		padding: 8rpx 0rpx;
		text-align: center;
	}
</style>