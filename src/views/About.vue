<template>
	<div class="about">
		<el-button @click="test123()">aaa</el-button>
		<el-select v-model="value" placeholder="请选择" >
			<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
		</el-select>
	</div>
</template>

<script>
export default {
	name: "about",
	data() {
		return {
			options: [
				{
					value: "选项1",
					label: "黄金糕"
				},
				{
					value: "选项2",
					label: "双皮奶"
				},
				{
					value: "选项3",
					label: "蚵仔煎"
				},
				{
					value: "选项4",
					label: "龙须面"
				},
				{
					value: "选项5",
					label: "北京烤鸭"
				}
			],
			value: ""
		};
	},
	methods: {
		test123: function() {
			// this.$refs.messageDrop.dropdown.visible = true
			console.log("111");
		}
	},
	mounted() {
		// this.$refs.messageDrop.show();
	}
};
</script>