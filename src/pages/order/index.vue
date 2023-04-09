<template>
  <view class="content">
	<view>
		  <ren-dropdown-filter :filterData='filterData' :defaultIndex='defaultIndex'
		      @onSelected='ed' @dateChange='dateChange'></ren-dropdown-filter>
	</view>
	<view class="fond-box page-wrap" style="padding-top: 130rpx;">
		<block v-for="(item, index) in orderList" :key="index">
			<view class="mb-3 bg-white px-1  py-3" @click="onClickDetails(item.status)">
				<view class=" font-36 color-orange px-2 pb-2">{{item.date}}</view>
				<view class="p-2 radius-2 bg-gary">
					<block v-for="(subItem, subIndex) in item.list" :key="subIndex">
						<view class="flex a-center font-32 py-3">
							<view class="black-1 flex-1  font-weight-5" >{{subItem.type}}</view>
							<text :class="[(subItem.status===0) ? 'black-1' :(subItem.status===1)?'black-2': 'color-warn']">{{statusType[subItem.status]}}</text>
						</view>
					</block>
				</view>
				<view class="px-2 font-28 black-2">
					<view class="flex my-2">
						<view class="flex-1">订单编号</view>
						<view>{{item.num}}</view>
					</view>
					<view class="flex mb-2">
						<view class="flex-1">餐补金额</view>
						<view>{{item.currentPrice}}</view>
					</view>
					<view class="flex">
						<view class="flex-1">支付状态</view>
						<view :class="[item.status ? 'color-success' : 'color-warn']">{{item.status?'已支付':'未支付'}}</view>
					</view>
				</view>
			</view>
		</block>
	</view>
  </view>
</template>

<script>
import store from "../../store";
import RenDropdownFilter from '@/components/ren-dropdown-filter/ren-dropdown-filter.vue'
const actions = {
};

export default {
  data() {
    return {
		 filterData:[
			[{ text: '状态', value: '' }, { text: '状态1', value: 1 }, { text: '状态2', value: 2 }, { text: '状态3', value: 3 }]
		],
		defaultIndex:[0,0],
		statusType:['一','已使用','未使用'],
		orderList: [
			{ 	
				date: '7月24日（周三）',
				title: '早餐',
				list:[
					{type: '早餐',status: 0},
					{type: '午餐',status: 1},
					{type: '晚餐',status: 2},
				],
				num: '36748237483',
				status: false,
				currentPrice:'-￥15.00',
			},
			{
				date: '7月25日（周四）',
				title: '早餐',
				list:[
					{type: '早餐',status: 2},
					{type: '午餐',status: 1},
					{type: '晚餐',status: 0},
				],
				num: '36748237483',
				status: true,
				currentPrice:'-￥15.00',
			}
		]
    };
  },
  components:{
     RenDropdownFilter
  },
  onLoad() {},
  onShow() {
  	this.getList()
  },
  methods: {
	onClickDetails(stu){
		// 订单状态 已支付去可取消订单界面 未支付去支付订单界面
		const url = stu?'/pages/order_details/index':'/pages/order_details_pay/index'
		uni.navigateTo({
			url: url
		})
	},
	ed(res){
		console.log(res)
	},
	getList() {
		uni.$u.http.post("orders/list", {}).then((res) => {
		  if (res.code===0) {
		   
		  }
		}).catch(err => {
		  console.log(err)
		});
	},
	dateChange(d){
	   uni.showToast({
		   icon:'none',
		   title:d
	   })
	}
  },
};
</script>

<style lang="scss" scoped>
.content {
	width: 750rpx;
}
</style>
