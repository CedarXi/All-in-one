<template>
	<div class="dragBtn">
		<a class="drag-btn">
			<i class="iconfont icondrag"></i>
		</a>
	</div>
</template>

<style lang="less">
.dragBtn {
	.drag-btn {
		padding: 2px 5px;
		border-radius: 2px;
		color: #999999;
		.icondrag {
			font-size: 14px;
		}
	}
	.drag-btn:hover {
		background: #eeeeee;
		cursor: pointer;
	}
}
</style>


<script>
// @ is an alias to /src

export default {
	name: "dragBtn"
};
</script>


