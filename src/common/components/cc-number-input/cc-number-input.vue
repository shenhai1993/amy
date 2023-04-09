<template>
	<view class="flex flex-row">
		<u-icon name="minus-circle-fill" color="#3F9B91" size="40" @click="_value--" v-if="_value > 0"></u-icon>
		<u-input
			type="number"
			:value="_value"
			input-width="10"
			input-align="center"
			disabled
			:maxlength="3"
			class="w50"
			:custom-style="{ color: '#818181' }"
			v-if="_value > 0"
			:height="40"
		></u-input>
		<u-icon name="plus-circle-fill" color="#3F9B91" size="40" @click="_value++"></u-icon>
		<!-- <u-number-box v-model="_value" :input-width="40" :input-height="40" v-else></u-number-box> -->
	</view>
</template>

<script>
export default {
	props: {
		value: Number
	},
	data() {
		return {};
	},
	computed: {
		_value: {
			get: function() {
				// console.log('value', this.value);
				return this.value;
			},
			set: function(newV) {
				// console.log('newV', newV);
				this.$emit('input', newV);
				this.$emit('change', newV);
			}
		}
	}
};
</script>

<style></style>
