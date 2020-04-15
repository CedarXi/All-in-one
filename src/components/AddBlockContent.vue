<template>
	<div class="addBlock">
		<div class="dropdown-menu" v-if="isShowAddMenu == true">
			<span class="block-type-tip">基础模块</span>
			<div class="block-item" @click="addBlock('text')">
				<div class="block-item-img">
					<img src="../assets/text.png" style="width: 100%;" />
				</div>
				<div class="block-item-intro">
					<h4>纯文本</h4>
					<span>用纯文本开始写内容</span>
				</div>
			</div>
			<div class="block-item" @click="addBlock('todo')">
				<div class="block-item-img">
					<img src="../assets/to-do.png" style="width: 100%;" />
				</div>
				<div class="block-item-intro">
					<h4>待办清单</h4>
					<span>用待办清单去追踪任务</span>
				</div>
			</div>
			<div class="block-item" @click="addBlock('heading1')">
				<div class="block-item-img">
					<img src="../assets/heading1.png" style="width: 100%;" />
				</div>
				<div class="block-item-intro">
					<h4>标题1</h4>
					<span>大字号标题</span>
				</div>
			</div>
			<div class="block-item" @click="addBlock('heading2')">
				<div class="block-item-img">
					<img src="../assets/heading2.png" style="width: 100%;" />
				</div>
				<div class="block-item-intro">
					<h4>标题2</h4>
					<span>中字号标题</span>
				</div>
			</div>
			<div class="block-item" @click="addBlock('heading3')">
				<div class="block-item-img">
					<img src="../assets/heading3.png" style="width: 100%;" />
				</div>
				<div class="block-item-intro">
					<h4>标题3</h4>
					<span>小字号标题</span>
				</div>
			</div>
			<div class="block-item" @click="addBlock('BulletedList')">
				<div class="block-item-img">
					<img src="../assets/bulleted-list.png" style="width: 100%;" />
				</div>
				<div class="block-item-intro">
					<h4>符号列表</h4>
					<span>圆形简单符号列表</span>
				</div>
			</div>
			<div class="block-item" @click="addBlock('hint')">
				<div class="block-item-img">
					<img src="../assets/hint.png" style="width: 100%;" />
				</div>
				<div class="block-item-intro">
					<h4>提示栏</h4>
					<span>用于提示比较重要的信息</span>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="less">
.addBlock {
	.dropdown-menu {
		background: #ffffff;
		position: absolute;
		// margin-left: 58px;
		z-index: 2003;
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
	name: "AddBlock",
	data() {
		return {
			isShowMenu: this.isShowAddMenu
		};
	},
	watch: {
		isShowAddMenu(value) {
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

			// 处理光标的显示问题，新建后，光标也到新建栏
			setTimeout(() => {
				let dom = document.getElementsByTagName("textarea");
				let currInput = dom[this.currentBlockIndex];
				let nextInput = dom[this.currentBlockIndex + 1];
				let lastInput = dom[this.currentBlockIndex - 1];
				nextInput.focus();
			}, 300);
		}
	}
};
</script>


