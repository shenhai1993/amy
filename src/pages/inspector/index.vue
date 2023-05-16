<template>
	<view class="page-wrap">
		<u-sticky offset-top="0">
			<view class="pt-3 flex j-between">
				<view class="select-collapse">
					<picker mode = selector  @change="bindPickerChange1($event, 'grades','grades_id', 'gradesArray')"
					 :value="index" :range="gradesArray" @cancel="bindCancel('grades_id')" range-key="name" 
					  class="mr-1">{{grades}}</picker>
					<u-icon name="arrow-down" color="#000000" size="26"></u-icon>
				</view>
				<view class="select-collapse">
					<picker mode = selector  @change="bindPickerChange1($event, 'teachers', 'users_id','teachersArray')"
					 :value="index" :range="teachersArray" @cancel="bindCancel('users_id')" range-key="name" 
					  class="mr-1">{{teachers}}</picker>
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
			<block v-for="(item, index) in inspectorList" :key="index">
				<view class="flex a-center font-26 py-2 border-bottom">
					<view class="">
						<view class="btn">{{item.start_time | formatDate}}</view>
					</view>
					<view class="flex-1 px-2">
						<view class="mb-1">{{item.school_name}}-{{item.subject_name}}-{{item.user.username}}</view>
						<view class="font-20 black-2">{{item.subject_name}} | {{item.start_time | formatDatem}}-{{item.end_time | formatDatem}}</view>
					</view>
					<view class="pr-2">
						<view class="mb-1">课程进度</view>
						<progress :percent="item.start_time | progressData(item.end_time)" stroke-width="10" activeColor="#0d0d0d" border-radius="5" />
					</view>
					<view class="flex a-center" @click="onClickSign(item,index)">
						<!-- <uni-icons type="calendar"  :color="item.comment_score>0?'#d8d8d8':'#000'" size="28"></uni-icons> -->
						 <uni-icons type="calendar"  color="#000" size="28"></uni-icons>
						<view class="black-1 ml-1">考评</view>
					</view>
				</view>
			</block>
		</view>
		<view class="mt-3" v-if="inspectorList.length>20">
			<ljs-pagination
				:total="total"
				:pageNum.sync="pageNum"
				:pageSize="pageSize"
				@num-change="onChangePageNum">
			</ljs-pagination>
		</view>
		<view v-if="inspectorList.length===0" class="text-center py-2 font-36 black-1">
			暂无巡检数据
		</view>
		<u-popup :show="popupShow" :closeable="true" :closeOnClickOverlay ="false"
		 @close="onClosePopup" mode="center">
			<view class="p-3 popup">
				<view class="flex a-center font-48 mb-5">
					<view class="ml-2">考评</view>
				</view>
				<view class="mb-3 flex">
					<view class="label">课程时间：</view>
					<view>{{popupData.start_time}}</view>
				</view>
				<view class="mb-3 flex">
					<view class="label">考评时段：</view>
					<view>{{popupData.start_time | classedStatus(popupData.end_time)}}</view>
				</view>
				<view class="mb-3 flex">
					<view class="label">评分：</view>
					<u-rate :count="count" size="48" inactiveColor="#C1D6FF" v-model="popupData.comment_score"></u-rate>
				</view>
				<view class="mb-3 flex">
					<view class="label">评语：</view>
					<input v-model="popupData.comment" class="input">
				</view>
				<view class="py-3 text-right">
					<button class="saveBtn" @click="onclickSubmit">确定</button>
				</view>
			</view>
		</u-popup>
		<navTab :type="types"></navTab>
	</view>
</template>

<script>
	import navTab from '../../common/components/tabBar-nav/index'
	import dayjs from "dayjs";
	import { getInspectorGradesList, getTeachersList, getInspectorList, postinsPectorComment} from '../../api/index.js'
	export default {
			data() {
				return {
					types: 2,
					index: 0,
					inspectorList: [], // 巡检列表
					grades_id: '', // 班级id
					users_id: '', // 教师id
					grades: '班级列表', // 选择的班级
					teachers: '老师列表', // 选择的老师
					gradesArray: [], // 班级列表
					teachersArray: [], // 老师列表
					start_time: dayjs().subtract(30, 'day').format('YYYY-MM-DD'), // 开始日期
					end_time: dayjs().format('YYYY-MM-DD'),  // 结束日期
					total: 0, // 数据总数
					pageNum: 0, // 当前页
					pageSize: 20, // 分页条数
					popupShow: false, // 弹窗控制
					popupData: {
						comment_score: 0, // 评分
						comment: ''  // 点评
					}, // 点击的数据对象
					count: 5
				}
			},
			components: {
				navTab
			},
			filters: {
				// 取时间上午下午
				formatDate(val) {
					return dayjs(val).format('hh:mmA')
				},
				// 取时间
				formatDatem(val) {
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
				},
				classedStatus(t1,t2){
					let text = '' // 
					const d = dayjs().unix() // 当前时间戳
					const s = dayjs(t1).unix() // 课程开始时间戳
					const e = dayjs(t2).unix() // 课程结束时间戳
					if(d>e) {
						text = '课时后'
					}
					if (s<d && d<e) {
						text = '课时中'
					}
					if (d<s) {
						text = '课程还未开始'
					}
					return text
				}
			},
			onShow() {
				this.getInspectorList() // 获取巡检列表
				this.getGrades() // 获取班级列表
			},
			methods: {
				// 获取巡检列表
				async getInspectorList() {
					const params = {
						grades_id: this.grades_id,
						users_id: this.users_id,
						start_time: this.start_time  + ' 00:00:00',
						end_time: this.end_time + ' 23:59:59',
						pageNum: this.pageNum
					}
					const res = await getInspectorList(params)
					this.inspectorList = res.data
					this.total = res.meta.total
				},
				// 班级列表
				async getGrades() {
					const res = await getInspectorGradesList()
					this.gradesArray = res.data.map((item)=>{
						return {id: item.grades_id, name: item.grade.name}
					})
					// this.getTeachers({grades_id:res.data[0].grades_id})
					this.getTeachers({})
				},
				// 老师列表
				async getTeachers(params) {
					const res = await getTeachersList(params)
					this.teachersArray = res.data.map((item)=>{
						return {id: item.users_id, name: item.user.username}
					})
				},
				// 时间选择器
				bindDateChange(e,r) {
					this[r] = e.detail.value
					this.getInspectorList()
				},
				// 班级和老师选择器 e 当前下标 r 赋值的name key 赋值的id arr从哪个数组取值
				bindPickerChange1(e,r,key,arr) {
					this[r] = this[arr][e.detail.value].name // 赋值name
					this[key] = this[arr][e.detail.value].id // 赋值id
					this.getInspectorList() // 请求
				},
				bindCancel(e) {
					this[e] = ''
					if(e==='grades_id') {
						this.grades = '班级列表'
					} else {
						this.teachers = '老师列表'
					}
					this.getInspectorList()
				},
				// 分页
				onChangePageNum(num){
					 this.pageNum = num
					 this.getInspectorList()
				},
				// 关闭弹窗
				onClosePopup() {
					this.popupShow = false
					this.popupData.comment = ''
					this.popupData.comment_score = 0
				},
				onClickSign(item,index) {
					// if(item.comment_score>0) return false
					this.popupData = item
					this.index = index
					this.popupShow = true
				},
				// 提交点评
				async onclickSubmit() {
					try{
						const d = dayjs().unix() // 当前时间戳
						const s = dayjs( this.popupData.start_time).unix() // 课程开始时间戳
						if(d<s) return uni.showToast({  icon:'none', title: '课程还未开始，不能点评'})
						if(!this.popupData.comment) return uni.showToast({  icon:'none', title: '请填写评语'})
						uni.showLoading({title: "点评中",mask: true,})
						console.log(this.popupData.comment_score)
						const params = {
							classes_id: this.popupData.id,
							comment_score: this.popupData.comment_score,
							comment: this.popupData.comment
						}
						const res = await postinsPectorComment(params)
						if(res.code===0) {
							uni.showToast({
							  icon:'success',
							  title: '点评成功'
							})
							this.onClosePopup()
						} else {
							uni.showToast({
							  icon:'error',
							  title: e.data.message || '点评失败'
							});
						}
					}catch(e){
						console.log(e)
						uni.showToast({
						  icon:'error',
						  title: e.data.message || '失败'
						})
					}

				}
			}
		}
</script>

<style lang="scss" scoped>
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
		.input {
			border-bottom: 1px solid #8d8d8d;
			padding: 5rpx 8rpx;
		}
	}
</style>