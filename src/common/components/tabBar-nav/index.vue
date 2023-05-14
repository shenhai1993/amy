<template>
	<view>
		<u-tabbar
			:value="value"
			@change="onchange"
			:fixed="true"
			:placeholder="true"
			:safeAreaInsetBottom="true"
		>
			<block v-if="type===1">
				<block v-for="(item, index) in tabOneList" :key="index">
					<u-tabbar-item :text="item.title" :icon="item.icon" ></u-tabbar-item>
				</block>
			</block>
			<block v-else>
				<block v-for="(item, index) in tabTwoList" :key="index">
					<u-tabbar-item :text="item.title" :icon="item.icon" ></u-tabbar-item>
				</block>
			</block>	
		</u-tabbar>
	</view>
</template>

<script>

export default {
	props: {
		value: {
			type: Number,
			default: 0
		},
	},		
  data() {
    return {
	  type: null,
      title: "",
	  tabOneList: [
		  {path: "/pages/course/index", title: '课程列表', icon: 'grid-fill'},
		   {path: "/pages/settled/index", title: '课时结算', icon: 'calendar-fill'},
		  
		  {path: "/pages/mine/index", title: '个人中心', icon: 'account-fill'},
	  ],
	  tabTwoList: [
			{path: "/pages/inspector/index", title: '巡检列表', icon: 'grid-fill'},
			{path: "/pages/grades/index", title: '班级列表', icon: 'calendar-fill'},
		   {path: "/pages/mine/index", title: '个人中心', icon: 'account-fill'},
	  ]
    };
  },
  mounted() {
	 this.type = uni.getStorageSync('userInfo').user.type || 1
  },
  methods: {
    onchange(e) {
		const name = this.type===1?'tabOneList':'tabTwoList'
		uni.switchTab({
			url: this[name][e].path
		})
	}
  },
};
</script>

<style>

</style>
