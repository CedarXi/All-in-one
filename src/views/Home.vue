<template>
	<div class="home">
		<div class="header">
			<h1>All-in-one</h1>
			<p>模块化内容构建编辑器，基于Vue和element的打造</p>
			<p>以Json格式输出，灵感来自Notion</p>
			<!-- <el-button href="https://github.com/CedarXi/All-in-one" >GitHub</el-button> -->
			<el-link
				:underline="false"
				href="https://github.com/CedarXi/All-in-one"
				class="el-link-btn"
				target="_blank"
			>
				<i>
					<img src="../assets/github.svg" width="18px" />
				</i>
				GitHub
			</el-link>
		</div>

		<div class="container-870">
			<div
				:style="{ top: addMenuContentClientXY.y+20+'px', left:addMenuContentClientXY.x+48+'px' }"
				class="add-block-content"
			>
				<AddBlockContent></AddBlockContent>
			</div>
			<div class="line-wrap" v-for="(item,index) in getCurrentPageBlocks" :key="index">
				<div class="line-left">
					<AddBlockBtn :BlocksIndex="index"></AddBlockBtn>
					<DragBtn></DragBtn>
				</div>
				<div class="line-right">
					<TextBlock v-model="item.data" :BlocksIndex="index" v-if="item.type=='text'"></TextBlock>
					<TodoBlock v-model="item.data" :BlocksIndex="index" v-if="item.type=='todo'"></TodoBlock>
					<Heading1 v-model="item.data" :BlocksIndex="index" v-if="item.type=='heading1'"></Heading1>
					<Heading2 v-model="item.data" :BlocksIndex="index" v-if="item.type=='heading2'"></Heading2>
					<Heading3 v-model="item.data" :BlocksIndex="index" v-if="item.type=='heading3'"></Heading3>
					<BulletedList v-model="item.data" :BlocksIndex="index" v-if="item.type=='BulletedList'"></BulletedList>
					<Hint v-model="item.data" :BlocksIndex="index" v-if="item.type=='hint'"></Hint>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="less">
.home {
	.header {
		h1 {
			font-size: 50px;
		}
		text-align: center;
		height: 300px;
		.el-link-btn {
			padding: 10px 20px;
			border: 1px solid #dddddd;
			border-radius: 4px;
			font-size: 20px;
		}
		.el-link-btn:hover {
			border-color: #c6e2ff;
			background-color: #ecf5ff;
			color: #303133;
		}
	}
	.container-870 {
		padding-top: 100px;
		max-width: 870px;
		margin-left: auto;
		margin-right: auto;
		padding: 70px 70px 70px 30px;
		border: 1px solid #dddddd;
		border-radius: 2px;
		box-shadow: 0 8px 42px -8px rgba(82, 94, 102, 0.15);
		margin-bottom: 100px;
		.add-block-content {
			position: absolute;
		}
		.line-wrap {
			display: flex;
			align-items: center;
			line-height: 20px;
			.line-left {
				width: 40px;
				display: flex;
				align-items: center;
				margin-right: 20px;
				visibility: hidden;
			}
			.line-right {
				width: 100%;
			}
		}
		.line-wrap:hover {
			.line-left {
				visibility: visible;
			}
		}
		.line-wrap:focus {
			visibility: hidden;
		}
	}
}
</style>


<script>
// @ is an alias to /src
import AddBlockBtn from "@/components/AddBlockBtn";
import AddBlockContent from "@/components/AddBlockContent";
import DragBtn from "@/components/DragBtn";
import TextBlock from "@/components/basicBlockComponents/TextBlock";
import TodoBlock from "@/components/basicBlockComponents/TodoBlock";
import Heading1 from "@/components/basicBlockComponents/Heading1";
import Heading2 from "@/components/basicBlockComponents/Heading2";
import Heading3 from "@/components/basicBlockComponents/Heading3";
import BulletedList from "@/components/basicBlockComponents/BulletedList";
import Hint from "@/components/basicBlockComponents/Hint";

export default {
	name: "Home",
	components: {
		AddBlockBtn,
		DragBtn,
		AddBlockContent,
		TextBlock,
		TodoBlock,
		Heading1,
		Heading2,
		Heading3,
		BulletedList,
		Hint
	},
	computed: {
		isShowAddMenu() {
			return this.$store.state.isShowAddMenu;
		},
		addMenuContentClientXY() {
			return this.$store.state.addMenuContentClientXY;
		},

		getCurrentPageBlocks() {
			return this.$store.getters.getterCurrentPageBlocks;
		}
	}
};
</script>


