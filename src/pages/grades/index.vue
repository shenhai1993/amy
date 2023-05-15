<template>
	<view view class="page-wrap pt-3">
		<view class="u-page__tag-item mb-2"  v-for="(item, index) in gradesList" :key="index">
			<u-tag :text="item.grade.name" @click="checkboxClick(item)"  type="warning"
			icon="https://cdn.uviewui.com/uview/example/tag.png"
			borderColor="#000" bgColor="#000" size="large"></u-tag>
		</view>
		<view v-if="gradesList.length===0" class="text-center py-2 font-36 black-1">
			暂无班级数据
		</view>
		<navTab value="1"></navTab>
		<u-popup :show="popupShow" :closeable="true" :closeOnClickOverlay ="false"
		 @close="onClosePopup" mode="center">
		 <view class="popup">
			 <view class="font-36 text-center font-bold black-1 mb-3">教师列表</view>
			 <block v-for="(subitem, i) in teachersList" :key="i">
			 	<view class="flex a-center mb-3">
			 		<view><image class="picture-img" :src="subitem.user.avatar"></image></view>
			 		<view class="flex-1 pl-4 font-30 black-1">{{subitem.user.username}}</view>
			 	</view>
			 </block>
		 </view>
		</u-popup>
	</view>
</template>

<script>
	import navTab from '../../common/components/tabBar-nav/index'
	import {
		getInspectorGradesList,
		getTeachersList
	} from '../../api/index.js'
	export default {
		data() {
			return {
				popupShow: false,
				gradesList: [], // 班级列表、
				teachersList: []
			}
		},
		components: {
			navTab
		},
		onShow() {
			this.getGrades() // 获取班级列表
		},
		methods: {
			// 班级列表
			async getGrades() {
				const res = await getInspectorGradesList()
				this.gradesList = res.data
			},
			async checkboxClick(item) {
				const res = await getTeachersList({grades_id: item.grades_id})
				if(res.data && res.data.length>0) {
					this.teachersList = res.data
					this.popupShow = true
				} else {
					uni.showToast({
						icon: 'none',
						title: '当前班级下没有教师'
					});
				}
			},
			onClosePopup() {
				this.popupShow = false
			}
		},
	};
</script>

<style scoped lang="scss">
	.picture-img {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		background-color: black;
	}
	.popup{
		width: 650rpx;
		padding: 30rpx;
	}
</style>