<template>
	<div class="addBlock">
		<a class="add-block-btn" @click="openMenuShow($event)">
			<i class="iconfont iconplus"></i>
		</a>
	</div>
</template>

<style lang="less">
.addBlock {
	.add-block-btn {
		padding: 2px 6px 4px 6px;
		border-radius: 2px;
		.iconplus {
			font-size: 12px;
			color: #999999;
		}
		cursor: pointer;
	}
	.add-block-btn:hover {
		background: #eeeeee;
	}
}
</style>


<script>
// @ is an alias to /src

export default {
	name: "AddBlock",
	props: ["BlocksIndex"],
	data() {
		return {};
	},
	methods: {
		openMenuShow(e) {
			let a = { x: e.clientX, y: e.clientY };
			this.$store.commit("mutationAddMenuContentClientXY", a);
			this.$store.commit("mutationIsShowAddMenu", true);
			this.$store.commit("mutationCurrentBlockIndex", this.BlocksIndex);
		}
	}
};
</script>


