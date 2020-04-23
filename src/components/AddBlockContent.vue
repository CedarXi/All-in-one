<template>
	<div
		class="addBlock-content"
		v-if="isShowAddMenu == true"
		style="z-index: 2001;"
		@mousewheel.prevent
	>
		<!-- {{getterAddMenuContentLayerXY}} -->
		<div
			class="dropdown-menu"
			:style="{ top: getterAddMenuContentLayerXY.y, left:getterAddMenuContentLayerXY.x }"
			@mousewheel.stop
		>
			<div v-for="(item,index) in addBlockInfoArray" :key="index">
				<span class="block-type-tip" v-if="index == 0">基础模块</span>
				<span class="block-type-tip" v-if="index == 7">媒体和数据</span>
				<div class="block-item" @click="addBlock(item.type)">
					<div class="block-item-img">
						<img :src="getImgUrl(item.type)" style="width: 100%;" />
					</div>
					<div class="block-item-intro">
						<h4>{{item.name}}</h4>
						<span>{{item.tip}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="less">
.addBlock-content {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	overflow: auto;
	margin: 0;
	.dropdown-menu {
		background: #ffffff;
		position: absolute;
		// margin-left: 58px;
		z-index: 2002;
		width: 320px;
		height: 360px;
		overflow-y: auto;
		border: 1px solid #dcdfe6;
		box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
		border-radius: 4px;

		.block-type-tip {
			font-size: 12px;
			color: #909399;
			display: block;
			padding: 10px 20px 5px 20px;
		}
		.block-item {
			padding: 5px 20px 7px 20px;
			display: flex;
			align-items: center;
			background: #ffffff;
			.block-item-img {
				width: 45px;
				height: 45px;
				background: #ffffff;
				img {
					border-radius: 4px;
					border: 1px solid #dddddd;
				}
			}
			.block-item-intro {
				h4 {
					margin: 0;
					font-size: 14px;
				}
				span {
					font-size: 12px;
					color: #909399;
				}
				margin-left: 10px;
			}
		}
		.block-item:hover {
			background: #eeeeee;
			cursor: pointer;
		}
	}
}
</style>


<script>
// @ is an alias to /src

export default {
	name: "addBlock-content",
	data() {
		return {
			isShowMenu: this.isShowAddMenu,
			addBlockInfoArray: [
				{
					name: "纯文本",
					tip: "用纯文本开始写内容",
					type: "text"
				},
				{
					name: "待办清单",
					tip: "用待办清单去追踪任务",
					type: "todo"
				},
				{
					name: "标题1",
					tip: "大字号标题",
					type: "heading1"
				},
				{
					name: "标题2",
					tip: "中字号标题",
					type: "heading2"
				},
				{
					name: "标题3",
					tip: "小字号标题",
					type: "heading3"
				},
				{
					name: "符号列表",
					tip: "大字号标题",
					type: "BulletedList"
				},
				{
					name: "提示栏",
					tip: "用于提示比较重要的信息",
					type: "hint"
				},
				{
					name: "图片",
					tip: "用于提示比较重要的信息",
					type: "hint"
				}
			]
		};
	},
	watch: {
		isShowAddMenu: function(value) {
			if (value == true) {
				document.addEventListener("click", e => {
					// console.log(event.target.getAttribute("class"))
					if (
						event.target.getAttribute("class") !=
						"iconfont iconplus"
					) {
						if (
							event.target.getAttribute("class") !=
							"dropdown-menu"
						) {
							this.$store.commit("mutationIsShowAddMenu", false);
						}
					}
				});
			}
		}
	},
	computed: {
		isShowAddMenu() {
			return this.$store.state.isShowAddMenu;
		},
		currentBlockIndex() {
			return this.$store.state.currentBlockIndex;
		},
		getterAddMenuContentLayerXY() {
			return this.$store.getters.getterAddMenuContentLayerXY;
		},
		currentPageBlocks() {
			return this.$store.state.currentPageBlocks;
		}
	},
	methods: {
		addBlock(a) {
			let addBlockInfo = {
				index: this.currentBlockIndex,
				blockItem: {}
			};
			if (a == "text") {
				addBlockInfo.blockItem = {
					type: "text",
					data: {
						text: ""
					}
				};
			}
			if (a == "todo") {
				addBlockInfo.blockItem = {
					type: "todo",
					data: {
						isChecked: false,
						text: ""
					}
				};
			}
			if (a == "heading1") {
				addBlockInfo.blockItem = {
					type: "heading1",
					data: {
						text: ""
					}
				};
			}
			if (a == "heading2") {
				addBlockInfo.blockItem = {
					type: "heading2",
					data: {
						text: ""
					}
				};
			}
			if (a == "heading3") {
				addBlockInfo.blockItem = {
					type: "heading3",
					data: {
						text: ""
					}
				};
			}
			if (a == "BulletedList") {
				addBlockInfo.blockItem = {
					type: "BulletedList",
					data: {
						text: ""
					}
				};
			}
			if (a == "hint") {
				addBlockInfo.blockItem = {
					type: "hint",
					data: {
						text: ""
					}
				};
			}

			this.$store.commit("mutationAddCurrentPageBlocks", addBlockInfo);

			// 如果是触发添加内容的面板是从text模块显示的模块添加弹窗页面的，并且内容为空
			if (
				this.currentPageBlocks[this.currentBlockIndex].type == "text" &&
				this.currentPageBlocks[this.currentBlockIndex].data.text == ""
			) {
				// 处理光标的显示问题，在当前模块显示
				this.currentPageBlocks.splice(this.currentBlockIndex, 1);
				setTimeout(() => {
					let dom = document.getElementsByTagName("textarea");
					let currInput = dom[this.currentBlockIndex];
					currInput.focus();
				}, 300);
			} else {
				// 处理光标的显示问题，新建后，光标也到新建栏
				setTimeout(() => {
					let dom = document.getElementsByTagName("textarea");
					let nextInput = dom[this.currentBlockIndex + 1];
					nextInput.focus();
				}, 300);
			}
		},
		getImgUrl(type) {
			return require("@/assets/" + type + ".png");
		}
	}
};
</script>


