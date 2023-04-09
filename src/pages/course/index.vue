<template>
	<view class="page-wrap pt-3">
		<u-subsection :list="list"  mode="subsection"  :fontSize="28" activeColor="#1a1a1a" 
		:current="curNow"  @change="sectionChange"></u-subsection>
		<view class="pt-3" v-show="curNow===0">
			<component is="today"></component>
		</view>
		<view class="pt-3" v-show="curNow===1">
			<component is="history"></component>
		</view>
	</view>
</template>

<script>
	import today from './components/today'
	import history from './components/history'
	export default {
			data() {
				return {
	                 list: ['今日课程', '历史课程'],
					curNow: 0,
					isShow: '', // 组件切换
				}
			},
			components: {
				today,
				history
			},
			created() {
			},
			mounted() {
				// this.getList()
			},
			methods: {
	            sectionChange(index) {
					this.curNow = index;
					// this.getList()
				},
				
			
			}
		}
</script>

<style>
	.page-wrap .u-subsection {
		height: 35px !important;
	}
	
</style>