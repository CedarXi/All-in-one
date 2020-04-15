<template>
	<div class="hint">
		<div class="hint-bg">
			<el-input
				type="textarea"
				autosize
				v-model="mValue.text"
				placeholder="输入需要重要提示的内容"
				@keydown.native="addNewTextBlock($event,BlocksIndex)"
				@keyup.native="nextFocus($event,BlocksIndex)"
			></el-input>
		</div>
	</div>
</template>

<script>
export default {
	name: "hint",
	props: ["value", "BlocksIndex"],
	data() {
		return {
			mValue: this.value,
			cursorStart: 0
		};
	},
	watch: {
		mValue(val) {
			//本地值改变传给父组件
			this.$emit("input", val);
		},
		value(val) {
			this.mValue = val;
		}
	},
	methods: {
		addNewTextBlock(event, index) {
			/*这里的keyCode 根据不同的平台或许不同,安卓就是不是8*/
			let dom = document.getElementsByTagName("textarea");
			let currInput = dom[index];
			let startPos = currInput.selectionStart;
			this.cursorStart = startPos;

			if (event.keyCode == 13) {
				event.preventDefault();

				// 新建text-item到vuex里
				let addBlockInfo = {
					index: index,
					blockItem: {
						type: "text",
						data: {
							text: ""
						}
					}
				};
				// 获取光标位置，处理回车时字符串换行问题

				if (startPos != this.mValue.text.length) {
					addBlockInfo.blockItem.data.text = this.mValue.text.slice(
						startPos,
						this.mValue.text.length
					);
					this.mValue.text = this.mValue.text.slice(0, startPos);
				}

				// 提交数据到vuex
				this.$store.commit(
					"mutationAddCurrentPageBlocks",
					addBlockInfo
				);
			}
		},
		nextFocus(event, index) {
			let dom = document.getElementsByTagName("textarea");
			let currInput = dom[index];
			let nextInput = dom[index + 1];
			let lastInput = dom[index - 1];
			/*这里的keyCode 根据不同的平台或许不同,安卓就是不是8*/
			if (event.keyCode == 13) {
				// console.log(nextInput);
				event.preventDefault();
				nextInput.focus();
			}
			if (event.keyCode == 38) {
				lastInput.setSelectionRange(this.cursorStart, this.cursorStart);
				setTimeout(() => {
					lastInput.focus();
				}, 100);
			}
			if (event.keyCode == 40) {
				nextInput.setSelectionRange(this.cursorStart, this.cursorStart);
				setTimeout(() => {
					nextInput.focus();
				}, 100);
			}
			if (currInput.value == "" && this.currentPageBlocks.length > 1) {
				if (event.keyCode == 46 || event.keyCode == 8) {
					this.currentPageBlocks.splice(index, 1);
					setTimeout(() => {
						lastInput.focus();
					}, 300);
				}
			}
		}
	},
	computed: {
		currentPageBlocks() {
			return this.$store.state.currentPageBlocks;
		}
	}
};
</script>

<style lang="less">
.hint {
	display: flex;
	align-items: center;
	.hint-bg{
		padding: 20px;
		background: #F2F6FC;
		width: 100%;
		border-radius: 2px;
		border-left: 3px solid #409EFF;
	}

	
	.el-textarea__inner {
		border: none;
		outline: none;
		font-size: 16px;
		width: 100%;
		resize: none;
		padding: 5px 0;
		color: #303133;
		background: #F2F6FC;
	}
	textarea::-webkit-input-placeholder {
		color: #F2F6FC;
	}
	textarea:focus::-webkit-input-placeholder {
		color: #999999;
	}
}
</style>